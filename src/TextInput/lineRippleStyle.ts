import { css } from 'styled-components';
import { INPUT_LINE_COLOR, DISABLED_INPUT_LINE_COLOR } from './constant';

interface LineRippleProps {
  error?: boolean;
  focused?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  /**
   * 如何设置为true，则采用标准模式。
   */
  standard?: boolean;
}

/**
 * 下划线样式
 */
const underlineStyle = css<LineRippleProps>`
  &::before {
    background-color: ${({ theme }) => INPUT_LINE_COLOR[theme.palette.type]};
    left: 0;
    bottom: 0;
    content: '';
    display: block;
    height: 1px;
    position: absolute;
    right: 0;
    transition: ${(props) =>
      props.theme.transitions.create('background-color', {
        duration: props.theme.transitions.duration.shorter,
        easing: props.theme.transitions.easing.easeInOut,
      })};
    pointer-events: none;
    transform: scaleX(1) scaleY(1);
  }

  &:hover::before {
    ${(props) =>
      !props.disabled &&
      !props.readOnly &&
      !props.error &&
      `background-color: ${props.theme.palette.text.primary};`}
  }
`;

/**
 * 墨水条样式
 */
const inkbarStyle = css`
  &::after {
    background-color: ${(props) => props.theme.palette.primary.main};
    left: 0;
    bottom: 0;
    content: '';
    height: 2px;
    position: absolute;
    right: 0;
    transition: ${(props) =>
      props.theme.transitions.create('transform', {
        duration: props.theme.transitions.duration.shorter,
        easing: props.theme.transitions.easing.easeOut,
      })};
    pointer-events: none;
    transform: scaleX(0) scaleY(0);
  }
`;

/**
 * 悬停状态样式：下划线背景色加重
 */
const hoverStyle = css<LineRippleProps>`
  &:hover::before {
    background-color: ${(props) => props.theme.palette.text.primary};
    height: ${({ standard }) => (standard ? 2 : 1)}px;
  }
`;

/**
 * 聚焦状态样式：显示墨水条
 */
const focusedStyle = css`
  &::after {
    transform: scaleX(1) scaleY(1);
  }
`;

/**
 * 错误状态样式：显示墨水条，且颜色是红色
 */
const errorStyle = css`
  &::after {
    background-color: ${({ theme }) => theme.palette.error.main};
    transform: scaleX(1) scaleY(1);
  }
`;

/**
 * 不可用状态样式：任何情况下都不显示墨水条，下划线颜色变浅
 */
const disabledStyle = css`
  &::after {
    display: none;
  }
  &::before {
    background-color: ${({ theme }) =>
      DISABLED_INPUT_LINE_COLOR[theme.palette.type]};
  }
`;

/**
 * 在标准模式下的禁用样式：使用虚线
 */
const disabledStandardStyle = css`
  &::before {
    background: transparent;
    background-image: linear-gradient(
      to right,
      ${({ theme }) => INPUT_LINE_COLOR[theme.palette.type]} 33%,
      transparent 0%
    );
    background-position: left top;
    background-repeat: repeat-x;
    background-size: 5px 1px;
  }
`;

const baseStyle = css`
  ${underlineStyle};
  ${inkbarStyle};
  &::before,
  &::after {
    position: absolute;
    bottom: 0px;
    /*
     * 修复缺陷：输入框的下划线不出现
     *
     * 原因：IE对于小高度的元素不会正常展示。参考
     * [Inability to Have Elements with Small Heights][link1]
     *
     * * [link1]: https://code.tutsplus.com/tutorials/9-most-common-ie-bugs-and-how-to-fix-them--net-7764
     */
    overflow: hidden;
    font-size: 0px;
  }
`;

/**
 * 线条波动效果样式
 */
const lineRippleStyle = css<LineRippleProps>`
  ${baseStyle}
  ${({ error, disabled, readOnly, focused, standard }) => {
    if (disabled) {
      return standard ? disabledStandardStyle : disabledStyle;
    }
    if (error) {
      return errorStyle;
    }

    if (focused) {
      return focusedStyle;
    }

    return readOnly ? null : hoverStyle;
  }}
`;

export default lineRippleStyle;
