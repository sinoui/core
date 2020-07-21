import React from 'react';
import styled from 'styled-components';
import { useRipple } from '@sinoui/ripple';
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
  cursor: pointer;
  border-radius: 4px;
  ${(props) => props.selected && `color: #fff`};
`;

export default function HourMinuteView({ value, selected, onChange }: Props) {
  const rippleRef = useRipple<HTMLDivElement>();
  return (
    <HourMinuteWrapper selected={selected} onClick={onChange} ref={rippleRef}>
      {formatHourMinute(value)}
    </HourMinuteWrapper>
  );
}
