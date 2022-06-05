import IconButton from '@sinoui/core/IconButton';
import Keyboard from '@sinoui/icons/Keyboard';
import Schedule from '@sinoui/icons/Schedule';

/**
 *
 */
interface Props {
  /**
   * 是否是时钟视图
   */
  isClockView: boolean;
  /**
   * 切换时钟视图回调函数
   */
  onChangeClockView: (value: boolean) => void;
}

/**
 * 移动端日期弹出框 底部视图切换图标
 *
 * @param props 组件属性
 * @param props.isClockView 是否是时钟视图
 * @param props.onChangeClockView 切换时钟视图回调函数
 */
const TimePickerMobileViewIcon: React.FC<Props> = ({
  isClockView,
  onChangeClockView,
}) => (
  <IconButton
    dense
    color="primary"
    onClick={() => onChangeClockView(!isClockView)}
    data-view-icon
  >
    {isClockView ? <Keyboard /> : <Schedule />}
  </IconButton>
);

export default TimePickerMobileViewIcon;
