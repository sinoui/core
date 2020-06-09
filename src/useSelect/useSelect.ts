import { useState, useRef } from 'react';
import { TextInputProps } from '@sinoui/core/TextInput';
import SelectInput from './SelectInput';

export interface Props
  extends Omit<
    TextInputProps,
    'onChange' | 'multiline' | 'minRows' | 'maxRows' | 'multiple' | 'value'
  > {
  /**
   * 是否使用Popper渲染
   */
  isRenderWithPopper?: boolean;
  /**
   * 指定渲染方式
   */
  renderValue?: React.ReactNode;
}

/**
 * 处理弹窗选择
 */
export default function useSelect(props: Props) {
  const {
    disabled,
    readOnly,
    isRenderWithPopper = true,
    renderValue,
    ...other
  } = props;
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textInputRef = useRef(null);
  const preventBlur = useRef(false);

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

  /**
   * input失去焦点时的回调函数
   */
  const handleInputBlur = () => {
    if (isRenderWithPopper) {
      if (preventBlur.current) {
        preventBlur.current = true;
        return;
      }
      setOpen(false);
    }
  };

  const onRequestClose = () => {
    setOpen(false);
  };

  return {
    getTextInputProps: () => ({
      ...other,
      ref: textInputRef,
      inputComponent: SelectInput,
      inputProps: {
        ref: inputRef,
        onBlur: handleInputBlur,
        disabled,
        readOnly,
        focused: open,
        renderValue,
      },
      onClick: handleInputClick,
      shrink: open,
      readOnly,
      disabled,
    }),
    getPopperProps: () => ({
      open,
      referenceElement: textInputRef,
      onMouseDown: preventEventDefault,
    }),
    getModalProps: () => ({
      center: true,
      open,
      onBackdropClick: onRequestClose,
    }),
    onRequestClose,
  };
}
