import React, { useRef, useCallback, useState } from 'react';
import TextInput, { TextInputProps } from '@sinoui/core/TextInput';
import useSelect from '@sinoui/core/useSelect';
import useIsPc from '@sinoui/core/DatePicker/useIsPc';
import type { PopperProps } from '@sinoui/core/Popper';
import classNames from 'classnames';
import styled from 'styled-components';
import InputAdornment from '../InputAdornment';
import DatePickerIcon from '../svg-icons/DatePickerIcon';
import formatDate from '../DatePicker/formatDate';
import parseDate from '../DatePicker/parseDate';
import DateRangeMobileModal from './DateRangeMobileModal';
import DateRangePcPopper from './DateRangePcPopper';

export interface Props
  extends Omit<
    TextInputProps,
    'onChange' | 'value' | 'multiple' | 'multiline' | 'minRows' | 'maxRows'
  > {
  /**
   * 值
   */
  value?: string[];
  /**
   * 值变更时的回调函数
   */
  onChange?: (value: string[]) => void;
  /**
   * 指定自定义的值渲染函数。默认情况下，直接显示`value`属性值。
   */
  renderValue?: (value?: Date) => React.ReactNode;
  /**
   * 是否是pc设备
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
   * 是否使用potal模式
   */
  portal?: boolean;
  /**
   * 给弹窗设置属性。
   */
  popperProps?: PopperProps;
  /**
   * 默认年份
   */
  defaultYear?: number;
  /**
   * 默认月份
   */
  defaultMonth?: number;
  /**
   * 弹窗标题
   */
  modalTitle?: string;
  /**
   * 开始输入框的标签内容
   */
  startInputLabel?: string;
  /**
   * 结束输入框的标签内容
   */
  endInputLabel?: string;
  /**
   * 开始输入框的提示说明
   */
  startInputPlaceholder?: string;
  /**
   * 结束输入框的提示说明
   */
  endInputPlaceholder?: string;
  /**
   * 设置输入框之间的连接元素，默认为~
   */
  toTitle?: React.ReactNode;
}

const ToTitle = styled.div`
  width: 32px;
  text-align: center;
`;

const DateRangePickerLayout = styled.div<{
  $variant?: 'standard' | 'outlined' | 'filled';
}>`
  display: flex;
  align-items: center;
  min-width: ${({ $variant }) =>
    $variant === 'outlined' || $variant === 'filled' ? 312 : 272}px;
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
`;

/**
 * 日期区间选择组件
 * @param props
 */
