import React, { useLayoutEffect, useState } from 'react';
import BaseInput from '@sinoui/core/BaseInput';
import type { BaseInputProps } from '@sinoui/core/BaseInput';
import styled from 'styled-components';
import type { Theme } from '@sinoui/theme';
import NotchedOutline from './NotchedOutline';
import { DISABLED_INPUT_LINE_COLOR } from './constant';

export interface OutlinedInputProps extends BaseInputProps {
  /**
   * 如果设置为 `true`，输入框将显示为错误状态。
   */
  error?: boolean;
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
}

interface StyledBaseInputProps {
  error?: boolean;
  $focused?: boolean;
  $dense?: boolean;
  disabled?: boolean;
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
    return DISABLED_INPUT_LINE_COLOR[theme.palette.type];
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
  return theme.palette.text.hint;
};

const StyledBaseInput = styled(BaseInput)<StyledBaseInputProps>`
  position: relative;
  border-radius: 4px;

  > .sinoui-notched-outline > div {
    border-color: ${getOutlineColor};
    border-width: ${({ $focused }) => ($focused ? 2 : 1)}px;
  }

  :hover > .sinoui-notched-outline {
    border-color: ${(props) => getOutlineColor(props, true)};
  }

  > input,
  > textarea {
    padding: 18.5px 14px;

    ${({ $dense }) => $dense && 'padding-top:10.5px;padding-bottom:10.5px;'}
  }
`;

/**
 * 轮廓输入框
 */
const OutlinedInput = React.forwardRef<HTMLDivElement, OutlinedInputProps>(
  function OutlineInput(props: OutlinedInputProps, ref) {
    const { notched, labelRef, dense, focused, ...other } = props;
    const [notchWidth, setNotchWidth] = useState(0);
    const [isInitedShrink] = useState(notched);

    useLayoutEffect(() => {
      const label = labelRef?.current;
      if (label) {
        setNotchWidth(
          label.getBoundingClientRect().width * (isInitedShrink ? 1 : 0.75),
        );
      }
    }, [isInitedShrink, labelRef]);

    return (
      <StyledBaseInput $focused={focused} ref={ref} $dense={dense} {...other}>
        <NotchedOutline notched={notched} notchWidth={notchWidth} />
      </StyledBaseInput>
    );
  },
);

export default OutlinedInput;
