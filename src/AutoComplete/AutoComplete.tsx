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
import useInputValue from './useInputValue';
import bemClassNames from '../utils/bemClassNames';
import AutoCompleteStyle from './AutoCompleteStyle';
import AutoCompleteTags from './AutoCompleteTags';
import type { RenderTagsProps } from './types';
import moveFocused from './moveFocused';

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
   * 设置为`true`，则会在输入框文本为空时，清空`value`。默认为`true`。
   */
  clearable?: boolean;
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
  /**
   * 按`Home`键和`End`键是否高亮选项，默认为`true`
   */
  handleHomeEndKeys?: boolean;
  /**
   * 指定标签形态
   */
  tagVariant?: 'outlined' | 'standard';
  /**
   * 设置为`true`，则点击选项标签时打开选项弹窗。在多选模式下，默认为`true`。
   */
  openOnClickTags?: boolean;
  /**
   * 渲染选项标签。
   */
  renderTags?: (props: RenderTagsProps) => React.ReactNode;
  /**
   * 如果设置为`true`，则为freeSolo模式。默认为`false`
   */
  freeSolo?: boolean;
  /**
   * 如果设置为`true`,则为密集模式
   */
  dense?: boolean;
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
    freeSolo = false,
    forcePopupIcon = 'auto',
    onChange,
    openOnFocus = false,
    TransitionComponent = Grow,
    multiple,
    closeOnSelect = true,
    clearable = !freeSolo,
    handleHomeEndKeys = !freeSolo,
    tagVariant,
    openOnClickTags = true,
    renderTags,
    dense,
  } = props;

  const defaultInputValue = useMemo(() => {
    if (value && !multiple) {
      return freeSolo ? value : getOptionLabel(value);
    }
    return '';
  }, [freeSolo, getOptionLabel, multiple, value]);

  const defaultFocusedOption = useMemo(() => {
    if (value) {
      return freeSolo ? value : getOptionLabel(value);
    }
    return '';
  }, [freeSolo, getOptionLabel, value]);

  const textInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [inputValue, setInputValue] = useInputValue(defaultInputValue);
  const [open, setOpen] = useState(false);
  const [focusedOption, setFocusedOption] = useState<string | undefined>(
    defaultFocusedOption,
  );
  const [focused, setFocused] = useState(false);

  const filteredOptions = useMemo(
    () =>
      inputValue &&
      (!value || inputValue !== (freeSolo ? value : getOptionLabel(value)))
        ? options.filter((option) =>
            getOptionLabel(option)
              ?.toLowerCase()
              .includes(inputValue.toLowerCase()),
          )
        : options,
    [inputValue, value, freeSolo, getOptionLabel, options],
  );

  /**
   * 处理文本输入框鼠标按下事件
   *
   * @param event 鼠标按下事件
   */
  const preventEventDefault = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== inputRef.current) {
      event.preventDefault();
      // eslint-disable-next-line no-unused-expressions
      inputRef.current?.focus();
    }
  };

  /**
   * 处理选项点击事件
   *
   * @param label 选项的标签
   */
  const handleOptionClick = (item: any) => {
    if (multiple) {
      setInputValue('');
      if (onChange) {
        if (freeSolo) {
          const idx = (value ?? []).indexOf(getOptionLabel(item));
          onChange(
            idx === -1
              ? [...(value ?? []), getOptionLabel(item)]
              : value.filter((option: any) => option !== getOptionLabel(item)),
            idx === -1
              ? AutoCompleteChangeReason.createOption
              : AutoCompleteChangeReason.removeOption,
          );
        } else {
          const idx = (value ?? []).indexOf(item);
          onChange(
            idx === -1
              ? [...(value ?? []), item]
              : value.filter((option: any) => option !== item),
            idx === -1
              ? AutoCompleteChangeReason.createOption
              : AutoCompleteChangeReason.removeOption,
          );
        }
      }
    } else {
      setInputValue(getOptionLabel(item));
      setFocusedOption(getOptionLabel(item));
      if (onChange) {
        const newValue = freeSolo ? getOptionLabel(item) : item;
        onChange(newValue, AutoCompleteChangeReason.selectOption);
      }
    }

    if (!multiple && closeOnSelect) {
      setOpen(false);
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

    if (!multiple && clearable && newInputValue === '' && onChange) {
      onChange(null, AutoCompleteChangeReason.clear);
      setFocusedOption('');
    }
  };

  /**
   * 处理输入框点击事件
   */
  const handleInputClick = () => {
    setOpen(true);
    if (!freeSolo) {
      // eslint-disable-next-line no-unused-expressions
      inputRef.current?.select();
    }
  };

  /**
   * 处理输入框获取焦点事件
   */
  const handleInputFocus = () => {
    if (openOnFocus) {
      setOpen(true);
    }
    setFocused(true);
  };

  /**
   * 处理输入框失去焦点事件
   */
  const handleInputBlur = () => {
    setOpen(false);
    if (!freeSolo) {
      setInputValue(value ? getOptionLabel(value) : '');
      setFocusedOption(value ? getOptionLabel(value) : '');
    }
    setFocused(false);

    if (freeSolo && onChange) {
      if (multiple) {
        onChange(
          [...value, inputValue].filter(Boolean),
          AutoCompleteChangeReason.blur,
        );
        setInputValue('');
        setFocusedOption(value[value.length - 1]);
      } else {
        onChange(inputValue, AutoCompleteChangeReason.blur);
        setFocusedOption(inputValue);
      }
    }
  };

  /**
   * 处理输入框键盘事件
   *
   * @param event 键盘事件
   */
  const handleInputKeydown = (event: React.KeyboardEvent) => {
    const { key } = event;
    if (!open && clearOnEscape && key === 'Escape') {
      if (onChange && value != null) {
        onChange(null, AutoCompleteChangeReason.clear);
      }
      setInputValue('');
      setFocusedOption('');
    } else if (closeOnEscape && key === 'Escape') {
      setOpen(false);
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
      if (open && listRef.current) {
        const items = getAvailableItems(listRef.current);
        const focusedIndex = getFocusedIndex(items, key, focusedOption);
        items[focusedIndex].scrollIntoView(false);
        setFocusedOption(items[focusedIndex]?.textContent!);
      } else {
        setOpen(true);
      }
    } else if (handleHomeEndKeys && key === 'Home' && open && listRef.current) {
      const items = getAvailableItems(listRef.current);
      setFocusedOption(items[0]?.textContent!);
    } else if (key === 'End' && handleHomeEndKeys && open && listRef.current) {
      const items = getAvailableItems(listRef.current);
      items[items.length - 1].scrollIntoView();
      setFocusedOption(items[items.length - 1]?.textContent!);
    } else if (key === 'Enter' && focusedOption) {
      const focusedItem = options.find(
        (option) => getOptionLabel(option) === focusedOption,
      );
      handleOptionClick(focusedItem);
    } else if (
      multiple &&
      key === 'Backspace' &&
      inputValue.length === 0 &&
      onChange
    ) {
      onChange(
        value.slice(0, value.length - 1),
        AutoCompleteChangeReason.removeOption,
      );
    } else if (
      multiple &&
      ['ArrowLeft', 'ArrowRight'].includes(key) &&
      inputValue.length === 0 &&
      value &&
      value.length > 0
    ) {
      moveFocused(textInputRef.current, key === 'ArrowLeft' ? -1 : 1);
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
    setFocusedOption('');
    if (onChange) {
      onChange(null, AutoCompleteChangeReason.clear);
    }
  };

  /**
   * 处理标签删除
   *
   * @param tagIndex 标签索引
   */
  const handleRemoveTag = (tagIndex: number) => {
    if (onChange) {
      const newValue = [
        ...value.slice(0, tagIndex),
        ...value.slice(tagIndex + 1),
      ];
      onChange(newValue, AutoCompleteChangeReason.removeOption);
    }
  };

  /**
   * 处理点击标签
   */
  const handleClickTag = () => {
    const input = inputRef.current;
    if (openOnClickTags && input) {
      input.focus();
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

  const selectedOptions = useMemo(() => {
    if (value) {
      return freeSolo ? [value] : [getOptionLabel(value)];
    }
    return [];
  }, [freeSolo, getOptionLabel, value]);

  const input = renderInput({
    ref: textInputRef,
    value: inputValue,
    shrink: focused || inputValue || (multiple && value && value.length > 0),
    dense,
    onChange: handleInputChange,
    onMouseDown: preventEventDefault,
    className: bemClassNames('sinoui-auto-complete', {
      multiple,
      dense: dense && multiple,
    }),
    onKeyDown: handleInputKeydown,
    inputProps: {
      ref: inputRef,
      onClick: handleInputClick,
      onBlur: handleInputBlur,
      onFocus: handleInputFocus,
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
        {freeSolo
          ? forcePopupIcon === true && renderPopupIndicator()
          : forcePopupIcon !== false && renderPopupIndicator()}
      </InputAdornment>
    ),
    startAdornment:
      multiple && value ? (
        <AutoCompleteTags
          tags={freeSolo ? value : value.map(getOptionLabel)}
          onRemoveTag={handleRemoveTag}
          onClickTag={handleClickTag}
          variant={tagVariant}
          renderTags={renderTags}
          dense={dense}
        />
      ) : null,
  });

  const renderOptions = () => (
    <OptionList
      ref={listRef}
      options={filteredOptions}
      focusedOption={focusedOption}
      selectedOptions={selectedOptions}
      getOptionLabel={getOptionLabel}
      onOptionClick={handleOptionClick}
      freeSolo={freeSolo}
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
      <AutoCompleteStyle />
    </>
  );
}
