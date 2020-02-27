import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { getColorFromTheme } from './getColor';

const SvgWrapper = styled.svg.attrs((props: SvgProps) => ({
  as: props.as,
}))<{ size?: number | string }>`
  font-size: ${(props) =>
    props.size === 'inherit' ? props.size : `${props.size}px`};
  width: 1em;
  height: 1em;
  fill: currentColor;
  flex-shrink: 0;
  transition: ${(props) =>
    props.theme.transitions.create('fill', {
      duration: props.theme.transitions.duration.shorter,
    })};
  color: ${(props) => getColorFromTheme(props)};
  user-select: none;
  display: inline-block;
`;

export interface SvgProps {
  /**
   * 子元素
   */
  children: React.ReactNode;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 指定样式
   */
  style?: React.CSSProperties;
  /**
   * svg可见区域设置，默认为0 0 24 24
   */
  viewBox?: string;
  /**
   * 图标大小，为'inherit'继承父元素
   */
  size?: number | string;
  /**
   * 指定颜色
   */
  color?: string;
  /**
   * 指定标题
   */
  title?: string;
  /**
   * 指定根元素
   */
  as?: any;
  /**
   * 引用元素
   */
  ref?: React.RefObject<HTMLInputElement>;
}

/**
 * SvgIcon组件
 */
const SvgIcon = React.forwardRef((props: SvgProps, ref) => {
  const {
    children,
    className,
    viewBox = '0 0 24 24',
    size = 24,
    color,
    title,
    as = 'svg',
    ...rest
  } = props;
  return (
    <SvgWrapper
      {...rest}
      className={classNames('sinoui-svg-icon', className)}
      viewBox={viewBox}
      size={size}
      color={color}
      as={as}
      ref={ref}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : 'presentation'}
      focusable="false"
    >
      {!!title && <title>{title}</title>}
      {children}
    </SvgWrapper>
  );
});

export default SvgIcon;
