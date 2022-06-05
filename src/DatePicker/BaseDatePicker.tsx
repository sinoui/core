import Modal from '@sinoui/core/Modal';
import type { PopperProps } from '@sinoui/core/Popper';
import Popper from '@sinoui/core/Popper';
import DatePickerIcon from '@sinoui/core/svg-icons/DatePickerIcon';
import type { TextInputProps } from '@sinoui/core/TextInput';
import TextInput from '@sinoui/core/TextInput';
import useSelect from '@sinoui/core/useSelect';
import React, { useState } from 'react';
import styled from 'styled-components';

import SimpleText from '../DateTimePicker/SimpleText';
import InputAdornment from '../InputAdornment';
import type { CalendarViewProps } from './CalendarView';
import CalendarView from './CalendarView';
import useIsPc from './useIsPc';
import type ViewModel from './ViewModel';

/**
 * 基础日历选择组件的属性
 */
export interface BaseDatePickerProps
  extends Omit<
    TextInputProps,
    'value' | 'multiline' | 'minRows' | 'maxRows' | 'onChange' | 'multiple'
  > {
  /**
   * 值
   */
  value?: Date;
  /**
   * 值变化时的回调函数
   */
  onChange?: (date?: Date) => void;
  /**
   * 是否是pc端设备
   */
  isPc?: boolean;
  /**
   * 最小值
   */
  min?: Date;
  /**
   * 最大值
   */
  max?: Date;
  /**
   * 弹窗标题。默认为`设置${label}`。在移动端弹窗时使用。
   */
  modalTitle?: string;
  /**
   * 指定自定义的值渲染函数。默认情况下，直接显示`value`属性值。
   */
  renderValue: (value?: Date) => React.ReactNode;
  /**
   * 是否将弹出内容以传送门的方式渲染。默认为`true`。
   */
  portal?: boolean;
  /**
   * 给弹窗设置属性。
   */
  popperProps?: PopperProps;
  /**
   * 日历开始的视图。默认为日期视图。
   */
  startViewModel: ViewModel.dates | ViewModel.months;
}

const StyledPopper = styled(Popper)`
  z-index: ${({ theme }) => theme.zIndex.popover};
`;

const CalendarModalContent = React.forwardRef<
  HTMLDivElement,
  Omit<CalendarViewProps, 'onChange'> & {
    /**
     *
     */
    onClose: () => void;
    /**
     *
     */
    onChange: (value?: Date) => void;
  }
>(function CalendarModalContent({ value, onChange, onClose, ...rest }, ref) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value ?? new Date(),
  );
  return (
    <CalendarView
      {...rest}
      ref={ref}
      value={selectedDate}
      onChange={setSelectedDate}
      onCancel={onClose}
      onOk={() => {
        onChange(selectedDate);
        onClose();
      }}
      onClear={() => {
        onChange(undefined);
        onClose();
      }}
    />
  );
});

/**
 * 基础的日期选择组件
 *
 * @param props
 */
export default function BaseDatePicker(props: BaseDatePickerProps) {
  const { label } = props;
  const {
    value,
    onChange,
    isPc: isPcProps,
    min,
    max,
    modalTitle = `设置${label ?? '日期'}`,
    renderValue,
    portal,
    popperProps,
    placeholder,
    startViewModel,
  } = props;
  const isNativePc = useIsPc();
  const isPc = isPcProps ?? isNativePc;
  const inputRenderValue = (
    <SimpleText value={renderValue(value)} placeholder={placeholder} />
  );

  const { getModalProps, getPopperProps, getTextInputProps, onRequestClose } =
    useSelect({
      ...props,
      isRenderWithPopper: isPc,
      renderValue: inputRenderValue,
    });

  /**
   * 日期选择变化时的回调函数
   *
   * @param selectedDate
   */
  const handleCalendarChange = (selectedDate?: Date) => {
    if (onChange) {
      onChange(selectedDate);
    }
    onRequestClose();
  };

  const handleClear = () => {
    if (onChange) {
      onChange(undefined);
    }
  };

  return (
    <>
      <TextInput
        {...getTextInputProps()}
        baseClassName="sinoui-date-picker"
        value={value?.toString()}
        onClear={handleClear}
        endAdornment={
          <InputAdornment position="end" disablePointerEvents>
            <DatePickerIcon />
          </InputAdornment>
        }
      />
      {isPc ? (
        <StyledPopper
          {...getPopperProps()}
          portal={portal}
          {...popperProps}
          placement="bottom-start"
        >
          <CalendarView
            value={value}
            onChange={handleCalendarChange}
            minDate={min}
            maxDate={max}
            isPc={isPc}
            startViewModel={startViewModel}
          />
        </StyledPopper>
      ) : (
        <Modal {...getModalProps()}>
          <CalendarModalContent
            value={value}
            onChange={handleCalendarChange}
            onClose={onRequestClose}
            minDate={min}
            maxDate={max}
            title={modalTitle}
            isPc={isPc}
            startViewModel={startViewModel}
          />
        </Modal>
      )}
    </>
  );
}
