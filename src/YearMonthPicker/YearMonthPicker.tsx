import React, { useState } from 'react';
import TextInput from '@sinoui/core/TextInput';
import type { TextInputProps } from '@sinoui/core/TextInput';
import DatePickerIcon from '@sinoui/core/svg-icons/DatePickerIcon';
import styled from 'styled-components';
import Popper from '@sinoui/core/Popper';
import Modal from '@sinoui/core/Modal';
import useSelect from '@sinoui/core/useSelect';
import type { PopperProps } from '@sinoui/core/Popper';
import useIsPc from '@sinoui/core/DatePicker/useIsPc';
import CalendarView from './CalendarView';
import InputAdornment from '../InputAdornment';
import type { Props as CalendarViewProps } from './CalendarView';
import SimpleText from '../DateTimePicker/SimpleText';
import { getDefaultYearMonth, isValidateDate } from './utils';

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
  renderValue?: (value?: string) => React.ReactNode;
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
    onChange: (value?: string) => void;
  }
>(({ value, onChange, onClose, ...rest }, ref) => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    value ?? getDefaultYearMonth(),
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

export default function YearMonthPicker(props: Props) {
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
    placeholder,
  } = props;
  const isNativePc = useIsPc();
  const isPc = isPcProps ?? isNativePc;

  const inputValue = isValidateDate(value) ? value : '';
  const inputRenderValue = (
    <SimpleText
      value={renderValue ? renderValue(value) : inputValue}
      placeholder={placeholder}
    />
  );

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
  const handleCalendarChange = (selectedDate?: string) => {
    if (onChange) {
      onChange(selectedDate ?? '');
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
            isPc={isPc}
            onChange={handleCalendarChange}
            minDate={isValidateDate(min) ? min : undefined}
            maxDate={isValidateDate(max) ? max : undefined}
            value={value}
          />
        </StyledPopper>
      ) : (
        <Modal {...getModalProps()}>
          <CalendarModalContent
            title={modalTitle}
            isPc={isPc}
            onChange={handleCalendarChange}
            onClose={onRequestClose}
            minDate={isValidateDate(min) ? min : undefined}
            maxDate={isValidateDate(max) ? max : undefined}
            value={value}
          />
        </Modal>
      )}
    </>
  );
}
