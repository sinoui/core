import React, { useRef, useState, useMemo } from 'react';
import styled from 'styled-components';
import OptionList from './OptionList';
import Popper from '../Popper';
import Grow from '../Grow';
import ArrowDropDownIcon from '../svg-icons/ArrowDropDownIcon';
import InputAdornment from '../InputAdornment';
import IconButton from '../IconButton';

/**
 * 自动完成组件变更原因
 */
enum AutoCompleteChangeReason {
  /**
   * 选中选项
   */
  selectOption = 'select-option',
  /**
   * 创建选项。用于`freeSolo`模式。
   */
  createOption = 'create-option',
  /**
   * 删除选项
   */
  removeOption = 'remove-option',
  /**
   * 清除
   */
  clear = 'clear',
  /**
   * 失去焦点
   */
  blur = 'blur',
}

interface Props {
  /**
   * 渲染输入框。
   *
   * //TODO: 输入框属性类型
   */
  renderInput: (props: any) => React.ReactElement;
  /**
   * 值
   *
   * //TODO: 值的类型
   */
  value?: any;
  /**
   * 指定值变更的回调函数。
   *
   * @param value 新的值
   * @param reason 引起值变更的原因
   */
  onChange?: (value: any, reason: AutoCompleteChangeReason) => void;
  /**
   * 指定选项
   */
  options: any[];
  /**
   * 用于确定给定选项的标签
   */
  getOptionLabel: (option: any) => string;
  /**
   * 指定分组依据
   */
  groupBy?: (option: any) => string;
  /**
   * 设置为`true`时，按下Escape键，关闭选项弹窗。默认为`true`。
   */
  closeOnEscape?: boolean;
  /**
   * 用于定位弹窗的组件。默认为`Popper`。
   */
  PopperComponent?: React.ReactType;
}

const PopupIndicatorWrapper = styled(IconButton)<{ $open: boolean }>`
  padding: 2px;
  width: auto;
  height: auto;
  transition: ${({ theme }) => theme.transitions.create('transform')};
  transform: rotate(${({ $open }) => ($open ? 180 : 0)}deg);

  > .sinoui-icon-button__ripple-layout {
    left: 0px;
    top: 0px;
    width: 28px;
    height: 28px;
  }

  > .sinoui-icon-button__ripple-layout > .sinoui-icon-button__ripple {
    width: 28px;
    height: 28px;
  }
`;

/**
 * 自动完成组件。
 */
export default function AutoComplete(props: Props) {
  const {
    renderInput,
    value,
    options,
    getOptionLabel,
    closeOnEscape = true,
    PopperComponent = Popper,
  } = props;
  const textInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState(value);
  const [open, setOpen] = useState(false);
  const filteredOptions = useMemo(
    () =>
      inputValue
        ? options.filter((option) =>
            getOptionLabel(option)
              ?.toLowerCase()
              .includes(inputValue.toLowerCase()),
          )
        : options,
    [getOptionLabel, inputValue, options],
  );

  /**
   * 处理文本输入框鼠标按下事件
   *
   * @param event 鼠标按下事件
   */
  const preventEventDefault = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== inputRef.current) {
      event.preventDefault();
    }
  };

  /**
   * 处理输入框值变更事件
   *
   * @param event 值变更事件
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * 处理输入框点击事件
   */
  const handleInputClick = () => {
    setOpen(true);
  };

  /**
   * 处理输入框失去焦点事件
   */
  const handleInputBlur = () => {
    setOpen(false);
  };

  const handleInputKeydown = (event: React.KeyboardEvent) => {
    const { key } = event;
    if (closeOnEscape && key === 'Escape') {
      setOpen(false);
    }
  };

  /**
   * 处理弹出提示器的点击事件
   */
  const handlePopupIndicatorClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
      // eslint-disable-next-line no-unused-expressions
      inputRef.current?.focus();
    }
  };

  /**
   * 渲染弹出指示器
   */
  const renderPopupIndicator = () => (
    <PopupIndicatorWrapper
      $open={open}
      className="sinoui-auto-complete__popup-indicator"
      color={open ? 'primary' : 'textSecondary'}
      onClick={handlePopupIndicatorClick}
    >
      <ArrowDropDownIcon />
    </PopupIndicatorWrapper>
  );

  const input = renderInput({
    ref: textInputRef,
    value: inputValue,
    onChange: handleInputChange,
    onMouseDown: preventEventDefault,
    inputProps: {
      ref: inputRef,
      onClick: handleInputClick,
      onBlur: handleInputBlur,
      onKeyDown: handleInputKeydown,
    },
    endAdornment: (
      <InputAdornment position="end">{renderPopupIndicator()}</InputAdornment>
    ),
  });

  const renderOptions = () => (
    <OptionList
      options={[{ key: '1', groupTitle: '', options: filteredOptions }]}
      getOptionLabel={getOptionLabel}
    />
  );

  return (
    <>
      {input}
      <PopperComponent
        open={open}
        referenceElement={textInputRef}
        onMouseDown={preventEventDefault}
      >
        <Grow in={open}>{renderOptions()}</Grow>
      </PopperComponent>
    </>
  );
}
