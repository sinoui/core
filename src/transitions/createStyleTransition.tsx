import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { transitions } from '@sinoui/theme';
import { getDuration, getEasing } from './transitionUtils';

export interface StyleTransitionPropsType {
  appear?: boolean;
  in?: boolean;
  /**
   * 过渡效果的方向
   *
   * @type {('left' | 'right')}
   */
  direction?: 'left' | 'right' | 'up' | 'down';
  /**
   * 子节点
   *
   * @type {Node}
   */
  children?: React.ReactNode;
  /**
   * 过渡时长。'auto'表示会根据元素高度自动计算过渡时长
   *
   * @type {(number
   *     | {
   *         enter: number,
   *         exit: number,
   *       })}
   */
  timeout?:
    | 'auto'
    | number
    | {
        enter: number;
        exit: number;
      };
  /**
   * 指定过渡时应用的css类名。
   */
  transitionClasses?:
    | string
    | {
        appear?: string;
        appearActive?: string;
        enter?: string;
        enterActive?: string;
        exit?: string;
        exitActive?: string;
      };
  easing?: string;
  onEnter?: (node: HTMLElement, isAccept: boolean) => void;
  onEntering?: (node: HTMLElement, isAccept: boolean) => void;
  onEntered?: (node: HTMLElement, isAccept: boolean) => void;
  onExit?: (node: HTMLElement) => void;
  onExiting?: (node: HTMLElement) => void;
  onExited?: (node: HTMLElement) => void;
}

export interface StyleTransitionOptions {
  enterStyle: (
    transition: TransitionInterface,
    node: HTMLElement,
    isAppearing: boolean,
  ) => React.CSSProperties;
  enterActiveStyle?: (
    transition: TransitionInterface,
    node: HTMLElement,
    isAppearing: boolean,
  ) => React.CSSProperties;
  enterToStyle: (
    transition: TransitionInterface,
    node: HTMLElement,
    isAppearing: boolean,
  ) => React.CSSProperties;
  exitStyle: (
    transition: TransitionInterface,
    node: HTMLElement,
  ) => React.CSSProperties;
  exitActiveStyle?: (
    transition: TransitionInterface,
    node: HTMLElement,
  ) => React.CSSProperties;
  exitToStyle: (
    transition: TransitionInterface,
    node: HTMLElement,
  ) => React.CSSProperties;
  transitionProps?: string[];
  duration?: {
    enter: number;
    exit: number;
  };
  easing?: {
    enter: string;
    exit: string;
  };
}

export interface TransitionInterface {
  props: StyleTransitionPropsType;
  getTimeout: (
    e: HTMLElement,
  ) => {
    enter: number;
    exit: number;
  };
}

/**
 * 创建通过css样式定义过渡效果的过渡组件。
 *
 * 元素入场过渡： 先应用`enterStyle`，一帧（16ms）之后，应用`enterActiveStyle`和`enterToStyle`。
 *
 * 元素出场过渡： 先应用`exitStyle`，一帧（16ms）之后，应用`exitActiveStyle`和`enterToStyle`。
 *
 */
