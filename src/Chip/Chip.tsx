import React from 'react';
import BaseButton from '@sinoui/core/BaseButton';
import styled, { css } from 'styled-components';
import CancelIcon from '@sinoui/core/svg-icons/Cancel';
import { Theme } from '@sinoui/theme';
import { opacify } from 'polished';
import OverridableComponent from '../OverridableComponent';
import bemClassNames from '../utils/bemClassNames';
import singleLineTextCss from '../utils/singleLineTextCss';
import getColorFromTheme from '../utils/getColorFromTheme';
import {
  BASIC_CHIP_BG,
  BORDER_COLOR,
  DELETE_ICON_HOVER_COLOR,
  DELETE_ICON_COLOR,
  LEADING_ICON_COLOR,
} from './contains';

export interface Props {
  /**
   * 标签内容
   */
  label: string;
  /**
   * 是否支持点击
   */
  clickable?: boolean;
  /**
   * 指定组件的根元素
   */
  as?: React.ReactType;
  /**
   * 自定义样式类名称
   */
  className?: string;
  /**
   * 点击删除图标时的回调函数
   */
  onDelete?: (event: React.MouseEvent) => void;
  /**
   * 不可用状态
   */
  disabled?: boolean;
  /**
   * 展现形式
   */
  variant?: 'standard' | 'outlined';
  /**
   * 密集模式
   */
  dense?: boolean;
  /**
   * 自定义背景色
   */
  color?: string;
  /**
   * 前缀图标
   */
  icon?: React.ReactNode;
  /**
   * 前缀头像
   */
  avatar?: React.ReactNode;
}

export interface ChipLayoutProps {
  $variant?: 'standard' | 'outlined';
  disabled?: boolean;
  dense?: boolean;
  color?: string;
}

/**
 * 处理标准模式下的文本颜色
 * @param theme
 * @param disabled
 * @param color
 */
const getColor = (theme: Theme, disabled?: boolean, color?: string) => {
  if (disabled) {
    return theme.palette.text.primary;
  }

  if (color) {
    return theme.palette.primary.contrastText;
  }

  return theme.palette.text.primary;
};

/**
 * 获取删除按钮的颜色
 * @param theme
 * @param disabled
 * @param color
 */
const getDeleteIconColor = (
  theme: Theme,
  variant: 'standard' | 'outlined',
  disabled?: boolean,
  color?: string,
) => {
  if (disabled) {
    return 'currentColor';
  }

  if (color) {
    if (variant === 'outlined') {
      return opacify(-0.3, getColorFromTheme(theme, color));
    }
    return opacify(-0.3, theme.palette.primary.contrastText);
  }

  return DELETE_ICON_COLOR[theme.palette.type];
};

/**
 * 获取删除按钮hover时的样式
 * @param theme
 * @param disabled
 * @param color
 */
const getDeleteIconHoverColor = (
  theme: Theme,
  disabled?: boolean,
  color?: string,
) => {
  if (disabled || color) {
    return 'currentColor';
  }

  return DELETE_ICON_HOVER_COLOR[theme.palette.type];
};

const outlinedStyle = css<ChipLayoutProps>`
  border: 1px solid
    ${({ theme, color = BORDER_COLOR[theme.palette.type], disabled }) =>
      disabled ? theme.palette.text.disabled : getColorFromTheme(theme, color)};
  background-color: transparent;
  color: ${({ theme, color = 'textPrimary', disabled }) =>
    disabled ? theme.palette.text.disabled : getColorFromTheme(theme, color)};
  transition: ${({ theme: { transitions } }) =>
    transitions.create(['width', 'background-color', 'color', 'border-color'], {
      duration: transitions.duration.short,
      easing: transitions.easing.easeIn,
    })};

  :focus {
    background-color: rgba(0, 0, 0, 0.04);
  }

  > .sinoui-chip__delete {
    color: ${({ theme, color, disabled }) =>
      getDeleteIconColor(theme, 'outlined', disabled, color)};

    &:hover {
      color: ${({ theme, color, disabled }) =>
        getDeleteIconHoverColor(theme, disabled, color)};

      @media (hover: none) {
        color: ${({ theme, color, disabled }) =>
          getDeleteIconColor(theme, 'outlined', disabled, color)};
      }
    }
  }
`;

