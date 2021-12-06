import React from 'react';
import BaseButton from '@sinoui/core/BaseButton';
import type { Props as BaseButtonProps } from '@sinoui/core/BaseButton';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import { opacify } from 'polished';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';
import colorCss from '@sinoui/core/utils/colorCss';

export interface Props extends BaseButtonProps {
  /**
   * 是否为轮廓按钮，默认为false
   */
  outlined?: boolean;
  /**
   * 是否为容器按钮，默认为false
   */
  raised?: boolean;
  /**
   * 是否禁用海拔高度，默认为false
   */
  disableElevation?: boolean;
  /**
   * 按钮颜色
   */
  color?: string;
  /**
   * 子元素
   */
  children?: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
}

const textButtonStyle = css<Props>`
  ${({ theme }) => ({ ...theme.typography.button })};
  min-width: 64px;
  height: 36px;
  color: ${({ theme, color, disabled }) =>
    disabled ? theme.palette.text.disabled : getColorFromTheme(theme, color)};
  user-select: none;
  transition: ${({ theme: { transitions } }) =>
    transitions.create(['color', 'background-color'], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.shortest,
    })};
  padding: 0px 8px;
  box-sizing: border-box;

  &:hover {
    background-color: ${({ theme, color }) =>
      opacify(
        theme.palette.action.hoverOpacity - 1,
        getColorFromTheme(theme, color) || theme.palette.primary.main,
      )};

    @media (hover: none) {
      background-color: transparent;
    }
  }
`;

const outlinedStyle = css`
  border: 1px solid currentColor;
  border-radius: 4px;
  padding: 0 16px;
`;

const raisedStyle = css<Props>`
  padding: 0 16px;
  box-shadow: ${({ disabled, disableElevation, theme }) =>
    !disabled && !disableElevation && theme.shadows[2]};
  color: ${({ theme, disabled }) =>
    disabled
      ? theme.palette.text.disabled
      : theme.palette.primary.contrastText};
  background-color: ${({ theme, color, disabled }) =>
    disabled
      ? theme.palette.action.disabledBackground
      : getColorFromTheme(theme, color)};
  border-radius: 4px;
  transition: ${({ theme: { transitions } }) =>
    transitions.create(['color', 'background-color', 'box-shadow'], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.shortest,
    })};

  &:hover {
    ${colorCss('background-color')};
    box-shadow: ${({ disableElevation, theme }) =>
      !disableElevation && theme.shadows[4]};

    @media (hover: none) {
      ${colorCss('background-color')};
    }
  }

  &:focus {
    box-shadow: ${({ disableElevation, theme }) =>
      !disableElevation && theme.shadows[4]};
  }

  &:active {
    box-shadow: ${({ disableElevation, theme }) =>
      !disableElevation && theme.shadows[8]};
  }
`;

const flowingIconStyle = css<Props>`
  margin-left: 8px;
  margin-right: ${({ outlined, raised }) => (outlined || raised ? -4 : 0)}px;
`;

const ButtonLayout = styled(BaseButton)<Props>`
  ${textButtonStyle};
  ${(props) => props.outlined && outlinedStyle};
  ${(props) => props.raised && raisedStyle};

  > .sinoui-svg-icon {
    font-size: 18px;
    height: 18px;
    width: 18px;
    margin-right: 8px;
    ${({ outlined, raised }) => (outlined || raised) && `margin-left:-4px`};
    ${(props) =>
      Array.isArray(props.children) &&
      typeof props.children[0] === 'string' &&
      flowingIconStyle};
  }
`;

/**
 * 按钮组件
 */
const Button: React.FC<Props> = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const {
      as,
      className,
      outlined,
      raised,
      color = 'primary',
      ...rest
    } = props;
    return (
      <ButtonLayout
        {...rest}
        forwardedAs={as}
        ref={ref}
        className={classNames(
          'sinoui-button',
          {
            'sinoui-button--outlined': outlined,
            'sinoui-button--raised': raised,
          },
          className,
        )}
        color={color}
        outlined={outlined}
        raised={raised}
      />
    );
  },
);

if (process.env.NODE_ENV === 'development') {
  Button.displayName = 'Button';
}

export default Button;
