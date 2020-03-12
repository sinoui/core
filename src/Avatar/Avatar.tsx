import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import colorCss from '@sinoui/core/utils/colorCss';

export interface AvatarProps {
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 是否为密集模式
   */
  dense?: boolean;
  /**
   * 头像背景色
   */
  color?: string;
  /**
   * 添加自定义类名
   */
  className?: string;
}

/**
 * 头像组件
 */
const Avatar = styled.div.attrs(({ color = 'actionDisabled', className }) => ({
  color,
  className: classNames('sinoui-avatar', className),
}))<AvatarProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.dense ? '32px' : '40px')};
  height: ${(props) => (props.dense ? '32px' : '40px')};
  border-radius: 50%;
  font-size: ${(props) => props.theme.typography.h6};
  ${colorCss('background-color')};
  color: #fff;
  overflow: hidden;
  user-select: none;

  > img {
    width: 100%;
    height: 100%;
    color: transparent;
    object-fit: cover;
  }
`;

export default Avatar;
