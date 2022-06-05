import Fade from '@sinoui/core/Fade';
import type { ModalProps } from '@sinoui/core/Modal';
import Modal from '@sinoui/core/Modal';

import MobileDateRangeView from './MobileDateRangeView';

/**
 * 组件属性
 */
interface Props extends Omit<ModalProps, 'children'> {
  /**
   * 弹窗标题
   */
  title?: string;
  /**
   * 开始时间
   */
  startDate?: Date;
  /**
   * 结束时间
   */
  endDate?: Date;
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
   * 指定最小日期。
   */
  minDate?: Date;
  /**
   * 指定最大日期。
   */
  maxDate?: Date;
  /**
   * 聚焦的输入框
   */
  focusedInput?: 'start' | 'end';
  /**
   * 弹窗关闭时的回调函数
   */
  onRequestClose: () => void;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value: string[]) => void;
  /**
   * 头部开始时间标题
   */
  startTitle?: string;
  /**
   * 头部结束时间标题
   */
  endTitle?: string;
  /**
   * 星期开始位置。`0`表示开始的是星期日，`1`表示星期一。默认为`1`。
   */
  startOfWeek?: 0 | 1;
}

/**
 * 移动端日期区间选择弹窗
 *
 * @param props 组件属性
 */
const DateRangeMobileModal: React.FC<Props> = (props) => {
  const {
    startDate,
    endDate,
    minDate,
    maxDate,
    defaultMonth,
    defaultYear,
    focusedInput,
    onRequestClose,
    onChange,
    title,
    open,
    startTitle,
    endTitle,
    startOfWeek,
    ...rest
  } = props;
  return (
    <Modal
      open={open}
      {...rest}
      backdrop={false}
      autoFocus={false}
      enforceFocus={false}
      className="sinoui-date-range-picker__modal"
    >
      <Fade in={open}>
        <MobileDateRangeView
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
          defaultYear={defaultYear}
          defaultMonth={defaultMonth}
          focusedInput={focusedInput}
          onRequestClose={onRequestClose}
          onChange={onChange}
          title={title}
          startTitle={startTitle}
          endTitle={endTitle}
          startOfWeek={startOfWeek}
        />
      </Fade>
    </Modal>
  );
};

export default DateRangeMobileModal;
