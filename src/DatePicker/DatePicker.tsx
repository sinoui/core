import React, { useRef, useState } from 'react';
import TextInput from '@sinoui/core/TextInput';
import type { TextInputProps } from '@sinoui/core/TextInput';
import Popper from '@sinoui/core/Popper';
import DatePickerIcon from '@sinoui/core/svg-icons/DatePickerIcon';
import styled from 'styled-components';
import mem from '@sinoui/core/utils/mem';
import CalendarView from './CalendarView';
import DatePickerInput from './DatePickerInput';
import InputAdornment from '../InputAdornment';
import useIsPc from './useIsPc';
import Modal from '../Modal';
import formatDate from './formatDate';
import type { CalendarViewProps } from './CalendarView';

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
}

const StyledPopper = styled(Popper)`
  z-index: 2;
`;

const CalendarModalContent = React.forwardRef<
  HTMLDivElement,
  Omit<CalendarViewProps, 'onChange'> & {
    onClose: () => void;
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

const parseDate = mem((dateStr?: string) =>
  dateStr ? new Date(Date.parse(dateStr)) : undefined,
);

/**
 * 日期选择组件
 * @param props
 */
export default function DatePicker(props: Props) {
  const { label } = props;
  const {
    value,
    onChange,
    readOnly,
    disabled,
    isPc: isPcProps,
    min,
    max,
    modalTitle = `设置${label}`,
    ...other
  } = props;
  const textInputRef = useRef(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const preventBlur = useRef(false);
  const [open, setOpen] = useState(false);
  const isNativePc = useIsPc();
  const isPc = isPcProps ?? isNativePc;
  const date = parseDate(value);

  const preventEventDefault = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== inputRef.current) {
      event.preventDefault();
      const input = inputRef.current;
      if (input) {
        input.focus();
        preventBlur.current = true;
        setTimeout(() => {
          input.focus();
          preventBlur.current = false;
        });
      }
    }
  };

  /**
   * 点击input时的回调函数
   */
  const handleInputClick = () => {
    if (disabled || readOnly) {
      return;
    }
    setOpen(true);
  };

  const handleInputBlur = () => {
    if (isPc) {
      if (preventBlur.current) {
        preventBlur.current = true;
        return;
      }
      setOpen(false);
    }
  };

  /**
   * 日期选择变化时的回调函数
   * @param selectedDate
   */
  const handleCalendarChange = (selectedDate?: Date) => {
    const newDate = selectedDate ? formatDate(selectedDate) : '';
    if (onChange) {
      onChange(newDate);
    }
    setOpen(false);
  };

  const onRequestClose = () => {
    setOpen(false);
  };

  const handleClear = () => {
    if (onChange) {
      onChange(undefined);
    }
  };

  const inputCompProps = {
    ref: inputRef,
    onBlur: handleInputBlur,
    disabled,
  };

  return (
    <>
      <TextInput
        {...other}
        ref={textInputRef}
        inputComponent={DatePickerInput}
        inputProps={inputCompProps}
        baseClassName="sinoui-date-picker"
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        onClick={handleInputClick}
        onClear={handleClear}
        endAdornment={
          <InputAdornment position="end" disablePointerEvents>
            <DatePickerIcon />
          </InputAdornment>
        }
      />
      {isPc ? (
        <StyledPopper
          open={open}
          referenceElement={textInputRef}
          onMouseDown={preventEventDefault}
        >
          <CalendarView
            value={date}
            onChange={handleCalendarChange}
            minDate={parseDate(min)}
            maxDate={parseDate(max)}
          />
        </StyledPopper>
      ) : (
        <Modal open={open} center onBackdropClick={onRequestClose}>
          <CalendarModalContent
            value={date}
            onChange={handleCalendarChange}
            onClose={onRequestClose}
            minDate={parseDate(min)}
            maxDate={parseDate(max)}
            title={modalTitle}
          />
        </Modal>
      )}
    </>
  );
}
