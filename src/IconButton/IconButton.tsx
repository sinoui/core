import React from 'react';
import BaseButton from '@sinoui/core/BaseButton';
import type { Props as BaseButtonProps } from '@sinoui/core/BaseButton';
import styled from 'styled-components';
import classNames from 'classnames';
import { opacify } from 'polished';
import getColorFromTheme from '../utils/getColorFromTheme';
import OverridableComponent from '../OverridableComponent';

export interface IconButtonProps extends BaseButtonProps {
  /**
   * 按钮颜色
   */
  color?: string;
}

const rippleConfig: object = {
  center: true,
  rippleLayoutClassName: 'sinoui-icon-button__ripple-layout',
  rippleClassName: 'sinoui-icon-button__ripple',
  fixSize: true,
};

const IconButtonLayout = styled(BaseButton).attrs(
  ({ className, color = 'textPrimary' }: IconButtonProps) => ({
    color,
    className: classNames('sinoui-icon-button', className),
  }),
)<IconButtonProps>`
  width: ${({ theme }) => theme.spacing.unit * 6}px;
  height: ${({ theme }) => theme.spacing.unit * 6}px;
  border-radius: 50%;
  box-sizing: border-box;
  color: ${({ theme, color, disabled }) =>
    disabled ? theme.palette.text.disabled : getColorFromTheme(theme, color)};

  &:hover {
    background-color: ${({ theme, color }) =>
      color !== 'textPrimary' &&
      opacify(
        theme.palette.action.hoverOpacity - 1,
        getColorFromTheme(theme, color),
      )};

    @media (hover: none) {
      background-color: transparent;
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

const IconButton: OverridableComponent<
  IconButtonProps,
  'button'
> = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  props,
  ref,
) {
  const { as, children, ...other } = props;
  return (
    <IconButtonLayout
      ripple={rippleConfig}
      {...other}
      forwardedAs={as}
      ref={ref}
    >
      {children}
    </IconButtonLayout>
  );
});

export default IconButton;
