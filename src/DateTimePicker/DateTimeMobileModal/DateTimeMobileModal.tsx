import Fade from '@sinoui/core/Fade';
import type { ModalProps } from '@sinoui/core/Modal';
import Modal from '@sinoui/core/Modal';

import DateTimeMobileView from './DateTimeMobileView';

/**
 * 组件属性
 */
interface Props extends Omit<ModalProps, 'children'> {
  /**
   * 选中的日期
   */
  date?: Date;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value: string) => void;
  /**
   * 默认年份
   */
  defaultYear?: number;
  /**
   * 默认月份
   */
  defaultMonth?: number;
  /**
   * 是否展示今天
   */
  showToday?: boolean;
  /**
   * 星期开始位置。`0`表示开始的是星期日，`1`表示星期一。默认为`1`。
   */
  startOfWeek?: 0 | 1;
  /**
   * 最小日期
   */
  minDate?: Date;
  /**
   * 最大日期
   */
  maxDate?: Date;
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
  /**
   * 弹窗关闭时的回调函数
   */
  onRequestClose?: () => void;
}

/**
 * 移动端日期时间选择弹窗组件
 *
 * @param props 组件属性
 */
const DateTimeMobileModal: React.FC<Props> = (props) => {
  const {
    open,
    onRequestClose,
    date,
    onChange,
    defaultMonth,
    defaultYear,
    startOfWeek,
    minHour,
    minMinute,
    maxHour,
    maxMinute,
    minDate,
    maxDate,
    showToday,
    ...other
  } = props;
  return (
    <Modal
      open={open}
      onRequestClose={onRequestClose}
      {...other}
      autoFocus={false}
      enforceFocus={false}
    >
      <Fade in={open}>
        <DateTimeMobileView
          {...other}
          onClose={onRequestClose}
          date={date}
          showToday={showToday}
          onChange={onChange}
          defaultMonth={defaultMonth}
          defaultYear={defaultYear}
          startOfWeek={startOfWeek}
          minHour={minHour}
          maxHour={maxHour}
          minMinute={minMinute}
          maxMinute={maxMinute}
          minDate={minDate}
          maxDate={maxDate}
        />
      </Fade>
    </Modal>
  );
};

export default DateTimeMobileModal;
