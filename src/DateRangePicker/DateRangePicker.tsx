import React from 'react';
import TextInput, { TextInputProps } from '@sinoui/core/TextInput';
import useSelect from '@sinoui/core/useSelect';
import useIsPc from '@sinoui/core/DatePicker/useIsPc';
import mem from '@sinoui/core/utils/mem';
import Popper from '../Popper';
import DateRangeView from './DateRangeView';
import InputAdornment from '../InputAdornment';
import DatePickerIcon from '../svg-icons/DatePickerIcon';

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
}

const parseDate = mem((dateStr?: string) =>
  dateStr ? new Date(Date.parse(`${dateStr}T00:00:00`)) : undefined,
);

export default function DateRangePicker(props: Props) {
  const { isPc: isPcProps, value, renderValue, onChange, min, max } = props;
  const isNativePc = useIsPc();
  const isPc = isPcProps ?? isNativePc;
  const startValue = value ? value[0] : '';
  const endValue = value && value[1] ? value[1] : '';
  const startDate = parseDate(startValue);
  const endDate = parseDate(endValue);
  const startInputValue = renderValue ? renderValue(startDate) : startValue;
  const endInputValue = renderValue ? renderValue(endDate) : endValue;

  const { getTextInputProps, getPopperProps } = useSelect({
    ...props,
    isRenderWithPopper: isPc,
  });

  const handleStartClear = () => {
    if (onChange) {
      onChange(['', endValue]);
    }
  };

  const handleEndClear = () => {
    if (onChange) {
      onChange([startValue, '']);
    }
  };

  return (
    <>
      <div className="sinoui-date-range-picker">
        <TextInput
          {...getTextInputProps()}
          baseClassName="sinoui-date-range-picker__start"
          value={value ? value[0] : ''}
          inputProps={{
            ...getTextInputProps().inputProps,
            renderValue: startInputValue,
          }}
          placeholder="开始时间"
          endAdornment={
            <InputAdornment position="end" disablePointerEvents>
              <DatePickerIcon />
            </InputAdornment>
          }
          allowClear
          onClear={handleStartClear}
        />
        <span> ~ </span>
        <TextInput
          {...getTextInputProps()}
          ref={null}
          baseClassName="sinoui-date-range-picker__end"
          value={value && value[1] ? value[1] : ''}
          inputProps={{
            ...getTextInputProps().inputProps,
            renderValue: endInputValue,
          }}
          placeholder="结束时间"
          endAdornment={
            <InputAdornment position="end" disablePointerEvents>
              <DatePickerIcon />
            </InputAdornment>
          }
          allowClear
          onClear={handleEndClear}
        />
      </div>
      {isPc && (
        <Popper {...getPopperProps()} placement="bottom-start">
          <DateRangeView
            startDate={startDate}
            endDate={endDate}
            minDate={parseDate(min)}
            maxDate={parseDate(max)}
          />
        </Popper>
      )}
    </>
  );
}
