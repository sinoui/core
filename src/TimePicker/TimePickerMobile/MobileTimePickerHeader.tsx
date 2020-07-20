import React from 'react';
import styled from 'styled-components';
import HourMinuteView from './HourMinuteView';
import AmPmView from './AmPmView';

interface Props {
  /**
   * 12小时制 是否上午
   */
  isAm: boolean;
  /**
   * 是否为小时表盘
   */
  isHourView: boolean;
  /**
   * 小时
   */
  hour: number;
  /**
   * 分钟
   */
  minute: number;
  /**
   * AM 和PM 改变时的回调
   */
  onChangeAm: (isAm: boolean) => void;
  /**
   * 时分视图切换时的回调函数
   */
  onChangeHourOrMinuteView: (isHour: boolean) => void;
}

const MobileTimePickerHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
  width: 100%;
  padding-left: 50px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: ${(props) => props.theme.palette.primary.main};

  & .sinoui-time-picker-mobile-view__header-hour-minute {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    & div:first-child::after {
      content: ':';
    }
  }

  & .sinoui-time-picker-mobile-view__header-am-pm {
    width: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export default function MobileTimePickerHeader({
  isHourView,
  isAm,
  hour,
  minute,
  onChangeAm,
  onChangeHourOrMinuteView,
}: Props) {
  return (
    <MobileTimePickerHeaderWrapper>
      <div className="sinoui-time-picker-mobile-view__header-hour-minute">
        <HourMinuteView
          value={hour}
          selected={isHourView}
          onChange={() => onChangeHourOrMinuteView(true)}
        />
        <HourMinuteView
          value={minute === 60 ? 0 : minute}
          selected={!isHourView}
          onChange={() => onChangeHourOrMinuteView(false)}
        />
      </div>
      <div className="sinoui-time-picker-mobile-view__header-am-pm">
        <AmPmView selected={isAm} onChange={() => onChangeAm(true)}>
          上午
        </AmPmView>
        <AmPmView selected={!isAm} onChange={() => onChangeAm(false)}>
          下午
        </AmPmView>
      </div>
    </MobileTimePickerHeaderWrapper>
  );
}
