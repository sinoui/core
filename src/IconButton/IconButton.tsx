import React from 'react';
import BaseButton from '@sinoui/core/BaseButton';
import type { Props as BaseButtonProps } from '@sinoui/core/BaseButton';
import styled from 'styled-components';
import getColorFromTheme from '../utils/getColorFromTheme';
import OverridableComponent from '../OverridableComponent';
import adjustOpacity from '../utils/adjustOpacity';
import bemClassNames from '../utils/bemClassNames';

export interface IconButtonProps extends BaseButtonProps {
  /**
   * 按钮颜色
   */
  color?: string;
  /**
   * 密集模式
   */
  dense?: boolean;
}

const rippleConfig: object = {
  center: true,
  rippleLayoutClassName: 'sinoui-icon-button__ripple-layout',
  rippleClassName: 'sinoui-icon-button__ripple',
  fixSize: true,
};

const denseRippleConfig: object = {
  center: true,
  rippleLayoutClassName: 'sinoui-icon-button--dense__ripple-layout',
  rippleClassName: 'sinoui-icon-button--dense__ripple',
  fixSize: true,
};

const IconButtonLayout = styled(BaseButton)<IconButtonProps>`
  width: ${({ theme, dense }) => theme.spacing.unit * (dense ? 4 : 6)}px;
  height: ${({ theme, dense }) => theme.spacing.unit * (dense ? 4 : 6)}px;
  border-radius: 50%;
  box-sizing: border-box;
  color: ${({ theme, color, disabled }) =>
    disabled ? theme.palette.text.disabled : getColorFromTheme(theme, color)};

  &:hover {
    background-color: ${({ theme, color }) =>
      adjustOpacity(
        theme.palette.action.hoverOpacity,
        getColorFromTheme(theme, color ?? 'textSecondary'),
      )};

    @media (hover: none) {
      background-color: transparent;
    }
  }

  > .sinoui-svg-icon {
    ${({ dense }) => dense && `font-size: 20px;`}
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

  > .sinoui-icon-button--dense__ripple-layout {
    left: 0px;
    top: 0px;
    width: 32px;
    height: 32px;
  }

  > .sinoui-icon-button--dense__ripple-layout
    > .sinoui-icon-button--dense__ripple {
    width: 32px;
    height: 32px;
  }
`;

/**
 * 图标按钮
 */
const IconButton: OverridableComponent<
  IconButtonProps,
  'button'
> = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  props,
  ref,
) {
  const {
    as,
    children,
    color = 'textSecondary',
    className,
    disabled,
    dense,
    ...other
  } = props;

  const ripple = dense ? denseRippleConfig : rippleConfig;

  return (
    <IconButtonLayout
      ripple={ripple}
      disabled={disabled}
      dense={dense}
      color={color}
      className={bemClassNames(
        'sinoui-icon-button',
        {
          disabled,
          dense,
        },
        className,
      )}
      {...other}
      forwardedAs={as}
      ref={ref}
    >
      {children}
    </IconButtonLayout>
  );
});

export default IconButton;
