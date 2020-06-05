import React, { useRef, useState, useMemo } from 'react';
import TextInput from '@sinoui/core/TextInput';
import type { TextInputProps } from '@sinoui/core/TextInput';
import Popper from '@sinoui/core/Popper';
import DatePickerIcon from '@sinoui/core/svg-icons/DatePickerIcon';
import CalendarView from './CalendarView';
import DatePickerInput from './DatePickerInput';
import InputAdornment from '../InputAdornment';
import useIsPc from './useIsPc';
import Modal from '../Modal';

interface Props
  extends Omit<
    TextInputProps,
    'value' | 'multiline' | 'minRows' | 'maxRows' | 'onChange' | 'multiple'
  > {
  value?: string;
  onChange?: (date?: string) => void;
}

/**
 * 日期选择组件
 * @param props
 */
export default function DatePicker(props: Props) {
  const { value, onChange, readOnly, disabled, ...other } = props;
  const textInputRef = useRef(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const preventBlur = useRef(false);
  const [open, setOpen] = useState(false);
  const [dateValue, setDateValue] = useState(value);
  const isPc = useIsPc();

  const date = useMemo(
    () => (value ? new Date(Date.parse(value)) : undefined),
    [value],
  );

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
  const handleCalendarChange = (selectedDate: Date) => {
    const newDate = selectedDate.toISOString().substr(0, 10);
    setDateValue(newDate);
    if (isPc && onChange) {
      onChange(newDate);
    }
  };

  /**
   * 点击取消按钮，关闭弹窗
   */
  const handleCancel = () => {
    setDateValue(value);
    setOpen(false);
  };

  /**
   * 点击确定按钮时的回调函数
   */
  const handleOk = () => {
    if (onChange) {
      onChange(dateValue);
    }
    setOpen(false);
  };

  const inputCompProps = {
    ref: inputRef,
    onClick: handleInputClick,
    onBlur: handleInputBlur,
  };
  return (
    <>
      <TextInput
        {...other}
        ref={textInputRef}
        inputComponent={DatePickerInput}
        inputProps={inputCompProps}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        endAdornment={
          <InputAdornment position="end">
            <DatePickerIcon />
          </InputAdornment>
        }
      />
      {isPc ? (
        <Popper
          open={open}
          referenceElement={textInputRef}
          onMouseDown={preventEventDefault}
        >
          <CalendarView value={date} onChange={handleCalendarChange} />
        </Popper>
      ) : (
        <Modal open={open} center>
          <CalendarView
            value={date}
            onChange={handleCalendarChange}
            onCancel={handleCancel}
            onOk={handleOk}
          />
        </Modal>
      )}
    </>
  );
}
