import React, { useState } from 'react';
import styled from 'styled-components';
import Paper from '@sinoui/core/Paper';
import Clock from './Clock';
import TimePickerMobileHeader from './TimePickerMobileHeader';
import TimePickerMobileViewIcon from './TimePickerMobileViewIcon';
import TimePickerMobileButtons from './TimePickerMobileButtons';
import TimeInputView from './TimeInputView';
import formatTime from '../formatTime';
import {
  getRotateDegByTimeValue,
  getHourByRotateDeg,
  getMinuteByRotateDeg,
  get24HourByIsAm,
  getIsAmByTimeValue,
} from './utils';

interface Props {
  value?: string;
  /**
   * 弹窗关闭时的回调函数
   */
  onRequestClose: () => void;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value?: string) => void;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

const MobileTimePickerViewPaper = styled(Paper)`
  width: 300px;

  & .sinoui-time-picker-mobile-view__main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px 0;
  }

  & .sinoui-time-picker-mobile-view__footer {
    display: flex;
    width: 100%;
    height: 48px;
    padding: 0 8px;
    box-sizing: border-box;
    align-items: center;
  }
`;

const TimePickerMobileView = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { value = '', onRequestClose, onChange, style } = props;
    // 当前时间 时分指针旋转角度
    const [hourDeg, minuteDeg] = getRotateDegByTimeValue(value);
    // 是否为AM
    const [isAm, onChangeAm] = useState(getIsAmByTimeValue(value));
    // 时针旋转角度
    const [hourRotateDeg, setHourRotateDeg] = useState(hourDeg);
    // 分针旋转角度
    const [minuteRotateDeg, setMinuteRotateDeg] = useState(minuteDeg);
    // 当前设置为时钟 还是分钟
    const [isHourView, onChangeHourOrMinuteView] = useState(true);
    const [isClockView, onChangeClockView] = useState(true);

    /**
     * 设置时间
     */
    const onOK = () => {
      const hourValue = getHourByRotateDeg(hourRotateDeg);
      const minuteValue = getMinuteByRotateDeg(minuteRotateDeg);
      if (onChange) {
        onChange(
          formatTime(
            get24HourByIsAm(hourValue, isAm),
            minuteValue === 60 ? 0 : minuteValue,
          ),
        );
      }
      onRequestClose();
    };

    /**
     * 清除时间
     */
    const onClear = () => {
      if (onChange) {
        onChange();
      }
      onRequestClose();
    };

    return (
      <MobileTimePickerViewPaper
        className="sinoui-time-picker-mobile-view"
        ref={ref}
        style={style}
      >
        <TimePickerMobileHeader
          hour={getHourByRotateDeg(hourRotateDeg)}
          minute={getMinuteByRotateDeg(minuteRotateDeg)}
          isClockView={isClockView}
          isHourView={isHourView}
          onChangeHourOrMinuteView={onChangeHourOrMinuteView}
          isAm={isAm}
          onChangeAm={onChangeAm}
        />
        <div className="sinoui-time-picker-mobile-view__main">
          {isClockView ? (
            <Clock
              isHourView={isHourView}
              onChangeHourOrMinuteView={onChangeHourOrMinuteView}
              hourRotateDeg={hourRotateDeg}
              minuteRotateDeg={minuteRotateDeg}
              onChangeHourRotateDeg={setHourRotateDeg}
              onChangeMinuteRotateDeg={setMinuteRotateDeg}
            />
          ) : (
            <TimeInputView />
          )}
        </div>
        <div className="sinoui-time-picker-mobile-view__footer">
          <TimePickerMobileViewIcon
            isClockView={isClockView}
            onChangeClockView={onChangeClockView}
          />
          <TimePickerMobileButtons
            onClear={onClear}
            onOk={onOK}
            onClose={onRequestClose}
          />
        </div>
      </MobileTimePickerViewPaper>
    );
  },
);
export default TimePickerMobileView;
