import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Fade from '@sinoui/core/Fade';
import TextInput from '../TextInput';
import type { TextInputProps } from '../TextInput';
import InputAdornment from '../InputAdornment';
import Schedule from '../svg-icons/Schedule';
import Popper from '../Popper';
import type { PopperProps } from '../Popper';
import Paper from '../Paper';
import TimeSelectView from './TimeSelectView/TimeSelectView';
import IconButton from '../IconButton';
import parseTime from './parseTime';
import formatTime from './formatTime';
import { isTime } from './isTime';
import type { TimeSelectViewRef } from './TimeSelectView';

interface Props extends Omit<TextInputProps, 'onChange'> {
  /**
   * 指定如`13:01`这样的时间值。
   */
  value?: string;
  /**
   * 指定时间值发生变化的回调函数。
   */
  onChange?: (value?: string) => void;
  /**
   * 指定弹窗属性
   */
  popperProps?: PopperProps;
}

const PaperWrapper = styled(Paper)`
  display: inline-block;
`;

/**
 * 时间选择组件
 */
export default function TimePicker(props: Props) {
  const { value, onChange, disabled, readOnly, popperProps, ...rest } = props;
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState(value);
  const [valueState, setValueState] = useState(value);
  const [hour, minute] = parseTime(value);
  const timeSelectViewRef = useRef<TimeSelectViewRef>(null);

  if (valueState !== value) {
    setValueState(value);
    setInputValue(value);
  }

  /**
   * 处理时间选择变更事件
   *
   * @param newHour 新的小时数
   * @param newMinute 新的分钟数
   */
  const handleTimeSelectChange = (newHour: number, newMinute: number) => {
    if (onChange) {
      onChange(formatTime(newHour, newMinute));
    }
  };

  /**
   * 处理输入框值变更
   *
   * @param event 值变更事件
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * 处理输入框失去焦点事件
   */
  const handleInputBlur = () => {
    if (!onChange || inputValue === value) {
      return;
    }
    if (inputValue && isTime(inputValue)) {
      onChange(formatTime(...(parseTime(inputValue) as [number, number])));
    } else if (!inputValue) {
      onChange('');
    } else {
      setInputValue(value);
    }
  };

  /**
   * 处理图标按钮点击事件
   */
  const handleIconButtonClick = () => {
    setOpen(true);
    const timeSelect = timeSelectViewRef.current;
    if (timeSelect) {
      timeSelect.focus();
    }
  };

  return (
    <>
      <TextInput
        baseClassName="sinoui-time-picker"
        disabled={disabled}
        readOnly={readOnly}
        ref={inputRef}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleIconButtonClick}
              disabled={disabled || readOnly}
            >
              <Schedule />
            </IconButton>
          </InputAdornment>
        }
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        {...rest}
      />
      <Popper
        referenceElement={inputRef}
        open={open}
        placement="bottom-start"
        {...popperProps}
      >
        <Fade in={open}>
          <PaperWrapper>
            <TimeSelectView
              onChange={handleTimeSelectChange}
              hour={hour}
              minute={minute}
              onBlur={() => setOpen(false)}
              autoFocus
              ref={timeSelectViewRef}
            />
          </PaperWrapper>
        </Fade>
      </Popper>
    </>
  );
}
