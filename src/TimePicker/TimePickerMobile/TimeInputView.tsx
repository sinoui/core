import React from 'react';
import styled from 'styled-components';
import Subtitle1 from '@sinoui/core/Subtitle1';
import TimeInput from '@sinoui/core/DateTimePicker/DateTimeMobileModal/TimeInput';

interface Props {
  /**
   * 选中时间的小时
   */
  selectedHour?: string;
  /**
   * 选中时间的分钟
   */
  selectedMinute?: string;
  /**
   * 小时的值发生变化时的回调函数
   */
  onHourChange?: (value: string) => void;
  /**
   * 分钟的值发生变化时的回调函数
   */
  onMinuteChange?: (value: string) => void;
}

const TimeInputViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
`;
const TimeInputTitle = styled(Subtitle1)`
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  padding-left: 16px;
`;

export default function TimeInputView(props: Props) {
  return (
    <TimeInputViewWrapper className="sinoui-time-picker-mobile-view__keyboard">
      <TimeInputTitle>请输入时间</TimeInputTitle>
      <TimeInput {...props} />
    </TimeInputViewWrapper>
  );
}
