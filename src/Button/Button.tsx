import BaseButton, { Props as BaseButtonProps } from '@sinoui/core/BaseButton';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import { opacify } from 'polished';
import getColorFromTheme from '../utils/getColorFromTheme';
import colorCss from '../utils/colorCss';
import OverridableComponent from '../OverridableComponent';

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
}

const textButtonStyle = css<Props>`
  ${({ theme }) => ({ ...theme.typography.button })};
  min-width: 64px;
  height: 36px;
  color: ${({ theme, color, disabled }) =>
    disabled ? theme.palette.text.disabled : getColorFromTheme(theme, color)};
  user-select: none;
  transition: background-color 100ms ease-in-out;
  padding: 0px 8px;
  overflow: hidden;
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
  transition: box-shadow 280ms;

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

const Button: OverridableComponent<Props, 'button'> = styled(BaseButton).attrs(
  ({ className, outlined, raised, color = 'primary' }: Props) => ({
    color,
    className: classNames(
      'sinoui-button',
      {
        'sinoui-button--outlined': outlined,
        'sinoui-button--raised': raised,
      },
      className,
    ),
  }),
)<Props>`
  ${textButtonStyle};
  ${(props) => props.outlined && outlinedStyle};
  ${(props) => props.raised && raisedStyle};

  > svg {
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

export default Button;