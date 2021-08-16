import React, { useState } from 'react';
import BaseInput from '@sinoui/core/BaseInput';
import type { BaseInputProps } from '@sinoui/core/BaseInput';
import styled, { css } from 'styled-components';
import type { Theme } from '@sinoui/theme';
import elementResizeDetectorMaker from 'element-resize-detector';
import { debounce } from '@sinoui/utils';
import NotchedOutline from './NotchedOutline';
import adjustOpacity from '../utils/adjustOpacity';
import useEnhancedEffect from '../utils/useEnhancedEffect';

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
}

interface StyledBaseInputProps {
  error?: boolean;
  $focused?: boolean;
  $dense?: boolean;
  disabled?: boolean;
  $noLabel?: boolean;
}

/**
 * 获取边框颜色
 *
 * @param props 属性
 * @param isHover 是否是悬停状态
 */
const getOutlineColor = (
  props: StyledBaseInputProps & { theme: Theme },
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

const StyledBaseInput = styled(BaseInput)<StyledBaseInputProps>`
  position: relative;
  border-radius: 4px;

  > .sinoui-notched-outline > div {
    border-color: ${getOutlineColor};
    border-width: ${({ $focused }) => ($focused ? 2 : 1)}px;
  }

  :hover > .sinoui-notched-outline > div {
    border-color: ${(props) => getOutlineColor(props, true)};
  }

  ${({ multiline }) => (multiline ? '&' : '> .sinoui-base-input__input')} {
    padding: ${({ $noLabel }) => ($noLabel ? 8 : 16)}px 14px;

    ${({ $dense, $noLabel }) => $dense && !$noLabel && denseStyle}
    ${({ $dense, $noLabel }) => $dense && $noLabel && denseNoLabelStyle}
  }

  > .sinoui-input-adornment--start {
    margin-left: ${({ multiline }) => (multiline ? 0 : 14)}px;
    margin-right: 0px;
  }
  > .sinoui-input-adornment--end {
    margin-right: ${({ multiline }) => (multiline ? 0 : 12)}px;
    margin-left: -6px;
  }
  > .sinoui-input-adornment--start ~ .sinoui-base-input__input {
    margin-left: -8px;
  }

  > .sinoui-input-adornment--start.sinoui-input-adornment--text
    ~ .sinoui-base-input__input,
  > .sinoui-input-adornment--end.sinoui-input-adornment--text {
    margin-left: ${({ multiline }) => (multiline ? 0 : -14)}px;
  }
`;

const erd = elementResizeDetectorMaker({
  strategy: 'scroll',
});

/**
 * 轮廓输入框
 */
const OutlinedInput = React.forwardRef<HTMLDivElement, OutlinedInputProps>(
  function OutlineInput(props: OutlinedInputProps, ref) {
    const { notched, labelRef, dense, focused, noLabel, ...other } = props;
    const [notchWidth, setNotchWidth] = useState(0);

    useEnhancedEffect(() => {
      const label = labelRef?.current;
      if (label && !noLabel) {
        setNotchWidth(label.clientWidth * 0.75);

        const listener = debounce(() => {
          setNotchWidth(label.clientWidth * 0.75);
        });

        erd.listenTo(label, listener);

        return () => {
          erd.removeListener(label, listener);
        };
      }
      return undefined;
    }, []);

    return (
      <StyledBaseInput
        $focused={focused}
        ref={ref}
        $dense={dense}
        $noLabel={noLabel}
        {...other}
      >
        <NotchedOutline notched={notched} notchWidth={notchWidth} />
      </StyledBaseInput>
    );
  },
);

export default OutlinedInput;
