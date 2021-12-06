import React, { useState } from 'react';
import TextInput from '@sinoui/core/TextInput';
import type { TextInputProps } from '@sinoui/core/TextInput';
import DatePickerIcon from '@sinoui/core/svg-icons/DatePickerIcon';
import styled from 'styled-components';
import Popper from '@sinoui/core/Popper';
import Modal from '@sinoui/core/Modal';
import useSelect from '@sinoui/core/useSelect';
import type { PopperProps } from '@sinoui/core/Popper';
import CalendarView from './CalendarView';
import InputAdornment from '../InputAdornment';
import useIsPc from './useIsPc';
import formatDate from './formatDate';
import type { CalendarViewProps } from './CalendarView';
import isNaN from '../utils/isNaN';
import mem from '../utils/mem';

interface Props
  extends Omit<
    TextInputProps,
    'value' | 'multiline' | 'minRows' | 'maxRows' | 'onChange' | 'multiple'
  > {
  /**
   * 值
   */
  value?: string;
  /**
   * 值变化时的回调函数
   */
  onChange?: (date?: string) => void;
  /**
   * 是否是pc端设备
   */
  isPc?: boolean;
  /**
   * 最小值
   */
  min?: string;
  /**
   * 最大值
   */
  max?: string;
  /**
   * 弹窗标题。默认为`设置${label}`。在移动端弹窗时使用。
   */
  modalTitle?: string;
  /**
   * 指定自定义的值渲染函数。默认情况下，直接显示`value`属性值。
   */
  renderValue?: (value?: Date) => React.ReactNode;
  /**
   * 是否将弹出内容以传送门的方式渲染。默认为`true`。
   */
  portal?: boolean;
  /**
   * 给弹窗设置属性。
   */
  popperProps?: PopperProps;
}

const StyledPopper = styled(Popper)`
  z-index: ${({ theme }) => theme.zIndex.popover};
`;

const CalendarModalContent = React.forwardRef<
  HTMLDivElement,
  Omit<CalendarViewProps, 'onChange'> & {
    onClose: () => void;
    onChange: (value?: Date) => void;
  }
>(({ value, onChange, onClose, ...rest }, ref) => {
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

const parseDate = mem((dateStr?: string) =>
  dateStr && !isNaN(Date.parse(dateStr))
    ? new Date(Date.parse(dateStr))
    : undefined,
);

const isValidateDate = (value?: string) => value && !isNaN(Date.parse(value));

/**
 * 日期选择组件
 * @param props
 */
export default function DatePicker(props: Props) {
  const { label } = props;
  const {
    value,
    onChange,
    isPc: isPcProps,
    min,
    max,
    modalTitle = `设置${label || '日期'}`,
    renderValue,
    portal,
    popperProps,
  } = props;
  const isNativePc = useIsPc();
  const isPc = isPcProps ?? isNativePc;
  const date = parseDate(value);
  const inputValue = isValidateDate(value) ? value : '';
  const inputRenderValue = renderValue ? renderValue(date) : inputValue;
  const { getModalProps, getPopperProps, getTextInputProps, onRequestClose } =
    useSelect({
      ...props,
      isRenderWithPopper: isPc,
      renderValue: inputRenderValue,
    });

  /**
   * 日期选择变化时的回调函数
   * @param selectedDate
   */
  const handleCalendarChange = (selectedDate?: Date) => {
    const newDate = selectedDate ? formatDate(selectedDate) : '';
    if (onChange) {
      onChange(newDate);
    }
    onRequestClose();
  };

  const handleClear = () => {
    if (onChange) {
      onChange('');
    }
  };

  return (
    <>
      <TextInput
        {...getTextInputProps()}
        baseClassName="sinoui-date-picker"
        value={inputValue}
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
            value={date}
            onChange={handleCalendarChange}
            minDate={parseDate(min)}
            maxDate={parseDate(max)}
            isPc={isPc}
          />
        </StyledPopper>
      ) : (
        <Modal {...getModalProps()}>
          <CalendarModalContent
            value={date}
            onChange={handleCalendarChange}
            onClose={onRequestClose}
            minDate={parseDate(min)}
            maxDate={parseDate(max)}
            title={modalTitle}
            isPc={isPc}
          />
        </Modal>
      )}
    </>
  );
}
