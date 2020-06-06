import React, { useRef, useState, useMemo } from 'react';
import TextInput from '@sinoui/core/TextInput';
import type { TextInputProps } from '@sinoui/core/TextInput';
import Popper from '@sinoui/core/Popper';
import DatePickerIcon from '@sinoui/core/svg-icons/DatePickerIcon';
import styled from 'styled-components';
import CalendarView from './CalendarView';
import DatePickerInput from './DatePickerInput';
import InputAdornment from '../InputAdornment';
import useIsPc from './useIsPc';
import Modal from '../Modal';
import formatDate from './formatDate';

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
}

const StyledPopper = styled(Popper)`
  z-index: 2;
`;

function CalendarModalContent({
  value,
  onChange,
  onClose,
}: {
  value?: Date;
  onChange: (value?: Date) => void;
  onClose: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState(value);
  return (
    <CalendarView
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
}

/**
 * 日期选择组件
 * @param props
 */
export default function DatePicker(props: Props) {
  const {
    value,
    onChange,
    readOnly,
    disabled,
    isPc: isPcProps,
    ...other
  } = props;
  const textInputRef = useRef(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const preventBlur = useRef(false);
  const [open, setOpen] = useState(false);
  const isNativePc = useIsPc();
  const isPc = isPcProps ?? isNativePc;

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

  const inputCompProps = {
    ref: inputRef,
    onBlur: handleInputBlur,
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
          <CalendarView value={date} onChange={handleCalendarChange} />
        </StyledPopper>
      ) : (
        <Modal open={open} center onBackdropClick={onRequestClose}>
          <CalendarModalContent
            value={date}
            onChange={handleCalendarChange}
            onClose={onRequestClose}
          />
        </Modal>
      )}
    </>
  );
}