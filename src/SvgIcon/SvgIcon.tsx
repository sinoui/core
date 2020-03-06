import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import colorCss from '@sinoui/core/utils/colorCss';

export interface SvgProps {
  /**
   * 指定图标内容
   */
  children?: React.ReactNode;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 指定样式
   */
  style?: React.CSSProperties;
  /**
   * 设置 svg 元素的 viewBox，默认为0 0 24 24
   */
  viewBox?: string;
  /**
   * 设置图标大小。数字或者字符串。如果是数字，则单位是像素
   */
  size?: number | string;
  /**
   * 设置颜色
   */
  color?: string;
  /**
   * 指定图标的标题
   */
  title?: string;
  /**
   * 指定根元素
   */
  as?: React.ReactNode;
}

/**
 * SvgIcon组件
 */
const SvgIcon = styled.svg.attrs(
  ({
    children,
    className,
    viewBox = '0 0 24 24',
    size = 24,
    color,
    title,
    style,
  }: SvgProps) => ({
    children: (
      <>
        {!!title && <title>{title}</title>}
        {children}
      </>
    ),
    className: classNames('sinoui-svg-icon', className),
    viewBox,
    color,
    size,
    ['aria-hidden']: title ? undefined : 'true',
    role: title ? 'img' : 'presentation',
    focusable: 'false',
    style,
  }),
)<{ size?: number | string; color?: string }>`
  font-size: ${(props) =>
    typeof props.size === 'string' ? props.size : `${props.size}px`};
  width: 1em;
  height: 1em;
  fill: currentColor;
  flex-shrink: 0;
  transition: ${(props) =>
    props.theme.transitions.create('fill', {
      duration: props.theme.transitions.duration.shorter,
    })};
  ${(props) => colorCss('color', props.color)};
  user-select: none;
  display: inline-block;
  box-sizing: border-box;
`;

export default SvgIcon;
