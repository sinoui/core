import React from 'react';
import styled from 'styled-components';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';
import classNames from 'classnames';

const BreadCrumbWrapper = styled.div.attrs(({ component }: Props) => ({
  as: component,
}))<Props>`
  height: 24px;
  font-size: ${(props) => props.theme.typography.body1.fontSize};
  background-color: ${(props) =>
    getColorFromTheme(props.theme, props.color) ||
    props.theme.palette.background.paper};
  color: ${(props) =>
    props.color
      ? props.theme.palette.common.white
      : props.theme.palette.text.secondary};

  > ol {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  > ol li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  > ol li.sinoui-breadcrumb-separator {
    margin: 0px 8px;
    user-select: none;
  }

  .sinoui-link {
    color: inherit;
    display: inline-flex;
    align-items: center;

    :hover {
      text-decoration: underline;
    }
  }

  svg {
    font-size: 20px;
    margin-right: 4px;
  }
`;
export interface Props {
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 指定背景颜色
   */
  color?: string;
  /**
   * 添加自定义类名
   */
  className?: string;
  /**
   * 指定元素属性
   */
  component?: React.ElementType;
  /**
   * 分隔符
   */
  separator?: string;
}

const insertSeparators = (items: any, separator: string) => {
  return items.reduce((init: any, current: any, index: number) => {
    if (index < items.length - 1) {
      // eslint-disable-next-line no-param-reassign
      init = init.concat(
        current,
        <li
          aria-hidden
          key={`separator-${index.toString()}`}
          className="sinoui-breadcrumb-separator"
        >
          {separator}
        </li>,
      );
    } else {
      init.push(current);
    }

    return init;
  }, []);
};

/**
 * 面包屑导航组件
 */
const BreadCrumb = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    children,
    color,
    separator = '/',
    className,
    component: Component = 'nav',
    ...rest
  } = props;

  const allItems = React.Children.toArray(children).map(
    (node, index: number) => (
      <li key={`node-${index.toString()}`} className="sinoui-breadcrumb-li">
        {node}
      </li>
    ),
  );

  return (
    <BreadCrumbWrapper
      className={classNames('sinoui-bread-crumb', className)}
      color={color}
      {...rest}
      ref={ref}
      component={Component}
      aria-label="breadcrumb"
    >
      <ol className="sinoui-breadcrumb-ol">
        {insertSeparators(allItems, separator)}
      </ol>
    </BreadCrumbWrapper>
  );
});

export default BreadCrumb;
