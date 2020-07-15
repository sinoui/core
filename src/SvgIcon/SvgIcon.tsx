import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import colorCss from '@sinoui/core/utils/colorCss';
import { removeUndefinedProperties } from '../utils/objects';

export interface SvgIconProps {
  /**
   * 指定图标内容
   */
  children?: React.ReactNode;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 指定自定义样式
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
   * 不设置图标大小。一般用于`<SvgIcon as={CustomIcon} disabledViewBox />`，这种情况下，CustomIcon已有了`viewBox`。
   */
  disabledViewBox?: boolean;
}

/**
 * SvgIcon组件
 */
const SvgIcon = styled.svg
  .withConfig({
    shouldForwardProp: (prop) => !['disabledViewBox'].includes(prop),
  })
  .attrs(
    ({
      children,
      className,
      disabledViewBox,
      viewBox = !disabledViewBox ? '0 0 24 24' : undefined,
      size = 24,
      title,
    }: SvgIconProps) =>
      removeUndefinedProperties({
        children: (
          <>
            {!!title && <title>{title}</title>}
            {children}
          </>
        ),
        className: classNames('sinoui-svg-icon', className),
        viewBox,
        size,
        'aria-hidden': title ? undefined : 'true',
        role: title ? 'img' : 'presentation',
        focusable: 'false',
      }),
  )<SvgIconProps>`
  font-size: ${(props) =>
    typeof props.size === 'string' ? props.size : `${props.size}px`};
  width: 1em;
  height: 1em;
  fill: currentColor;
  flex-shrink: 0;
  transition: ${(props) =>
    props.theme.transitions.create('color', {
      duration: props.theme.transitions.duration.shorter,
    })};
  ${colorCss('color')};
  user-select: none;
  display: inline-block;
`;

export default SvgIcon;
