import React from 'react';
import type { HTMLAttributes } from 'react';
import classNames from 'classnames';
import { useRipple } from '@sinoui/ripple';
import styled, { css } from 'styled-components';
import useMultiRefs from '../utils/useMultiRefs';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  /**
   * 自定义class名称
   */
  className?: string;
  /**
   * 设置超链接
   */
  href?: string;
  /**
   * 是否启用涟漪效果，默认启用。也可设置为对象，指定涟漪效果参数
   */
  ripple?: boolean | object;
  /**
   * 不可用状态
   */
  disabled?: boolean;
  /**
   * 指定根元素组件类型
   */
  as?: React.ElementType;
  ref?: React.Ref<HTMLElement>;
}

const BaseButtonStyle = css<Props>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  outline: 0;
  border: 0px;
  padding: 0px;
  margin: 0;
  border-radius: 0;
  vertical-align: middle;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  color: inherit;
  text-decoration: none;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'default')};
  &::-moz-focus-inner {
    border-style: none;
  }
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  user-select: none;

  &:hover {
    background-color: ${({ theme }) => theme.palette.action.hover};

    @media (hover: none) {
      background-color: transparent;
    }
  }
`;

const BaseButtonLayout = styled.button`
  ${BaseButtonStyle}
`;

/**
 * 基础的可点击元素
 */
const BaseButton: React.FC<Props> = React.forwardRef<HTMLElement, Props>(
  (props, ref) => {
    const {
      children,
      className,
      href,
      as: asProp = href ? 'a' : 'button',
      ripple = true,
      disabled,
      ...other
    } = props;

    const rippleConfig =
      typeof ripple === 'object'
        ? { ...ripple, disabled }
        : { disabled: disabled || ripple === false };
    const rippleRef = useRipple(rippleConfig);

    const handleRef = useMultiRefs<HTMLElement>(ref, rippleRef);

    const buttonProps =
      asProp === 'button'
        ? {
            type: 'button',
            disabled,
            role: 'button',
            'aria-disabled': disabled,
          }
        : {};

    return (
      <BaseButtonLayout
        {...(buttonProps as any)}
        className={classNames('sinoui-base-button', className)}
        as={asProp}
        href={href}
        ref={handleRef}
        disabled={disabled}
        {...other}
      >
        {children}
      </BaseButtonLayout>
    );
  },
);

if (process.env.NODE_ENV === 'development') {
  BaseButton.displayName = 'BaseButton';
}

export default BaseButton;
