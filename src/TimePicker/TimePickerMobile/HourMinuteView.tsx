import React from 'react';
import styled from 'styled-components';
import { formatHourMinute } from './utils';

interface Props {
  value: number;
  selected: boolean;
  /**
   * 时分视图切换时的回调函数
   */
  onChange: () => void;
}

/**
 * 移动端时间选择弹出后显示的时分组件
 */
const HourMinuteWrapper = styled.div<{ selected?: boolean }>`
  ${(props) => props.theme.typography.h3};
  color: rgba(255, 255, 255, 0.54);
  cursor: pointer;
  ${(props) => props.selected && `color: #fff`};
`;

export default function HourMinuteView({ value, selected, onChange }: Props) {
  return (
    <HourMinuteWrapper selected={selected} onClick={onChange}>
      {formatHourMinute(value)}
    </HourMinuteWrapper>
  );
}