export default function DateRangePicker(props: Props) {
  const {
    isPc: isPcProps,
    value,
    renderValue,
    onChange,
    min,
    max,
    portal,
    defaultYear,
    defaultMonth,
    popperProps,
    variant,
    className,
    style,
    toTitle = <ToTitle> ~ </ToTitle>,
    startInputLabel,
    endInputLabel,
    startInputPlaceholder = startInputLabel ? undefined : '开始时间',
    endInputPlaceholder = endInputLabel ? undefined : '结束时间',
    ...other
  } = props;
  const isNativePc = useIsPc();
  const isPc = isPcProps ?? isNativePc;
  const startValue = value ? value[0] : '';
  const endValue = value && value[1] ? value[1] : '';
  const startDate = parseDate(startValue);
  const endDate = parseDate(endValue);
  const startInputValue = renderValue
    ? renderValue(startDate)
    : startValue || startInputPlaceholder;
  const endInputValue = renderValue
    ? renderValue(endDate)
    : endValue || endInputPlaceholder;
  const startInputRef = useRef<HTMLInputElement | null>(null);
  const endInputRef = useRef<HTMLInputElement | null>(null);
  const [focusedInput, setFocusedInput] = useState<'start' | 'end' | undefined>(
    undefined,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  const {
    getTextInputProps,
    getPopperProps,
    onRequestClose,
    getModalProps,
  } = useSelect({
    ...other,
    variant,
    isRenderWithPopper: isPc,
  });

  /**
   * 点击开始时间清除按钮时的回调函数
   */
  const handleStartClear = () => {
    if (onChange) {
      onChange(['', endValue]);
    }
  };

  /**
   * 点击结束时间清除按钮的回调函数
   */
  const handleEndClear = () => {
    if (onChange) {
      onChange([startValue, '']);
    }
  };

  const handleInputFocused = (inputType: 'start' | 'end') => {
    setFocusedInput(inputType);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (
        isPc &&
        wrapperRef.current &&
        !wrapperRef.current.contains(document.activeElement)
      ) {
        onRequestClose();
        setFocusedInput(undefined);
      }
    });
  };

  /**
   * 点击日期单元格时的回调函数
   */
  const handleDateClick = useCallback(
    (_event: React.MouseEvent<HTMLElement>, date: Date) => {
      if (onChange) {
        if (focusedInput === 'start') {
          if (endDate && date.getTime() > endDate.getTime()) {
            onChange([formatDate(date) ?? startValue, '']);
          } else {
            onChange([formatDate(date) ?? startValue, endValue]);
          }

          if (endInputRef.current) {
            endInputRef.current.focus();
          }
        } else {
          onChange([startValue, formatDate(date) ?? endValue]);
          if (!startValue && startInputRef.current) {
            startInputRef.current.focus();
          }
        }
      }
    },
    [endDate, endValue, focusedInput, onChange, startValue],
  );

  return (
    <>
      <DateRangePickerLayout
        className={classNames('sinoui-date-range-picker', className)}
        onBlur={handleInputBlur}
        ref={wrapperRef}
        $variant={variant}
        style={style}
      >
        <StyledTextInput
          {...getTextInputProps()}
          baseClassName="sinoui-date-range-picker__start-input"
          value={value ? value[0] : ''}
          inputProps={{
            ...getTextInputProps().inputProps,
            renderValue: startInputValue,
            ref: startInputRef,
            onFocus: () => handleInputFocused('start'),
            onBlur: null,
          }}
          label={startInputLabel}
          placeholder={startInputPlaceholder}
          endAdornment={
            <InputAdornment position="end" disablePointerEvents>
              <DatePickerIcon />
            </InputAdornment>
          }
          allowClear
          onClear={handleStartClear}
        />
        {toTitle}
        <StyledTextInput
          {...getTextInputProps()}
          ref={null}
          baseClassName="sinoui-date-range-picker__end-input"
          value={value && value[1] ? value[1] : ''}
          inputProps={{
            ...getTextInputProps().inputProps,
            renderValue: endInputValue,
            ref: endInputRef,
            onFocus: () => handleInputFocused('end'),
            onBlur: null,
          }}
          label={endInputLabel}
          placeholder={endInputPlaceholder}
          endAdornment={
            <InputAdornment position="end" disablePointerEvents>
              <DatePickerIcon />
            </InputAdornment>
          }
          allowClear
          onClear={handleEndClear}
        />
      </DateRangePickerLayout>
      {isPc ? (
        <DateRangePcPopper
          startDate={startDate}
          endDate={endDate}
          minDate={focusedInput === 'end' ? startDate : parseDate(min)}
          maxDate={parseDate(max)}
          onDateClick={handleDateClick}
          defaultYear={defaultYear}
          defaultMonth={defaultMonth}
          focusedInput={focusedInput}
          {...getPopperProps()}
          portal={portal}
          {...popperProps}
        />
      ) : (
        <DateRangeMobileModal
          startDate={startDate}
          endDate={endDate}
          minDate={parseDate(min)}
          maxDate={parseDate(max)}
          defaultYear={defaultYear}
          defaultMonth={defaultMonth}
          focusedInput={focusedInput}
          onRequestClose={onRequestClose}
          onChange={onChange}
          {...getModalProps()}
          startTitle={startInputLabel ?? startInputPlaceholder}
          endTitle={endInputLabel ?? endInputPlaceholder}
        />
      )}
    </>
  );
}
