import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import colorCss from '@sinoui/core/utils/colorCss';
import BaseButton, { BaseButtonProps } from '@sinoui/core/BaseButton';

/**
 * 宽度
 */
const WidthStyle = (props: FabProps) => {
  let width;
  if (props.extended) {
    width = 'auto';
  } else if (props.mini) {
    width = '40px';
  } else {
    width = '56px';
  }
  return width;
};

/**
 * 高度
 */
const HeightStyle = (props: FabProps) => {
  let height;
  if (props.extended) {
    height = '48px';
  } else if (props.mini) {
    height = '40px';
  } else {
    height = '56px';
  }
  return height;
};

/**
 * 浮动按钮样式
 */
const FabStyle = css<FabProps>`
  ${({ theme }) => ({ ...theme.typography.button })};
  width: ${(props) => WidthStyle(props)};
  height: ${(props) => HeightStyle(props)};
  border-radius: 50%;
  color: #fff;
  ${colorCss('background-color')};
  font-size: 24px;
  box-shadow: ${(props) => props.theme.shadows[6]};
  fill: currentColor;
  max-width: 100%;
  box-sizing: border-box;

  &:hover {
    box-shadow: ${(props) => props.theme.shadows[8]};
    ${colorCss('background-color')};

    // Reset on touch devices, it doesn't add specificity
    @media (hover: none) {
      ${colorCss('background-color')};
    }
  }

  &:foucs {
    box-shadow: ${(props) => props.theme.shadows[12]};
  }

  &:active {
    box-shadow: ${(props) => props.theme.shadows[12]};
  }

  &.sinoui-fab--disabled {
    pointer-events: none;
    cursor: default;
    background-color: ${({ theme }) => theme.palette.action.disabled};
    color: ${({ theme }) => theme.palette.text.disabled};
    box-shadow: none;
  }

  .sinoui-fab__ripple-layout {
    width: ${(props) => WidthStyle(props)};
    height: ${(props) => HeightStyle(props)};
  }

  .sinoui-fab__ripple {
    width: ${(props) => WidthStyle(props)};
    height: ${(props) => HeightStyle(props)};
  }

  .sinoui-fab-extended__ripple-layout {
    width: 100%;
    height: 48px;
    border-radius: 24px;
    left: 0px;
  }

  .sinoui-fab-extended__ripple {
    width: 100%;
    height: 48px;
    border-radius: 24px;
    left: 0px;
  }
`;

/**
 * 浮动按钮类型
 */
export interface FabProps extends BaseButtonProps {
  /**
   * 子元素
   */
  children: React.ReactNode;
  /**
   * 指定颜色
   */
  color?: string;
  /**
   * 较小显示
   */
  mini?: boolean;
  /**
   * 扩展样式
   */
  extended?: boolean;
  /**
   * 不可用状态
   */
  disabled?: boolean;
  /**
   * 自定义类名
   */
  className?: string;
}

const rippleConfig = {
  fixSize: true,
  center: true,
  rippleLayoutClassName: 'sinoui-fab__ripple-layout',
  rippleClassName: 'sinoui-fab__ripple',
};

const rippleConfigExtended = {
  rippleLayoutClassName: 'sinoui-fab-extended__ripple-layout',
  rippleClassName: 'sinoui-fab-extended__ripple',
};

/**
 * 扩展样式,图标在左侧
 */
const extendedLeftIconStyle = css`
  padding: 0px 20px 0px 12px;
  > .sinoui-svg-icon {
    margin-right: 12px;
  }
`;

/**
 * 扩展样式,图标在右侧
 */
const extendedRightIconStyle = css`
  padding: 0px 12px 0px 20px;
  > .sinoui-svg-icon {
    margin-left: 12px;
  }
`;

/**
 * 扩展样式
 */
const extendedStyle = css<FabProps>`
  border-radius: 24px;
  font-size: 0.875rem;
  padding: 0 20px;
  > .sinoui-svg-icon {
    font-size: 24px;
  }
  ${(props) =>
    Array.isArray(props.children) &&
    props.children.length > 1 &&
    (typeof props.children[0] === 'string'
      ? extendedRightIconStyle
      : extendedLeftIconStyle)}
`;

/**
 * 浮动按钮
 */
const Fab = styled(BaseButton).attrs(
  ({ className, extended, disabled, mini, color = 'primary' }: FabProps) => ({
    className: classNames('sinoui-fab', className, {
      'sinoui-fab--extended': extended,
      'sinoui-fab--disabled': disabled,
      'sinoui-fab--mini': mini,
    }),
    extended,
    disabled,
    mini,
    color,
    ripple: !extended ? rippleConfig : rippleConfigExtended,
  }),
)`
  ${FabStyle};
  ${(props) => props.extended && extendedStyle};
`;

export default Fab;
