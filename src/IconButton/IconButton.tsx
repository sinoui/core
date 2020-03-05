import BaseButton, { Props as BaseButtonProps } from '@sinoui/core/BaseButton';
import styled from 'styled-components';
import classNames from 'classnames';
import { opacify } from 'polished';
import { Theme } from '@sinoui/theme';
import getColorFromTheme from '../utils/getColorFromTheme';
import OverridableComponent from '../OverridableComponent';

export interface IconButtonProps extends BaseButtonProps {
  /**
   * 选中状态，默认为false
   */
  selected?: boolean;
  /**
   * 按钮颜色
   */
  color?: string;
}

/**
 * 获取背景色
 * @param theme 主题
 * @param color 颜色
 * @param selected 选中状态
 */
const getBgColor = (theme: Theme, color?: string, selected?: boolean) => {
  if (selected) {
    if (color === 'textPrimary') {
      return theme.palette.action.selected;
    }
    return opacify(
      theme.palette.action.selectedOpacity - 1,
      getColorFromTheme(theme, color) || theme.palette.text.primary,
    );
  }
  return 'transparent';
};

const rippleConfig = {
  center: true,
  rippleLayoutClassName: 'sinoui-icon-button__ripple-layout',
  rippleClassName: 'sinoui-icon-button__ripple',
  fixSize: true,
};

const IconButton: OverridableComponent<IconButtonProps, 'button'> = styled(
  BaseButton,
).attrs(({ className, selected, color = 'textPrimary' }: IconButtonProps) => ({
  color,
  className: classNames(
    'sinoui-icon-button',
    { 'sinoui-icon-button--selected': selected },
    className,
  ),
  ripple: rippleConfig,
}))<IconButtonProps>`
  width: ${({ theme }) => theme.spacing.unit * 6}px;
  height: ${({ theme }) => theme.spacing.unit * 6}px;
  border-radius: 50%;
  box-sizing: border-box;
  color: ${({ theme, color, disabled }) =>
    disabled ? theme.palette.text.disabled : getColorFromTheme(theme, color)};
  background-color: ${({ theme, selected, color }) =>
    getBgColor(theme, color, selected)};

  &:hover {
    background-color: ${({ theme, color }) =>
      color !== 'textPrimary' &&
      opacify(
        theme.palette.action.hoverOpacity - 1,
        getColorFromTheme(theme, color) || theme.palette.text.primary,
      )};

    @media (hover: none) {
      background-color: ${({ theme, selected, color }) =>
        getBgColor(theme, color, selected)};
    }
  }

  > .sinoui-icon-button__ripple-layout {
    left: 0px;
    top: 0px;
    width: 48px;
    height: 48px;
  }

  > .sinoui-icon-button__ripple-layout > .sinoui-icon-button__ripple {
    width: 48px;
    height: 48px;
  }
`;

export default IconButton;
