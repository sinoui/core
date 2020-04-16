/* eslint-disable react/no-danger */
import React, {
  useState,
  useRef,
  useImperativeHandle,
  useEffect,
  useCallback,
} from 'react';
import Menu, { MenuListItem } from '@sinoui/core/Menu';
import classNames from 'classnames';
import styled, { css } from 'styled-components';
import useForkRef from '../utils/useForkRef';

export interface Props {
  /**
   * 是否自动获取焦点
   */
  autoFocus?: boolean;
  /**
   * 子元素
   */
  children: React.ReactNode;
  /**
   * 自定义class名称
   */
  className?: string;
  /**
   * 不可用
   */
  disabled?: boolean;
  /**
   * 可输入区域的DOM
   */
  inputRef?: any;
  /**
   * Menu属性
   */
  MenuProps?: any;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 失去焦点时的回调函数
   */
  onBlur?: () => void;
  /**
   * 获取焦点时的回调函数
   */
  onFocus?: () => void;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value: string | string[]) => void;
  /**
   * 弹窗出现时的回调函数
   */
  onOpen?: (event: any) => void;
  /**
   * 弹窗关闭时的回调函数
   */
  onClose?: () => void;
  /**
   * 是否显示弹窗
   */
  open?: boolean;
  /**
   * 是否只读
   */
  readOnly?: boolean;
  /**
   * 渲染值的处理逻辑
   */
  renderValue?: (value: string | string[]) => void;
  tabIndex?: number;
  /**
   * 值
   */
  value: string | string[];
  /**
   * 最小宽度
   */
  minWidth?: number;
  /**
   * 弹窗是否打开
   */
  $isOpen?: boolean;
}

type SelectLayoutProps = Omit<Props, 'value' | 'inputRef'>;

/**
 * 判断是否为空
 *
 * @param {*} display 判断的值
 * @returns boolean
 */
function isEmpty(display: any) {
  return display == null || (typeof display === 'string' && !display.trim());
}

const disabledStyle = css`
  cursor: default;
`;

const selectStyle = css<SelectLayoutProps>`
  && {
    min-width: ${(props) => props.minWidth || 0}px;
  }

  user-select: none;
  cursor: ${(props) => (props.readOnly ? 'default' : 'pointer')};
  border-radius: 0;
  outline: none;

  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }

  &::-ms-expand {
    display: none;
  }

  & + input + .sinoui-input-adornment--end > svg,
  &
    + input
    + .sinoui-input-adornment--end
    + .sinoui-input-adornment--end
    > svg {
    ${({ $isOpen }) => $isOpen && `transform:rotate(180deg)`}
  }
`;

const menuSelectStyle = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const SelectLayout = styled.div<SelectLayoutProps>`
  ${selectStyle};
  ${menuSelectStyle};
  ${(props) => props.disabled && disabledStyle};
`;

/**
 * 处理复选框内部逻辑的组件
 */
