import React from 'react';
import BaseButton from '@sinoui/core/BaseButton';
import styled, { css } from 'styled-components';
import CancelIcon from '@sinoui/core/svg-icons/Cancel';
import OverridableComponent from '../OverridableComponent';
import bemClassNames from '../utils/bemClassNames';

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
}

export interface ChipLayoutProps {
  $variant?: 'standard' | 'outlined';
  disabled?: boolean;
  dense?: boolean;
}

const outlinedStyle = css`
  border: 1px solid rgba(0, 0, 0, 0.23);
  background-color: transparent;
`;

const chipStyle = css<ChipLayoutProps>`
  display: inline-flex;
  align-items: center;
  height: 32px;
  border-radius: 16px;
  padding: 0 12px;
  overflow: hidden;
  background-color: #e0e0e0;
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme, disabled }) =>
    disabled ? theme.palette.text.disabled : theme.palette.text.primary};
  ${({ $variant }) => $variant === 'outlined' && outlinedStyle};
  ${({ disabled }) => disabled && `opacity:0.5`};
`;

const denseChipStyle = css`
  height: 24px;

  > .sinoui-chip__delete {
    width: 20px;
    height: 20px;
    margin-right: -8px;
  }
`;

const hoverStyle = css`
  background-color: rgba(0, 0, 0, 0.26);
`;

const ChipLayout = styled.div<ChipLayoutProps>`
  ${chipStyle};
  ${({ dense }) => dense && denseChipStyle}
`;

const ClickableChipLayout = styled(BaseButton)<ChipLayoutProps>`
  ${chipStyle};
  &:hover {
    ${({ $variant }) => $variant !== 'outlined' && hoverStyle};
  }
`;

const ChipContent = styled.span``;

const CancelButton = styled(CancelIcon)`
  margin-left: 8px;
  margin-right: -4px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme, disabled }) =>
    disabled ? theme.palette.text.disabled : theme.palette.text.secondary};

  &:hover {
    fill: ${({ theme, disabled }) =>
      disabled ? theme.palette.text.disabled : theme.palette.text.primary};

    @media (hover: none) {
      fill: ${({ theme, disabled }) =>
        disabled ? theme.palette.text.disabled : theme.palette.text.secondary};
    }
  }
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
      {...rest}
    >
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