export default function createStyleTransition<Props extends {}>(
  options: StyleTransitionOptions,
  defaultProps?: Props & StyleTransitionPropsType,
): React.ComponentType<Props & StyleTransitionPropsType> {
  return class StyleTransition
    extends React.Component<Props & StyleTransitionPropsType>
    implements TransitionInterface {
    public static defaultProps = defaultProps;

    constructor(props: Props & StyleTransitionPropsType) {
      super(props);

      this.handleEnter = this.handleEnter.bind(this);
      this.handleEntering = this.handleEntering.bind(this);
      this.handleExit = this.handleExit.bind(this);
      this.handleExiting = this.handleExiting.bind(this);
      this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    }

    get easing(): {
      enter: string;
      exit: string;
    } {
      return getEasing(this.props.easing, options.easing);
    }

    public getTimeout(
      node: HTMLElement,
    ): {
      enter: number;
      exit: number;
    } {
      const timeout:
        | 'auto'
        | number
        | {
            enter: number;
            exit: number;
          } = this.props.timeout || options.duration;
      if (timeout === 'auto') {
        const duration = transitions.getAutoHeightDuration(node.clientHeight);
        return {
          enter: duration,
          exit: duration,
        };
      }
      return getDuration(timeout, options.duration);
    }

    /**
     * 处理过渡的enter事件
     *
     * @param {HTMLElement} node 应用过渡效果的节点
     * @param {boolean} isAppearing 表示是否是刚创建节点时机。
     *  如果`HorizontalSlide`组件设置了`appear`属性，则会在刚创建节点时，
     *  调用此方法，且isAppearing为true；否则不会调用此方法。
     */
    public handleEnter(node: HTMLElement, isAppearing: boolean) {
      if (this.props.onEnter) {
        this.props.onEnter(node, isAppearing);
      }

      const enterStyle = {
        transition: 'none',
        ...options.enterStyle(this, node, isAppearing),
      };
      Object.assign(node.style, enterStyle);
    }

    /**
     * 处理过渡的entering事件
     *
     * @param {HTMLElement} node 应用过渡效果的节点
     * @param {boolean} isAppearing 表示是否是刚创建节点时机。
     *  如果`HorizontalSlide`组件设置了`appear`属性，则会在刚创建节点时，
     *  调用此方法，且isAppearing为true；否则不会调用此方法。
     */
    public handleEntering(node: HTMLElement, isAppearing: boolean) {
      const activeStyle = options.enterActiveStyle
        ? options.enterActiveStyle(this, node, isAppearing)
        : {};
      if (!activeStyle.transition) {
        activeStyle.transition = transitions.create(options.transitionProps, {
          duration: this.getTimeout(node).enter,
          easing: this.easing.enter,
        });
      }

      const enterActiveStyle = {
        ...activeStyle,
        ...options.enterToStyle(this, node, isAppearing),
      };

      Object.assign(node.style, enterActiveStyle);

      if (this.props.onEntering) {
        this.props.onEntering(node, isAppearing);
      }
    }

    /**
     * 处理过渡的exit事件
     *
     * @param {HTMLElement} node 应用过渡效果的节点
     * @param {boolean} isAppearing 表示是否是刚创建节点时机。
     *  如果`HorizontalSlide`组件设置了`appear`属性，则会在刚创建节点时，
     *  调用此方法，且isAppearing为true；否则不会调用此方法。
     */
    public handleExit(node: HTMLElement) {
      const exitStyle = {
        transition: 'none',
        ...options.exitStyle(this, node),
      };

      Object.assign(node.style, exitStyle);

      if (this.props.onExit) {
        this.props.onExit(node);
      }
    }

    /**
     * 处理过渡的exiting事件
     *
     * @param {HTMLElement} node 应用过渡效果的节点
     */
    public handleExiting(node: HTMLElement) {
      const exitActiveStyle = options.exitActiveStyle
        ? options.exitActiveStyle(this, node)
        : {};
      if (!exitActiveStyle.transition) {
        exitActiveStyle.transition = transitions.create(
          options.transitionProps,
          {
            duration: this.getTimeout(node).exit,
            easing: this.easing.exit,
          },
        );
      }
      const style = {
        ...exitActiveStyle,
        ...options.exitToStyle(this, node),
      };

      Object.assign(node.style, style);

      if (this.props.onExiting) {
        this.props.onExiting(node);
      }
    }

    /**
     * 过渡结束监听器。
     *
     * @param {HTMLElement} node 过渡元素
     * @param {() => void} next 通知`Transition`组件过渡结束的方法。
     */
    public handleTransitionEnd(node: HTMLElement, next: () => void) {
      if (this.props.timeout === 'auto') {
        setTimeout(next, this.getTimeout(node).enter);
      }
    }

    public render() {
      const { transitionClasses, direction, timeout, ...props } = this
        .props as StyleTransitionPropsType;
      return (
        <CSSTransition
          {...props}
          onEnter={this.handleEnter}
          onEntering={this.handleEntering}
          onExit={this.handleExit}
          onExiting={this.handleExiting}
          timeout={
            timeout === 'auto' ? null : getDuration(timeout, options.duration)
          }
          classNames={transitionClasses || ''}
          addEndListener={this.handleTransitionEnd}
        />
      );
    }
  };
}
