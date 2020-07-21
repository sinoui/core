import React, { useState } from 'react';
import TextInput from '@sinoui/core/TextInput';
import styled from 'styled-components';
import Body2 from '@sinoui/core/Body2';

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

  /**
   * 最小小时数。默认为`0`。
   */
  minHour?: number;
  /**
   * 最大小时数。默认为`23`。
   */
  maxHour?: number;
  /**
   * 最小分钟数。默认为`0`。
   */
  minMinute?: number;
  /**
   * 最大分钟数。默认为`59`。
   */
  maxMinute?: number;
}

const TimeWrapper = styled.div`
  padding: 16px;
  display: inline-flex;
  align-items: center;
`;

const Divider = styled(Body2)`
  width: 48px;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledInput = styled(TextInput)`
  width: 124px;
`;

/**
 * 判断值是否不可用
 * @param value 值
 * @param min 最小值
 * @param max 最大值
 */
function isInValidateValue(value: string, min?: number, max?: number) {
  const numValue = Number(value);

  if ((min || min === 0) && max) {
    return numValue < min || numValue > max;
  }

  if (min || min === 0) {
    return numValue < min;
  }

  if (max) {
    return numValue > max;
  }

  return false;
}

/**
 * 时间输入组件
 * @param props
 */
export default function TimeInput(props: Props) {
  const {
    selectedHour,
    selectedMinute,
    minHour,
    minMinute,
    maxHour,
    maxMinute,
    onHourChange: onHourChangeProp,
    onMinuteChange: onMinuteChangeProp,
  } = props;

  const defaultHour = selectedHour ?? '';
  const defaultMinute = selectedMinute ?? '';

  const [hour, setHour] = useState(defaultHour);
  const [minute, setMinute] = useState(defaultMinute);

  const onHourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHour(event.target.value);
  };

  const onMinuteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinute(event.target.value);
  };

  const onHourBlur = () => {
    if (onHourChangeProp) {
      if (isInValidateValue(hour, minHour, maxHour)) {
        onHourChangeProp(defaultHour);
        setHour(defaultHour);
      } else {
        onHourChangeProp(hour);
      }
    }
  };

  const onMinuteBlur = () => {
    if (onMinuteChangeProp) {
      if (isInValidateValue(minute, minMinute, maxMinute)) {
        onMinuteChangeProp(defaultMinute);
        setMinute(defaultMinute);
      } else {
        onMinuteChangeProp(minute);
      }
    }
  };

  return (
    <TimeWrapper className="sinoui-date-time-mobile-view__timeview">
      <StyledInput
        baseClassName="sinoui-date-time-mobile-view__timeview-hour-input"
        type="number"
        placeholder={hour}
        helperText="点"
        value={hour}
        onChange={onHourChange}
        onBlur={onHourBlur}
        inputProps={{
          min: minHour,
          max: maxHour,
        }}
      />
      <Divider>:</Divider>
      <StyledInput
        baseClassName="sinoui-date-time-mobile-view__timeview-minute-input"
        type="number"
        placeholder={minute}
        helperText="分"
        value={minute}
        onChange={onMinuteChange}
        onBlur={onMinuteBlur}
        inputProps={{
          min: minMinute,
          max: maxMinute,
        }}
      />
    </TimeWrapper>
  );
}
