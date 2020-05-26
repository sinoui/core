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
}

export interface ChipLayoutProps {
  $variant?: 'standard' | 'outlined';
  disabled?: boolean;
}

const outlinedStyle = css`
  border: 1px solid rgba(0, 0, 0, 0.23);
  background-color: transparent;
`;

const ChipLayout = styled.div<ChipLayoutProps>`
  display: inline-flex;
  align-items: center;
  height: 32px;
  border-radius: 16px;
  padding: 0 12px;
  overflow: hidden;
  background-color: #e0e0e0;
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme, disabled }) =>
    disabled ? theme.palette.text.disabled : theme.palette.text.secondary};
  ${({ $variant }) => $variant === 'outlined' && outlinedStyle};
  ${({ disabled }) => disabled && `opacity:0.5`};
`;

const ChipContent = styled.span``;

const CancelButton = styled(CancelIcon)`
  margin-left: 8px;
  margin-right: -4px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

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
  } = props;
  const Comp: React.ReactType = AsComp || clickable ? BaseButton : ChipLayout;

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
      className={bemClassNames('sinoui-chip', { disabled }, className)}
      $variant={variant}
      disabled={disabled}
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