export default React.forwardRef<HTMLSelectElement, Props>(function SelectInput(
  props,
  ref,
) {
  const {
    autoFocus,
    children,
    className,
    disabled,
    inputRef: inputRefProp,
    MenuProps = {},
    multiple,
    onBlur,
    onChange,
    onClose,
    onFocus,
    onOpen,
    open,
    readOnly,
    renderValue,
    tabIndex: tabIndexProp,
    value: valueProp,
    minWidth,
    ...other
  } = props;

  const [value, setValue] = useState(valueProp);
  const [isOpen, setIsOpen] = useState(open ?? false);

  const inputRef = useRef(null);
  const handleRef = useForkRef(ref, inputRefProp);
  const anchorElRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (valueProp !== value) {
      setValue(valueProp);
    }
  }, [value, valueProp]);

  useImperativeHandle(
    handleRef,
    () => ({
      focus: () => {
        if (anchorElRef.current) {
          anchorElRef.current.focus();
        }
      },

      node: inputRef.current,
      value,
    }),
    [value],
  );

  useEffect(() => {
    if (autoFocus && anchorElRef.current) {
      anchorElRef.current.focus();
    }
  }, [autoFocus]);

  const handleFocus = () => {
    if (onFocus) {
      onFocus();
    }
  };

  const handleOpen = () => {
    if (disabled || readOnly) {
      return;
    }
    handleFocus();
    setIsOpen(true);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (anchorElRef.current) {
      anchorElRef.current.focus();
    }

    if (onClose) {
      onClose();
    }
  }, [onClose]);

  /**
   * 更新弹窗状态
   */
  const update = useCallback(
    (openState: boolean | undefined, event: any) => {
      if (openState) {
        if (onOpen) {
          onOpen(event);
        }
      } else {
        handleClose();
      }
    },
    [handleClose, onOpen],
  );

  /**
   * 鼠标按下时的回调函数
   * @param event
   */
  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    if (anchorElRef.current) {
      anchorElRef.current.focus();
    }

    update(true, event);
  };

  /**
   * enter键按下时的回调函数
   */
  const handleEnterKeyDown = useCallback(
    (event: any) => {
      let newValue;
      if (!multiple) {
        update(false, event);
      }

      if (multiple) {
        newValue = Array.isArray(value) ? [...value] : [];
        const itemIndex = value.indexOf(event.target.value);
        if (itemIndex === -1) {
          newValue.push(event.target.value);
        } else {
          newValue.splice(itemIndex, 1);
        }
      } else {
        newValue = event.target.value;
      }

      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    },
    [multiple, onChange, update, value],
  );

  /**
   * 点击选项时的回调函数
   */
  const handleItemClick = (child: any) => (event: any) => {
    if (!multiple) {
      update(false, event);
    }

    let newValue;

    if (multiple) {
      newValue = Array.isArray(value) ? [...value] : [];
      const itemIndex = value.indexOf(child.props.value);
      if (itemIndex === -1) {
        newValue.push(child.props.value);
      } else {
        newValue.splice(itemIndex, 1);
      }
    } else {
      newValue = child.props.value;
    }

    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!readOnly) {
      const validKeys = [' ', 'ArrowUp', 'ArrowDown', 'Enter'];

      if (validKeys.indexOf(event.key) !== -1) {
        event.preventDefault();
        update(true, event);
      }
    }
  };

  const handleBlur = () => {
    if (isOpen) {
      return;
    }

    if (onBlur) {
      onBlur();
    }
  };

  let display: any;
  let displaySingle;
  const displayMultiple: string[] = [];
  let computeDisplay = false;

  if (
    value !== null &&
    value !== undefined &&
    !(Array.isArray(value) && value.length === 0)
  ) {
    if (renderValue) {
      display = renderValue(value);
    } else {
      computeDisplay = true;
    }
  }

  const items = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    let selected;

    if (multiple) {
      if (!Array.isArray(value)) {
        throw new Error(
          'Material-UI: the `value` prop must be an array ' +
            'when using the `Select` component with `multiple`.',
        );
      }

      selected = value.some((v) => v === child.props.value);
      if (selected && computeDisplay) {
        displayMultiple.push(child.props.children);
      }
    } else {
      selected = value === child.props.value;
      if (selected && computeDisplay) {
        displaySingle = child.props.children;
      }
    }

    return (
      <MenuListItem
        role="option"
        {...child.props}
        $key={child.props.key || index}
        selected={selected}
        onClick={handleItemClick(child)}
      />
    );
  });

  if (computeDisplay) {
    display = multiple ? displayMultiple.join(', ') : displaySingle;
  }

  let menuMinWidth;

  if (anchorElRef.current && anchorElRef.current.parentNode) {
    menuMinWidth = (anchorElRef.current.parentNode as any).clientWidth;
  }

  let tabIndex;
  if (typeof tabIndexProp !== 'undefined') {
    tabIndex = tabIndexProp;
  } else {
    tabIndex = disabled ? null : 0;
  }

  return (
    <>
      <SelectLayout
        className={classNames('sinoui-select-layout', className)}
        ref={anchorElRef}
        data-testid="SelectDisplay"
        tabIndex={tabIndex as any}
        role="button"
        aria-expanded={isOpen ? 'true' : undefined}
        aria-haspopup="listbox"
        onKeyDown={handleKeyDown}
        onMouseDown={(disabled || readOnly ? null : handleMouseDown) as any}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onClick={handleOpen}
        disabled={disabled || readOnly}
        minWidth={minWidth}
        $isOpen={isOpen}
      >
        {isEmpty(display) ? <span>&#8203;</span> : display}
      </SelectLayout>
      <input
        ref={inputRef}
        type="hidden"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        {...other}
      />
      <Menu
        minWidth={
          anchorElRef.current?.parentNode
            ? (anchorElRef.current.parentNode as any).clientWidth
            : 0
        }
        anchorEl={anchorElRef.current}
        open={isOpen}
        onRequestClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onEnterKeyDown={handleEnterKeyDown}
        {...MenuProps}
        MenuListProps={{
          role: 'listbox',
          disableListWrap: true,
          ...MenuProps.MenuListProps,
        }}
        PaperProps={{
          ...MenuProps.PaperProps,
          style: {
            minWidth: menuMinWidth,
            ...(MenuProps.PaperProps != null
              ? MenuProps.PaperProps.style
              : null),
            margin: 0,
          },
        }}
      >
        {items}
      </Menu>
    </>
  );
});
