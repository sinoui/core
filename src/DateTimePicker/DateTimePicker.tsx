import React from 'react';
import useSelect from '@sinoui/core/useSelect';
import styled from 'styled-components';
import Popper from '@sinoui/core/Popper';
import InputAdornment from '@sinoui/core/InputAdornment';
import DatePickerIcon from '@sinoui/core/svg-icons/DatePickerIcon';
import TextInput from '@sinoui/core/TextInput';
import type { TextInputProps } from '@sinoui/core/TextInput';
import type { PopperProps } from '../Popper';
import useIsPc from '../DatePicker/useIsPc';
import DateTimeView from './DateTimeView/DateTimeView';
import mem from '../utils/mem';
import isNaN from '../utils/isNaN';

export interface Props
  extends Omit<
    TextInputProps,
    'value' | 'multiline' | 'minRows' | 'maxRows' | 'onChange' | 'multiple'
  > {
  /**
   * 值
   */
  value?: string;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value: string) => void;
  /**
   * 是否采用portal形式
   */
  portal?: boolean;
  /**
   * 指定弹窗属性
   */
  popperProps?: PopperProps;
  /**
   * 是否是pc设备
   */
  isPc?: boolean;
  /**
   * 指定自定义的值渲染函数。默认情况下，直接显示`value`属性值。
   */
  renderValue?: (value?: Date) => React.ReactNode;
}

const StyledPopper = styled(Popper)`
  z-index: ${({ theme }) => theme.zIndex.popover};
`;

const parseDate = mem((dateStr?: string) =>
  dateStr && !isNaN(Date.parse(dateStr))
    ? new Date(Date.parse(dateStr))
    : undefined,
);

const isValidateDate = (value?: string) => value && !isNaN(Date.parse(value));

/**
 * 日期时间选择组件
 * @param props
 */
export default function DateTimePicker(props: Props) {
  const { isPc: isPcProp, portal, value, renderValue, onChange } = props;

  const isNativePc = useIsPc();
  const isPc = isPcProp ?? isNativePc;
  const date = parseDate(value);
  const inputValue = isValidateDate(value) ? value : '';
  const inputRenderValue = renderValue ? renderValue(date) : inputValue;

  const { getPopperProps, getTextInputProps } = useSelect({
    ...props,
    isRenderWithPopper: isPc,
    renderValue: inputRenderValue,
  });

  const handleClear = () => {
    if (onChange) {
      onChange('');
    }
  };

  return (
    <>
      <TextInput
        {...getTextInputProps()}
        baseClassName="sinoui-date-time-picker"
        value={inputValue}
        onClear={handleClear}
        endAdornment={
          <InputAdornment position="end" disablePointerEvents>
            <DatePickerIcon />
          </InputAdornment>
        }
      />
      <StyledPopper {...getPopperProps()} portal={portal}>
        <DateTimeView isPc={isPc} value={date} onChange={onChange} />
      </StyledPopper>
    </>
  );
}
