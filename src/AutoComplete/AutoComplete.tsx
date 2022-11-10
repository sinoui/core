/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
import type { ModifierArguments, Options, Placement } from '@popperjs/core';
import type React from 'react';
import { useMemo, useRef, useState } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import styled, { css } from 'styled-components';

import Grow from '../Grow';
import IconButton from '../IconButton';
import InputAdornment from '../InputAdornment';
import type { PopperProps } from '../Popper';
import Popper from '../Popper';
import ArrowDropDownIcon from '../svg-icons/ArrowDropDownIcon';
import Close from '../svg-icons/Close';
import bemClassNames from '../utils/bemClassNames';
import useMultiRefs from '../utils/useMultiRefs';
import AutoCompleteStyle from './AutoCompleteStyle';
import AutoCompleteTags from './AutoCompleteTags';
import moveFocused from './moveFocused';
import OptionList from './OptionList';
import type { RenderTagsProps } from './types';
import { AutoCompleteCloseReason } from './types';
import useAutoCompleteOpen from './useAutoCompleteOpen';
import useInputValue from './useInputValue';
import { getAvailableItems } from './utils/handleItems';

/**
 * 自动补全组件变更原因
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

/**
 * 自动填充组件属性类型
 */
export interface Props {
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
   * 选项渲染方式
   */
  renderOption?: (option: any) => React.ReactNode;
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
  PopperComponent?: React.ElementType;
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
  TransitionComponent?: React.ElementType;
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
  /**
   * 设置多选时显示的标签数
   */
  limitTags?: number;
  /**
   * 是否将弹出内容以传送门的方式渲染。默认为`false`。
   */
  portal?: boolean;
  /**
   * 错误状态
   */
  error?: boolean;
  /**
   * 不可用状态
   */
  disabled?: boolean;
  /**
   * 只读状态
   */
  readOnly?: boolean;
  /**
   * 宽度自适应
   */
  autoWidth?: boolean;
  /**
   * 失去焦点时关闭弹窗，默认为`true`
   */
  closeOnBlur?: boolean;

  /**
   * 控制选项打开状态
   */
  open?: boolean;
  /**
   * 打开选项的回调函数
   */
  onOpen?: (state: boolean) => void;
  /**
   * 关闭选项的回调函数
   */
  onClose?: (reason: AutoCompleteCloseReason) => void;
  /**
   * 输入框引用
   */
  textInputRef?: React.Ref<HTMLInputElement>;
  /**
   * 弹出层元素引用
   */
  popperRef?: React.Ref<HTMLDivElement>;
  /**
   * 指定弹出层位置
   */
  placement?: Placement;
  /**
   * 弹出元素属性
   */
  popperComponentProps?: Partial<PopperProps>;
  /**
   * 是否允许弹层获取焦点。默认为`false`。
   */
  popperFocusable?: boolean;
  /**
   * 是否允许删除，默认为true
   */
  allowClear?: boolean;
  /**
   * 是否允许显示title提示，默认为false
   */
  allowShowTitle?: boolean;

  /**
   * 指定渲染选项列表的容器组件
   */
  ListboxComponent?: React.ElementType;
  /**
   * 自定义样式类
   */
  className?: string;
}

/**
 * 波纹的样式
 */
const rippleStyle = css<{
  /**
   * 图标按钮尺寸
   */
  size?: number;
}>`
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

const iconButtonStyle = css<{
  /**
   * 图标按钮尺寸
   */
  size?: number;
}>`
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
  /**
   * 是否是打开状态。
   */
  $open: boolean;
}>`
  ${iconButtonStyle}
  transition: ${({ theme }) => theme.transitions.create('transform')};
  transform: rotate(${({ $open }) => ($open ? 180 : 0)}deg);
`;

const StyledPopper = styled(Popper)<{
  /**
   * 是否使用传送门，将组件的DOM渲染到全局
   */
  portal?: boolean;
}>`
  z-index: ${({ theme }) => theme.zIndex.popover};

  > .sinoui-auto-complete__option-list {
    background-color: ${({ theme }) => theme.palette.background.paper};
  }
`;

const sameWidth = (autoWidth?: boolean) => ({
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }: ModifierArguments<Options>) => {
    state.styles.popper[autoWidth ? 'minWidth' : 'width'] = `${
      (state.elements.reference as any).width
    }px`;
  },
  effect: ({ state }: ModifierArguments<Options>) => {
    state.elements.popper.style[autoWidth ? 'minWidth' : 'width'] = `${
      (state.elements.reference as any).offsetWidth
    }px`;
  },
});

