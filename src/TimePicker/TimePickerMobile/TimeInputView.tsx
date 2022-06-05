import TimeInput from '@sinoui/core/DateTimePicker/DateTimeMobileModal/TimeInput';
import Subtitle1 from '@sinoui/core/Subtitle1';
import styled from 'styled-components';

/**
 * 组件属性
 */
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

/**
 * 时间输入框视图
 *
 * @param props 组件属性
 */
const TimeInputView: React.FC<Props> = (props) => (
  <TimeInputViewWrapper className="sinoui-time-picker-mobile-view__keyboard">
    <TimeInputTitle>请输入时间</TimeInputTitle>
    <TimeInput {...props} />
  </TimeInputViewWrapper>
);

export default TimeInputView;
