import React from 'react';
import BaseButton, { BaseButtonProps } from '@sinoui/core/BaseButton';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import textButtonStyle from './textButtonStyle';

export interface ButtonProps extends BaseButtonProps {
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
  color?: boolean;
}

const outlinedStyle = css`
  border: 1px solid currentColor;
  border-radius: 4px;
  padding: 0 16px;
`;

const raisedStyle = css<ButtonProps>`
  padding: 0 16px;
  box-shadow: ${(props) => !props.disabled && props.theme.shadows[2]};
  color: ${(props) => props.theme.palette.primary.contrastText};
  background-color: ${(props) => props.theme.palette.primary.main};
  border-radius: 4px;
  transition: box-shadow 280ms;

  &:hover {
    background-color: ${(props) => props.theme.palette.primary.main};
    box-shadow: ${(props) => !props.disabled && props.theme.shadows[8]};
  }
`;

const StyledBaseButton = styled(BaseButton)<ButtonProps>`
  ${textButtonStyle};
  ${(props) => props.outlined && outlinedStyle};
  ${(props) => props.raised && raisedStyle};
`;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  ref,
) {
  const { className, outlined, raised, ...other } = props;
  return (
    <StyledBaseButton
      className={classNames('sinoui-button', {
        'sinoui-button--outlined': outlined,
        'sinoui-button--raised': raised,
        className,
      })}
      ref={ref}
      raised={raised}
      outlined={outlined}
      {...other}
    />
  );
});

export default Button;
