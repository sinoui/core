import React from 'react';
import styled, { css } from 'styled-components';
import { useRipple } from '@sinoui/ripple';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';
import classNames from 'classnames';
import { opacify } from 'polished';
import useMultiRefs from '../utils/useMultiRefs';

/**
 * 宽度
 */
const WidthStyle = (props: Props) => {
  let width;
  if (props.extended) {
    width = 'auto';
  } else if (props.mini) {
    width = '40px';
  } else {
    width = '56px';
  }
  return width;
};

/**
 * 高度
 */
const HeightStyle = (props: Props) => {
  let height;
  if (props.extended) {
    height = '48px';
  } else if (props.mini) {
    height = '40px';
  } else {
    height = '56px';
  }
  return height;
};

const FabStyle = css<Props>`
  ${({ theme }) => ({ ...theme.typography.button })};
  position: relative;
  margin: 0px;
  width: ${(props) => WidthStyle(props)};
  height: ${(props) => HeightStyle(props)};
  border-radius: ${(props) => (props.extended ? '24px' : '50%')};
  color: #fff;
  background: ${(props) => getColorFromTheme(props.theme, props.color)};
  padding: ${(props) => (props.extended ? '0px 20px' : '0px')};
  font-size: ${(props) => (props.extended ? '0.875rem' : '24px')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) => props.theme.shadows[6]};
  fill: currentColor;
  user-select: none;
  max-width: 100%;
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;
  &::-moz-focus-inner {
    border-style: none;
  }

  &:hover {
    box-shadow: ${(props) => props.theme.shadows[12]};
    background-color: ${({ theme, color }) =>
      opacify(
        theme.palette.action.hoverOpacity - 0.12,
        getColorFromTheme(theme, color) || theme.palette.primary.main,
      )};
  }

  // Reset on touch devices, it doesn't add specificity
  @media (hover: none) {
    backgroundcolor: transparent;
  }

  &:foucs {
    box-shadow: ${(props) => props.theme.shadows[12]};
  }

  &.sinoui-fab--disabled {
    pointer-events: none;
    cursor: default;
  }

  .sinoui-fab__ripple-layout {
    width: ${(props) => WidthStyle(props)};
    height: ${(props) => HeightStyle(props)};
  }

  .sinoui-fab__ripple {
    width: ${(props) => WidthStyle(props)};
    height: ${(props) => HeightStyle(props)};
  }
`;

const FabWrapper = styled.div`
  ${FabStyle}
`;

/**
 * 浮动按钮类型
 */
export interface Props {
  /**
   * 子元素
   */
  children: React.ReactNode;
  /**
   * 指定颜色
   */
  color?: string;
  /**
   * 较小显示
   */
  mini?: boolean;
  /**
   * 扩展样式
   */
  extended?: boolean;
  /**
   * 不可用状态
   */
  disabled?: boolean;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 指定样式
   */
  style?: React.CSSProperties;
  /**
   * 指向根元素
   */
  ref?: React.Ref<HTMLInputElement>;
}

/**
 * 浮动按钮
 */
const Fab = React.forwardRef((props: Props, ref: any) => {
  const {
    color = 'primary',
    mini,
    extended,
    disabled,
    children,
    className,
    style,
    ...rest
  } = props;

  const rippleRef = useRipple<HTMLButtonElement>({
    disabled,
    fixSize: !extended && true,
    center: !extended && true,
    rippleLayoutClassName: !extended ? 'sinoui-fab__ripple-layout' : '',
    rippleClassName: !extended ? 'sinoui-fab__ripple' : '',
  });
  const handleRef = useMultiRefs<HTMLButtonElement | HTMLElement | null>(
    ref,
    rippleRef,
  );
  return (
    <FabWrapper
      {...rest}
      className={classNames('sinoui-fab', className, {
        'sinoui-fab--extended': extended,
        'sinoui-fab--disabled': disabled,
      })}
      ref={handleRef}
      color={color}
      mini={mini}
      extended={extended}
      disabled={disabled}
      style={style}
    >
      {children}
    </FabWrapper>
  );
});

export default Fab;
