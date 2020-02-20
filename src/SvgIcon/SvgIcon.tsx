import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { transitions } from '@sinoui/theme';

const SvgWrapper = styled.svg`
  user-select: none;
  display: inline-block;
  font-size: 24px;
  width: 1em;
  height: 1em;
  fill: currentColor;
  flex-shrink: 0;
  transition: ${transitions.create('fill', {
    duration: transitions.duration.shorter,
  })};
`;

export interface SvgIconProps {
  /**
   * 给svg元素添加css类名
   */
  className?: string;
  /**
   * svg中的子元素
   */
  children: React.ReactNode;
  /**
   * 给svg元素应用css样式
   */
  style?: React.CSSProperties;
  /**
   * svg可见区域设置，默认为0, 0, 24, 24
   */
  viewBox?: string;
  /**
   * 可访问性辅助文本
   */
  titleAccess?: string;
}

/**
 * SvgIcon组件，即SVG图标组件。
 *
 * 注意：此组件不直接支持主题定制。因一般不会单独使用svg图标，所以可以在包含svg图标的容器组件中设置主题色即可，如：
 *
 * ```react
 * const IconButton = styled.button`
 *  color: ${props => props.theme.palette[props.color][500]};
 * `;
 *
 * <IconButton color="primary"><SvgIcon><path /></SvgIcon></IconButton>;
 * ```
 */
const SvgIcon: React.SFC<SvgIconProps> = ({
  className,
  viewBox = '0 0 24 24',
  titleAccess,
  children,
  ...props
}: SvgIconProps) => {
  return (
    <SvgWrapper
      className={classNames('sinoui-svg-icon', className)}
      viewBox={viewBox}
      aria-hidden={titleAccess ? 'false' : 'true'}
      {...props}
    >
      {titleAccess && <title>{titleAccess}</title>}
      {children}
    </SvgWrapper>
  );
};

SvgIcon.sinouiName = 'SvgIcon';

export default SvgIcon;
