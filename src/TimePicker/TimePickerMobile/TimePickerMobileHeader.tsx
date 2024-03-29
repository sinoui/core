import styled from 'styled-components';

import ClickedTextView from './ClickedTextView';
import { formatHourMinute } from './utils';

/**
 * 组件属性
 */
interface Props {
  /**
   * 是否为时钟表盘视图
   */
  isClockView: boolean;
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

const TimePickerMobileHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
  width: 100%;
  padding-right: 50px;
  box-sizing: border-box;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  overflow: hidden;
  background-color: ${(props) => props.theme.palette.primary.main};

  & .sinoui-time-picker-mobile-view__header-hour-minute {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    ${(props) => props.theme.typography.h3};
    color: ${(props) => props.theme.palette.primary.contrastText};

    & > div:first-child {
      margin-right: 8px;
    }

    & > div:last-child {
      margin-left: 8px;
    }

    ::after {
    }
  }

  & .sinoui-time-picker-mobile-view__header-am-pm {
    width: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & .sinoui-time-picker-mobile-view__header-title {
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 16px;
    ${(props) => props.theme.typography.h4};
    color: ${(props) => props.theme.palette.primary.contrastText};
  }
`;

const Colon = styled.div`
  opacity: 0.7;
`;

/**
 * 移动端时间选择的头部组件
 *
 * @param props 组件属性
 * @param props.isClockView 是否是时钟视图
 * @param props.isHourView 是否是小时视图
 * @param props.isAm 12小时制 是否上午
 * @param props.hour 小时
 * @param props.minute 分钟
 * @param props.onChangeAm AM 和 PM 改变时的回调
 * @param props.onChangeHourOrMinuteView 时分视图切换时的回调函数
 */
const TimePickerMobileHeader: React.FC<Props> = ({
  isClockView,
  isHourView,
  isAm,
  hour,
  minute,
  onChangeAm,
  onChangeHourOrMinuteView,
}) => (
  <TimePickerMobileHeaderWrapper>
    {isClockView ? (
      <>
        <div className="sinoui-time-picker-mobile-view__header-am-pm">
          <ClickedTextView selected={isAm} onClick={() => onChangeAm(true)}>
            上午
          </ClickedTextView>
          <ClickedTextView selected={!isAm} onClick={() => onChangeAm(false)}>
            下午
          </ClickedTextView>
        </div>
        <div className="sinoui-time-picker-mobile-view__header-hour-minute">
          <ClickedTextView
            selected={isHourView}
            onClick={() => onChangeHourOrMinuteView(true)}
          >
            {formatHourMinute(hour)}
          </ClickedTextView>
          <Colon>:</Colon>
          <ClickedTextView
            selected={!isHourView}
            onClick={() => onChangeHourOrMinuteView(false)}
          >
            {formatHourMinute(minute === 60 ? 0 : minute)}
          </ClickedTextView>
        </div>
      </>
    ) : (
      <div className="sinoui-time-picker-mobile-view__header-title">
        设置时间
      </div>
    )}
  </TimePickerMobileHeaderWrapper>
);

export default TimePickerMobileHeader;