const getFocusedIndex = (
  items: HTMLLIElement[],
  key: string,
  focusedOption?: string | null,
) => {
  const currentIdx = items.findIndex(
    (item) => item.dataset.value === focusedOption,
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
 * 自动补全组件。
 *
 * @param props 组件属性。
 */
export default function AutoComplete(props: Props) {
  const {
    renderInput,
    value,
    options,
    getOptionLabel,
    closeOnEscape = true,
    PopperComponent = StyledPopper,
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
    limitTags,
    portal,
    error,
    disabled,
    readOnly,
    renderOption,
    autoWidth,
    closeOnBlur = true,
    open: openProp,
    onOpen,
    onClose,
    textInputRef: textInputRefProp,
    popperRef,
    placement,
    popperComponentProps,
    popperFocusable,
    allowClear = true,
    allowShowTitle = false,
    ListboxComponent,
    className,
  } = props;

  const defaultInputValue = useMemo(() => {
    if (value && !multiple) {
      return freeSolo ? value : getOptionLabel(value);
    }
    return '';
  }, [freeSolo, getOptionLabel, multiple, value]);

  const defaultFocusedOption = useMemo(() => {
    if (value && value.length > 0) {
      if (multiple) {
        return freeSolo
          ? value[value.length - 1]
          : getOptionLabel(value[value.length - 1]);
      }
      return freeSolo ? value : getOptionLabel(value);
    }
    return '';
  }, [freeSolo, getOptionLabel, multiple, value]);

  const textInputRef = useRef<HTMLInputElement | null>(null);
  const handleTextInputRef = useMultiRefs(textInputRefProp, textInputRef);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [inputValue, setInputValue] = useInputValue(defaultInputValue);
  const { isOpen, open, close } = useAutoCompleteOpen(
    openProp,
    onOpen,
    onClose,
  );
  const [focusedOption, setFocusedOption] = useState<string | undefined | null>(
    defaultFocusedOption,
  );
  const [focused, setFocused] = useState(false);
  const preventBlur = useRef(false);
  const modifiers = useMemo(() => [sameWidth(autoWidth)], [autoWidth]);

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
   * 处理选项点击事件
   *
   * @param item 选项
   */
  const handleOptionClick = (item: any) => {
    if (multiple) {
      setInputValue('');
      if (onChange) {
        if (freeSolo) {
          const idx = (value ?? []).indexOf(getOptionLabel(item));
          setFocusedOption(getOptionLabel(item));
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
          setFocusedOption(getOptionLabel(item));
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
      close(AutoCompleteCloseReason.selectOption);
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

    if (!isOpen) {
      open();
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
    if (disabled || readOnly) {
      return;
    }
    open();
    if (!freeSolo && inputRef.current?.select) {
      // eslint-disable-next-line no-unused-expressions
      inputRef.current?.select();
    }
  };

  /**
   * 处理输入框获取焦点事件
   */
  const handleInputFocus = () => {
    if (openOnFocus) {
      open();
    }
    setFocused(true);
  };

  /**
   * 处理输入框失去焦点事件
   */
  const handleInputBlur = () => {
    if (preventBlur.current) {
      preventBlur.current = true;
      return;
    }
    if (closeOnBlur) {
      close(AutoCompleteCloseReason.blur);
    }

    if (!freeSolo) {
      let focusedOptionText = '';
      if (Array.isArray(value) && value.length > 0) {
        focusedOptionText = getOptionLabel(value[value.length - 1]);
      } else if (value && !Array.isArray(value)) {
        focusedOptionText = getOptionLabel(value);
      }
      setInputValue(multiple || !value ? '' : getOptionLabel(value));
      setFocusedOption(focusedOptionText);
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
    if (!isOpen && clearOnEscape && key === 'Escape') {
      if (onChange && value != null) {
        onChange(null, AutoCompleteChangeReason.clear);
      }
      setInputValue('');
      setFocusedOption('');
    } else if (closeOnEscape && key === 'Escape') {
      close(AutoCompleteCloseReason.escape);
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
      if (isOpen && listRef.current) {
        const items = getAvailableItems(listRef.current);
        const focusedIndex = getFocusedIndex(items, key, focusedOption);
        scrollIntoView(items[focusedIndex], {
          scrollMode: 'if-needed',
          block: 'nearest',
          inline: 'nearest',
        });
        setFocusedOption(items[focusedIndex]?.dataset.value);
      } else {
        open();
      }
    } else if (
      handleHomeEndKeys &&
      key === 'Home' &&
      isOpen &&
      listRef.current
    ) {
      const items = getAvailableItems(listRef.current);
      setFocusedOption(items[0]?.textContent);
    } else if (
      key === 'End' &&
      handleHomeEndKeys &&
      isOpen &&
      listRef.current
    ) {
      const items = getAvailableItems(listRef.current);
      scrollIntoView(items[items.length - 1], {
        scrollMode: 'if-needed',
        block: 'nearest',
        inline: 'nearest',
      });
      setFocusedOption(items[items.length - 1]?.textContent);
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

    const input = inputRef.current;
    if (
      multiple &&
      !['ArrowLeft', 'ArrowRight'].includes(key) &&
      input &&
      document.activeElement !== input
    ) {
      input.focus();
    }
  };

  /**
   * 处理弹出提示器的点击事件
   */
  const handlePopupIndicatorClick = () => {
    if (isOpen) {
      close(AutoCompleteCloseReason.popperIndicatorClick);
    } else {
      open();
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
   * 获取弹出指示器的颜色
   */
  const getPopupIndicatorColor = () => {
    if (error) {
      return 'error';
    }

    if (disabled) {
      return 'actionDisabled';
    }

    if (isOpen) {
      return 'primary';
    }

    return 'textSecondary';
  };

  /**
   * 渲染弹出指示器
   */
  const renderPopupIndicator = () => (
    <PopupIndicatorWrapper
      $open={isOpen}
      className="sinoui-auto-complete__popup-indicator"
      color={getPopupIndicatorColor()}
      onClick={handlePopupIndicatorClick}
      disabled={disabled || readOnly}
    >
      {popupIcon}
    </PopupIndicatorWrapper>
  );

  const renderStartAdornment = () => {
    const tags = freeSolo ? value : value.map(getOptionLabel);
    if (limitTags && tags.length > limitTags && !focused) {
      return (
        <>
          <AutoCompleteTags
            tags={tags.slice(0, limitTags)}
            onRemoveTag={handleRemoveTag}
            onClickTag={handleClickTag}
            variant={tagVariant}
            renderTags={renderTags}
            dense={dense}
          />
          <span>+{tags.length - limitTags}</span>
        </>
      );
    }

    return (
      <AutoCompleteTags
        tags={freeSolo ? value : value.map(getOptionLabel)}
        onRemoveTag={handleRemoveTag}
        onClickTag={handleClickTag}
        variant={tagVariant}
        renderTags={renderTags}
        dense={dense}
      />
    );
  };

  const selectedOptions = useMemo(() => {
    if (value) {
      if (multiple) {
        return freeSolo ? value : value.map(getOptionLabel);
      }
      return freeSolo ? [value] : [getOptionLabel(value)];
    }
    return [];
  }, [freeSolo, getOptionLabel, multiple, value]);

  const isShowClear =
    allowClear &&
    (Array.isArray(value) ? value.length > 0 : !!value) &&
    !disabled &&
    !readOnly;

  const input = renderInput({
    ref: handleTextInputRef,
    value: inputValue,
    forceShrink:
      focused || inputValue || (multiple && value && value.length > 0),
    dense,
    onChange: handleInputChange,
    onMouseDown: preventEventDefault,
    className: bemClassNames(
      'sinoui-auto-complete',
      {
        multiple,
        dense: dense && multiple,
      },
      className,
    ),
    onKeyDown: handleInputKeydown,
    inputProps: {
      ref: inputRef,
      onClick: handleInputClick,
      onBlur: handleInputBlur,
      onFocus: handleInputFocus,
    },
    endAdornment: (
      <InputAdornment position="end">
        {isShowClear && (
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
    startAdornment: multiple && value ? renderStartAdornment() : null,
  });

  const renderOptions = () => (
    <OptionList
      ref={listRef}
      options={filteredOptions}
      focusedOption={focusedOption}
      selectedOptions={selectedOptions}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      onOptionClick={handleOptionClick}
      freeSolo={freeSolo}
      allowShowTitle={allowShowTitle}
      ListboxComponent={ListboxComponent}
    />
  );

  return (
    <>
      {input}
      <PopperComponent
        open={isOpen}
        referenceElement={textInputRef}
        onMouseDown={popperFocusable ? undefined : preventEventDefault}
        modifiers={modifiers}
        portal={portal}
        placement={placement}
        ref={popperRef}
        {...popperComponentProps}
      >
        <TransitionComponent in={isOpen}>{renderOptions()}</TransitionComponent>
      </PopperComponent>
      <AutoCompleteStyle />
    </>
  );
}
