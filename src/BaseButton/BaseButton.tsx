import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useRipple } from '@sinoui/ripple';
import styled, { css } from 'styled-components';
import useMultiRefs from '../utils/useMultiRefs';

export interface BaseButtonProps {
  /**
   * 自定义class名称
   */
  className?: string;
  /**
   * 指定渲染用的dom元素，默认为button
   */
  as?: HTMLElement | any;
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
  children: React.ReactChild;
}

const BaseButtonStyle = css<BaseButtonProps>`
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
  }
`;

const BaseButtonLayout = styled.button.attrs(({ as }: BaseButtonProps) => ({
  as,
}))`
  ${BaseButtonStyle}
`;

/**
 * 基础的可点击元素
 */
const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  function BaseButton(props, ref) {
    const {
      children,
      className,
      as: asProp = 'button',
      ripple = true,
      href,
      disabled,
      ...other
    } = props;

    const rippleConfig =
      typeof ripple === 'object'
        ? { ...ripple, disabled }
        : { disabled: disabled || ripple === false };
    const rippleRef = useRipple(rippleConfig);

    const handleRef = useMultiRefs<HTMLButtonElement | HTMLElement | null>(
      ref,
      rippleRef,
    );

    const buttonProps =
      asProp === 'button'
        ? {
            type: 'button',
            disabled,
            role: 'button',
            'aria-disabled': disabled,
          }
        : {};

    const asComp = useMemo(() => {
      if (href) {
        return 'a';
      }
      if (asProp) {
        return asProp;
      }
      return 'button';
    }, [asProp, href]);

    return (
      <BaseButtonLayout
        {...(buttonProps as any)}
        className={classNames('sinoui-base-button', className)}
        as={asComp}
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

export default BaseButton;