const chipStyle = css<ChipLayoutProps>`
  display: inline-flex;
  align-items: center;
  height: 32px;
  border-radius: 16px;
  padding: 0 12px;
  overflow: hidden;
  background-color: ${({
    theme,
    color = BASIC_CHIP_BG[theme.palette.type],
    disabled,
  }) =>
    disabled
      ? theme.palette.action.disabledBackground
      : getColorFromTheme(theme, color)};
  max-width: 100%;
  box-sizing: border-box;
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme, disabled, color }) => getColor(theme, disabled, color)};
  ${({ disabled }) => disabled && `opacity:0.5`};
  transition: ${({ theme: { transitions } }) =>
    transitions.create(['width', 'background-color', 'color'], {
      duration: transitions.duration.short,
      easing: transitions.easing.easeIn,
    })};

  > .sinoui-avatar {
    width: 24px;
    height: 24px;
    margin-left: -8px;
    margin-right: 8px;
  }

  > .sinoui-svg-icon {
    margin-left: -8px;
    margin-right: 8px;
    color: ${({ color, disabled, theme }) =>
      color || disabled
        ? 'currentColor'
        : LEADING_ICON_COLOR[theme.palette.type]};
  }

  > .sinoui-chip__delete {
    margin-left: 4px;
    margin-right: -6px;
    color: ${({ theme, color, disabled }) =>
      getDeleteIconColor(theme, 'standard', disabled, color)};

    &:hover {
      color: ${({ theme, color, disabled }) =>
        getDeleteIconHoverColor(theme, disabled, color)};

      @media (hover: none) {
        color: ${({ theme, color, disabled }) =>
          getDeleteIconColor(theme, 'standard', disabled, color)};
      }
    }
  }

  :focus {
    outline: none;
    background-color: rgb(206, 206, 206);
  }

  ${({ $variant }) => $variant === 'outlined' && outlinedStyle};
`;

const denseChipStyle = css`
  height: 24px;

  > .sinoui-svg-icon,
  > .sinoui-avatar {
    width: 18px;
    height: 18px;
  }

  > .sinoui-chip__delete {
    width: 16px;
    height: 16px;
  }
`;

const hoverStyle = css`
  background-color: rgba(0, 0, 0, 0.26);
`;

const ChipLayout = styled.div<ChipLayoutProps>`
  ${chipStyle};
  ${({ dense }) => dense && denseChipStyle};
`;

const ClickableChipLayout = styled(BaseButton)<ChipLayoutProps>`
  ${chipStyle};
  &:hover {
    ${({ $variant }) => $variant !== 'outlined' && hoverStyle};
  }
`;

const ChipContent = styled.span`
  ${singleLineTextCss}
`;

const CancelButton = styled(CancelIcon)`
  height: 20px;
  width: 20px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  transition: ${({ theme: { transitions } }) =>
    transitions.create(['color'], {
      duration: transitions.duration.short,
      easing: transitions.easing.easeIn,
    })};
`;

const Chip: OverridableComponent<Props, 'div'> = React.forwardRef<
  HTMLElement,
  Props
>(function Chip(props, ref) {
  const {
    label,
    as: AsComp,
    clickable,
    className,
    onDelete,
    variant = 'standard',
    disabled,
    dense,
    icon,
    avatar,
    ...rest
  } = props;

  const Comp: React.ReactType =
    AsComp || clickable ? ClickableChipLayout : ChipLayout;

  const onClick = (event: React.MouseEvent) => {
    if (disabled) {
      return;
    }

    if (onDelete) {
      onDelete(event);
    }
  };

  return (
    <Comp
      ref={ref}
      className={bemClassNames(
        'sinoui-chip',
        { disabled, outlined: variant === 'outlined' },
        className,
      )}
      $variant={variant}
      disabled={disabled}
      dense={dense}
      aria-disabled={disabled ? 'true' : undefined}
      {...rest}
    >
      {avatar || icon}
      <ChipContent className="sinoui-chip__content">{label}</ChipContent>
      {onDelete && (
        <CancelButton
          className="sinoui-chip__delete"
          onClick={onClick}
          disabled={disabled}
        />
      )}
    </Comp>
  );
});

export default Chip;
