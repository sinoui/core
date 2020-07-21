import React, { useState } from 'react';
import styled from 'styled-components';
import Clock from './Clock';
import MobileTimePickerHeader from './MobileTimePickerHeader';
import MobilePickerFooterViewIcon from './MobilePickerFooterViewIcon';
import MobilePickerFooterButtons from './MobilePickerFooterButtons';
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
  onChange?: (hour?: number, minute?: number) => void;
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
    padding: 0 8px 8px 16px;
    box-sizing: border-box;
    align-items: center;
  }
`;

const MobileTimePickerView = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { value = '', onRequestClose, onChange } = props;
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
          get24HourByIsAm(hourValue, isAm),
          minuteValue === 60 ? 0 : minuteValue,
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
      <Wrapper className="sinoui-time-picker-mobile-view" ref={ref}>
        <MobileTimePickerViewBody>
          <MobileTimePickerHeader
            hour={getHourByRotateDeg(hourRotateDeg)}
            minute={getMinuteByRotateDeg(minuteRotateDeg)}
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
              <div>keyboard</div>
            )}
          </div>
          <div className="sinoui-time-picker-mobile-view__footer">
            <MobilePickerFooterViewIcon
              isClockView={isClockView}
              onChangeClockView={onChangeClockView}
            />
            <MobilePickerFooterButtons
              onClear={onClear}
              onOk={onOK}
              onClose={onRequestClose}
            />
          </div>
        </MobileTimePickerViewBody>
      </Wrapper>
    );
  },
);
export default MobileTimePickerView;
