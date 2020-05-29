/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
import React, { useRef, useState, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { ModifierArguments, Options } from '@popperjs/core';
import OptionList from './OptionList';
import Popper from '../Popper';
import Grow from '../Grow';
import ArrowDropDownIcon from '../svg-icons/ArrowDropDownIcon';
import InputAdornment from '../InputAdornment';
import IconButton from '../IconButton';
import Close from '../svg-icons/Close';
import { getAvailableItems } from './utils/handleItems';

/**
 * 自动完成组件变更原因
 */
export enum AutoCompleteChangeReason {
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
  /**
   * 弹窗图标。默认为`<ArrowDropDownIcon />`。
   */
  popupIcon?: React.ReactNode;
  /**
   * 设置为`true`，则会强制显示弹窗图标。默认为`auto`。
   */
  forcePopupIcon?: 'auto' | boolean;
  /**
   * 设置清除图标。默认为`<Close size={20} />`。
   */
  clearIcon?: React.ReactNode;
  /**
   * 设置为`true`，则按下Escape键时，清空`value`。默认为`false`。
   */
  clearOnEscape?: boolean;
  /**
   * 设置为`true`，则在获取焦点时出现弹窗
   */
  openOnFocus?: boolean;
  /**
   * 指定弹窗出现时的效果组件
   */
  TransitionComponent?: React.ReactType;
  /**
   * 如果为`true`，则支持多选
   */
  multiple?: boolean;
  /**
   * 选中选项时，是否关闭弹窗，默认为`true`
   */
  closeOnSelect?: boolean;
}

const rippleStyle = css<{ size?: number }>`
  > .sinoui-icon-button__ripple-layout {
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    width: auto;
    height: auto;
  }

  > .sinoui-icon-button__ripple-layout > .sinoui-icon-button__ripple {
    width: 100%;
    height: 100%;
  }
`;

const iconButtonStyle = css<{ size?: number }>`
  padding: 2px;
  width: auto;
  height: auto;
  ${rippleStyle}
`;

const ClearButtonWrapper = styled(IconButton)`
  ${iconButtonStyle}
  width: 28px;
  height: 28px;
`;

const PopupIndicatorWrapper = styled(IconButton)<{
  $open: boolean;
}>`
  ${iconButtonStyle}
  transition: ${({ theme }) => theme.transitions.create('transform')};
  transform: rotate(${({ $open }) => ($open ? 180 : 0)}deg);
`;

const sameWidth = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }: ModifierArguments<Options>) => {
    state.styles.popper.width = `${(state.elements.reference as any).width}px`;
  },
  effect: ({ state }: ModifierArguments<Options>) => {
    state.elements.popper.style.width = `${
      (state.elements.reference as any).offsetWidth
    }px`;
  },
};

const getFocusedIndex = (
  items: Element[],
  key: string,
  focusedOption?: string,
) => {
  const currentIdx = items.findIndex(
    (item) => item.textContent === focusedOption,
  );

  let focusedIdx = currentIdx;

  if (key === 'ArrowUp') {
    focusedIdx = focusedIdx > 0 ? focusedIdx - 1 : items.length - 1;
  } else {
    focusedIdx = focusedIdx < items.length - 1 ? focusedIdx + 1 : 0;
  }

  return focusedIdx;
};

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
    popupIcon = <ArrowDropDownIcon />,
    clearIcon = <Close size={20} />,
    clearOnEscape,
    forcePopupIcon = 'auto',
    onChange,
    openOnFocus = false,
    TransitionComponent = Grow,
    multiple,
    closeOnSelect = true,
  } = props;
  const textInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [inputValue, setInputValue] = useState(
    value ? getOptionLabel(value) : '',
  );
  const [open, setOpen] = useState(false);
  const [focusedOption, setFocusedOption] = useState<string | undefined>(
    value ? getOptionLabel(value) : '',
  );

  const filteredOptions = useMemo(
    () =>
      inputValue && (!value || inputValue !== getOptionLabel(value))
        ? options.filter((option) =>
            getOptionLabel(option)
              ?.toLowerCase()
              .includes(inputValue.toLowerCase()),
          )
        : options,
    [getOptionLabel, inputValue, value, options],
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
    const newInputValue = event.target.value;
    setInputValue(newInputValue);

    if (!open) {
      setOpen(true);
    }

    if (newInputValue === '' && onChange) {
      onChange(null, AutoCompleteChangeReason.clear);
    }
  };

  /**
   * 处理输入框点击事件
   */
  const handleInputClick = () => {
    setOpen(true);
    // eslint-disable-next-line no-unused-expressions
    inputRef.current?.select();
  };

  /**
   * 处理输入框获取焦点事件
   */
  const handleInputFocus = () => {
    if (openOnFocus) {
      setOpen(true);
    }
  };

  /**
   * 处理输入框失去焦点事件
   */
  const handleInputBlur = () => {
    setOpen(false);
    setInputValue(value ? getOptionLabel(value) : '');
  };

  /**
   * 处理输入框键盘事件
   *
   * @param event 键盘事件
   */
  const handleInputKeydown = (event: React.KeyboardEvent) => {
    const { key } = event;
    if (!open && clearOnEscape && key === 'Escape') {
      if (onChange) {
        onChange(null, AutoCompleteChangeReason.clear);
      }
      setInputValue('');
    } else if (closeOnEscape && key === 'Escape') {
      setOpen(false);
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
      if (open && listRef.current) {
        const items = getAvailableItems(listRef.current);
        const focusedIndex = getFocusedIndex(items, key, focusedOption);
        setFocusedOption(items[focusedIndex]?.textContent!);
      } else {
        setOpen(true);
      }
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
   * 处理清除值事件
   */
  const handleClear = () => {
    setInputValue('');
    if (onChange) {
      onChange(null, AutoCompleteChangeReason.clear);
    }
  };

  /**
   * 处理选项点击事件
   *
   * @param label 选项的标签
   */
  const handleOptionClick = (item: any) => {
    setInputValue(getOptionLabel(item));
    if (onChange) {
      onChange(item, AutoCompleteChangeReason.selectOption);
    }
    if (!multiple && closeOnSelect) {
      setOpen(false);
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
      {popupIcon}
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
      onFocus: handleInputFocus,
      onKeyDown: handleInputKeydown,
    },
    endAdornment: (
      <InputAdornment position="end">
        {!!value && (
          <ClearButtonWrapper
            onClick={handleClear}
            className="sinoui-focused-visible"
          >
            {clearIcon}
          </ClearButtonWrapper>
        )}
        {forcePopupIcon !== false && renderPopupIndicator()}
      </InputAdornment>
    ),
  });

  const renderOptions = () => (
    <OptionList
      ref={listRef}
      options={filteredOptions}
      focusedOption={focusedOption}
      selectedOptions={value ? [getOptionLabel(value)] : ['']}
      getOptionLabel={getOptionLabel}
      onOptionClick={handleOptionClick}
    />
  );

  return (
    <>
      {input}
      <PopperComponent
        open={open}
        referenceElement={textInputRef}
        onMouseDown={preventEventDefault}
        modifiers={[sameWidth]}
      >
        <TransitionComponent in={open}>{renderOptions()}</TransitionComponent>
      </PopperComponent>
    </>
  );
}
