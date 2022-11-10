import type { BaseInputProps } from '@sinoui/core/BaseInput';
import BaseInput from '@sinoui/core/BaseInput';
import type { Theme } from '@sinoui/theme';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import adjustOpacity from '../utils/adjustOpacity';
import useElementResize from '../utils/useElementResize';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import NotchedOutline from './NotchedOutline';

/**
 * 轮廓输入框组件属性类型
 */
export interface OutlinedInputProps extends BaseInputProps {
  /**
   * 如果设置为 `true`，轮廓上出现缺口，并且标签上浮到轮廓缺口处。
   */
  notched?: boolean;
  /**
   * 指定输入框对应的标签引用
   */
  labelRef?: React.RefObject<HTMLLabelElement>;
  /**
   * 密集模式
   */
  dense?: boolean;
  /**
   * 如果设置为`true`，则表示输入框处于聚焦状态。
   */
  focused?: boolean;
  /**
   * 无标签
   */
  noLabel?: boolean;
  /**
   * 是否显示方角
   */
  square?: boolean;
}

/**
 * 基础输入框样式组件属性类型
 */
interface StyledBaseInputProps {
  /**
   * 是否处于错误状态
   */
  error?: boolean;
  /**
   * 如果设置为`true`，则表示输入框处于聚焦状态。
   */
  $focused?: boolean;
  /**
   * 密集模式
   */
  $dense?: boolean;
  /**
   * 组件是否处于不可用状态
   */
  disabled?: boolean;
  /**
   * 无标签
   */
  $noLabel?: boolean;
  /**
   * 是否显示方角
   */
  $square?: boolean;
}

/**
 * 获取边框颜色
 *
 * @param props 属性
 * @param isHover 是否是悬停状态
 */
const getOutlineColor = (
  props: StyledBaseInputProps & {
    /**
     * 主题
     */
    theme: Theme;
  },
  /**
   * 鼠标是否处于该组件上
   */
  isHover?: boolean,
) => {
  const { theme, $focused, error, disabled } = props;
  if (disabled) {
    return theme.palette.action.disabled;
  }
  if (error) {
    return theme.palette.error.main;
  }
  if ($focused) {
    return theme.palette.primary.main;
  }
  if (isHover) {
    return theme.palette.text.primary;
  }
  return adjustOpacity(0.38, theme.palette.action.active);
};

const denseStyle = css`
  padding-top: 8px;
  padding-bottom: 8px;
`;

const denseNoLabelStyle = css`
  padding-top: 4px;
  padding-bottom: 4px;
`;

const roundCss = css`
  border-radius: 4px;
`;

const StyledBaseInput = styled(BaseInput)<StyledBaseInputProps>`
  position: relative;
  ${({ $square }) => !$square && roundCss};

  > .sinoui-notched-outline > div {
    border-color: ${getOutlineColor};
    border-width: ${({ $focused }) => ($focused ? 2 : 1)}px;
  }

  :hover > .sinoui-notched-outline > div {
    border-color: ${(props) => getOutlineColor(props, true)};
  }

  ${({ multiline }) => (multiline ? '&' : '> .sinoui-base-input__input')} {
    padding: ${({ $noLabel }) => ($noLabel ? 8 : 16)}px 12px;

    ${({ $dense, $noLabel }) => $dense && !$noLabel && denseStyle}
    ${({ $dense, $noLabel }) => $dense && $noLabel && denseNoLabelStyle}
  }

  > .sinoui-input-adornment--start {
    margin-left: ${({ multiline }) => (multiline ? 0 : 12)}px;
    margin-right: 0px;
  }
  > .sinoui-input-adornment--end {
    margin-right: ${({ multiline }) => (multiline ? 0 : 10)}px;
    margin-left: -6px;
  }
  > .sinoui-input-adornment--start ~ .sinoui-base-input__input {
    margin-left: -8px;
  }

  > .sinoui-input-adornment--start.sinoui-input-adornment--text
    ~ .sinoui-base-input__input,
  > .sinoui-input-adornment--end.sinoui-input-adornment--text {
    margin-left: ${({ multiline }) => (multiline ? 0 : -12)}px;
  }
`;

/**
 * 轮廓输入框
 */
const OutlinedInput = React.forwardRef<HTMLDivElement, OutlinedInputProps>(
  function OutlinedInput(props: OutlinedInputProps, ref) {
    const { notched, labelRef, dense, focused, noLabel, square, ...other } =
      props;
    const [notchWidth, setNotchWidth] = useState(0);

    const syncNotchWidth = () => {
      const label = labelRef?.current;
      if (label && !noLabel) {
        setNotchWidth(label.clientWidth * 0.75);
      }
    };

    useEnhancedEffect(syncNotchWidth, []);
    useElementResize(labelRef, syncNotchWidth);

    return (
      <StyledBaseInput
        $focused={focused}
        ref={ref}
        $dense={dense}
        $noLabel={noLabel}
        $square={square}
        {...other}
      >
        <NotchedOutline
          notched={notched}
          notchWidth={notchWidth}
          square={square}
        />
      </StyledBaseInput>
    );
  },
);

export default OutlinedInput;
