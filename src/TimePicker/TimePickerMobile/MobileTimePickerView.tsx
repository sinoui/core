import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@sinoui/core/Button';
import Clock from './Clock';
import MobileTimePickerHeader from './MobileTimePickerHeader';
import {
  getRotateDegByTimeValue,
  getHourByRotateDeg,
  getMinuteByRotateDeg,
  get24HourByIsAm,
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
  onChange?: (hour: number, minute: number) => void;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;
const MobileTimePickerViewBody = styled.div`
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 4px;

  & .sinoui-time-picker-mobile-view__main {
    margin: 16px 0;
  }

  & .sinoui-time-picker-mobile-view__footer {
    display: flex;
    width: 100%;
    padding: 0 8px 8px 0;
    box-sizing: border-box;
    justify-content: flex-end;
  }
`;

const MobileTimePickerView = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { value = '', onRequestClose, onChange } = props;
    // 当前时间 时分指针旋转角度
    const [hourDeg, minuteDeg] = getRotateDegByTimeValue(value);
    // 时针旋转角度
    const [isAm, onChangeAm] = useState(new Date().getHours() <= 12);
    // 时针旋转角度
    const [hourRotateDeg, setHourRotateDeg] = useState(hourDeg);
    // 分针旋转角度
    const [minuteRotateDeg, setMinuteRotateDeg] = useState(minuteDeg);

    const onOK = () => {
      const hourValue = getHourByRotateDeg(hourRotateDeg);
      const minuteValue = getMinuteByRotateDeg(minuteRotateDeg);
      if (onChange) {
        onChange(
          get24HourByIsAm(hourValue, isAm),
          minuteValue === 60 ? 0 : minuteValue,
        );
        onRequestClose();
      }
    };

    return (
      <Wrapper className="sinoui-time-picker-mobile-view" ref={ref}>
        <MobileTimePickerViewBody>
          <MobileTimePickerHeader
            hour={getHourByRotateDeg(hourRotateDeg)}
            minute={getMinuteByRotateDeg(minuteRotateDeg)}
            isAm={isAm}
            onChangeAm={onChangeAm}
          />
          <div className="sinoui-time-picker-mobile-view__main">
            <Clock
              hourRotateDeg={hourRotateDeg}
              minuteRotateDeg={minuteRotateDeg}
              onChangeHourRotateDeg={setHourRotateDeg}
              onChangeMinuteRotateDeg={setMinuteRotateDeg}
            />
          </div>
          <div className="sinoui-time-picker-mobile-view__footer">
            <Button onClick={onRequestClose}>取消</Button>
            <Button onClick={onOK}>确定</Button>
          </div>
        </MobileTimePickerViewBody>
      </Wrapper>
    );
  },
);
export default MobileTimePickerView;
