import React, { useMemo, useContext } from 'react';
import classNames from 'classnames';
import styled, { ThemeContext } from 'styled-components';
import { useRipple } from '@sinoui/ripple';
import { getColorFromTheme } from './colors';

export interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  checked?: boolean;
  disabled?: boolean;
  dense?: boolean;
  color?: string;
  className?: string;
}

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  outline: none;
  border: 0px;
  padding: 0px;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  &::-moz-focus-inner {
    border-style: none;
  }

  cursor: pointer;
  pointer-events: default;

  width: 20px;
  height: 20px;

  & .sinoui-svg-icon {
    font-size: 20px;
  }

  &.sinoui-checkbox-button__disabled {
    cursor: default;
    pointer-events: none;
  }

  & .sinoui-checkbox-button-input {
    cursor: inherit;
    position: absolute;
    opacity: 0;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    margin: 0px;
    padding: 0px;
    border: none;
  }

  & .sinoui-checkbox-button__ripple {
    width: 48px;
    height: 48px;
    border-radius: 32px;
  }

  & .sinoui-checkbox-button__ripple-layout {
    left: -14px;
    top: -14px;
    width: 48px;
    height: 48px;
  }

  & .sinoui-checkbox-button__ripple-dense {
    width: 32px;
    height: 32px;
    border-radius: 16px;
  }

  & .sinoui-checkbox-button__ripple-layout-dense {
    left: -6px;
    top: -6px;
    width: 32px;
    height: 32px;
  }
  -webkit-tap-highlight-color: ${(props) =>
    props.theme.palette.background.transparent};
`;

const rippleConfig = {
  center: true,
  rippleClassName: 'sinoui-checkbox-button__ripple',
  rippleLayoutClassName: 'sinoui-checkbox-button__ripple-layout',
  fixSize: true,
};

const denseRippleConfig = {
  center: true,
  rippleClassName: 'sinoui-checkbox-button__ripple-dense',
  rippleLayoutClassName: 'sinoui-checkbox-button__ripple-layout-dense',
  fixSize: true,
};

/**
 * 按钮容器组件
 */
export default function BaseToggleButton(props: Props) {
  const ref = useRipple<HTMLDivElement>(
    props.dense ? denseRippleConfig : rippleConfig,
  );

  const theme = useContext(ThemeContext);

  const style = useMemo(() => {
    const result: React.CSSProperties = {
      color: getColorFromTheme(
        { theme, color: props.color || 'primary', disabled: props.disabled },
        theme.palette.text.secondary,
      ),
    };

    if (!props.checked) {
      result.color = theme.palette.text.secondary;
    }

    if (props.disabled) {
      result.color = theme.palette.action.disabled;
    }

    // result['-webkit-tap-highlight-color'] =
    //   theme.palette.background.transparent;

    return result;
  }, [theme, props.disabled, props.checked, props.color]);

  return (
    <Wrapper
      {...props}
      ref={ref}
      style={style}
      className={classNames('sinoui-checkbox-button', props.className, {
        'sinoui-checkbox-button__disabled': props.disabled,
        'sinoui-checkbox-button__checked': props.checked,
      })}
    />
  );
}
