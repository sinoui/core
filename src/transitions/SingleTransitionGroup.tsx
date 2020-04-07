import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';

export interface SingleTransitionGroupPropsType {
  children: any;
}

const KEY_NAME = 'tkey';

/**
 * 获取子元素的唯一码
 *
 * @param {*} props 元素的属性
 */
function getChildKey(props: SingleTransitionGroupPropsType): React.Key {
  const child = props.children ? React.Children.only(props.children) : null;
  return (child && child.key) || -1;
}

/**
 * 应用于同时只出现一个元素的过渡动画组。`SingleTransitionGroup`确保在过渡过程中最多出现两个正在过渡的元素。
 *
 */
export default class SingleTransitionGroup extends React.Component<
  SingleTransitionGroupPropsType
> {
  constructor(props: SingleTransitionGroupPropsType) {
    super(props);

    this.currentKey = getChildKey(props);
    this.children = [this.currentKey];
  }

  // eslint-disable-next-line react/no-deprecated
  public componentWillReceiveProps(nextProps: SingleTransitionGroupPropsType) {
    const nextKey = getChildKey(nextProps);
    if (nextKey !== -1 && nextKey !== this.currentKey) {
      this.children = [this.currentKey, nextKey];
      this.currentKey = nextKey;
    }
  }

  // eslint-disable-next-line react/sort-comp
  public children: React.ReactNode[];

  public currentKey: React.Key;

  /**
   * TransitionGroup组件的childFactory属性实现。
   * 这个方法是整个组件的核心，用于实现**在过渡过程中最多出现两个正在过渡的元素**的效果。
   *
   * @memberof SingleTransitionGroup
   */
  public childFactory: any = (child: React.ReactElement<HTMLElement | any>) => {
    if (this.children.indexOf(child.props[KEY_NAME]) !== -1) {
      return React.cloneElement(React.Children.only(child), {
        [KEY_NAME]: undefined,
      } as any);
    }
    return null;
  };

  public render() {
    const { children } = this.props;
    const child = children
      ? React.cloneElement(React.Children.only(children), {
          [KEY_NAME]: this.currentKey,
        })
      : null;
    return (
      <TransitionGroup {...this.props} childFactory={this.childFactory}>
        {child}
      </TransitionGroup>
    );
  }
}
