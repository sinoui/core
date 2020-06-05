import React, { useRef } from 'react';
import TextInput from '@sinoui/core/TextInput';
import type { TextInputProps } from '@sinoui/core/TextInput';
import AutoComplete from '@sinoui/core/AutoComplete';
import type { AutoCompleteProps } from '@sinoui/core/AutoComplete';
import SelectInput from './SelectInput';
import type SelectItem from './SelectItem';

export interface Props
  extends Omit<
    TextInputProps,
    'value' | 'multiline' | 'minRows' | 'maxRows' | 'onChange' | 'allowClear'
  > {
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 多选
   */
  multiple?: boolean;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value?: string | string[]) => void;
  /**
   * 值的渲染方式
   */
  renderValue?: (
    value: string | string[] | undefined,
    items: SelectItem[],
  ) => React.ReactNode;
  /**
   * 值
   */
  value?: string | string[];
  /**
   * 自定义class名称
   */
  className?: string;
  /**
   * 是否将弹出内容以传送门的方式渲染。默认为`false`。
   */
  portal?: boolean;
  /**
   * 自定义自动完成组件的属性
   */
  autoCompleteProps?: AutoCompleteProps;
  /**
   * 宽度自适应
   */
  autoWidth?: boolean;
}

/**
 * 从 children 中解析出选项
 *
 * @param children 下拉框叶子节点
 */
function parseItemsFromChildren(children: React.ReactNode): SelectItem[] {
  return (
    React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return null;
      }
      return {
        id: `${index}`,
        value: child.props.value,
        title: child.props.title ?? child.props.children,
        children: child.props.children as React.ReactNode,
      };
    })?.filter(Boolean) || []
  );
}

/**
 * 转化select的value为AutoComplete的值
 * @param items
 * @param value
 */
function transferSelectValueToAutoCompleteValue(
  items: SelectItem[],
  value?: string | string[],
) {
  if (value) {
    if (typeof value === 'string') {
      return items.find((item) => item.value === value);
    }

    return items.filter((item) => value.indexOf(item.value) !== -1);
  }
  return value;
}

/**
 * 选择框组件
 */
function Select(props: Props) {
  const selectRef = useRef<HTMLDivElement>(null);

  const {
    children,
    inputProps: nativeInputProps,
    multiple = false,
    renderValue,
    onChange,
    value,
    label,
    placeholder,
    autoCompleteProps,
    portal,
    error,
    disabled,
    readOnly,
    autoWidth,
    ...other
  } = props;

  const inputComprops = {
    children,
    renderValue,
    selectRef,
    ...nativeInputProps,
  };

  const options = parseItemsFromChildren(children);
  const autoCompleteValue = transferSelectValueToAutoCompleteValue(
    options,
    value,
  );

  const handleChange = (item: any) => {
    if (onChange) {
      let selectedValue = item;
      if (Array.isArray(item)) {
        selectedValue = item.map((data) => data.value);
      } else if (item != null) {
        selectedValue = item.value;
      }

      onChange(selectedValue);
    }
  };

  return (
    <AutoComplete
      options={options}
      getOptionLabel={(option) => option.title}
      renderOption={(option) => option.children}
      value={autoCompleteValue}
      onChange={handleChange}
      multiple={multiple}
      error={error}
      disabled={disabled}
      readOnly={readOnly}
      renderInput={(textInputProps: TextInputProps) => (
        <TextInput
          {...textInputProps}
          baseClassName="sinoui-select"
          label={label}
          placeholder={placeholder}
          inputComponent={SelectInput}
          inputProps={{ ...textInputProps.inputProps, ...inputComprops }}
          error={error}
          disabled={disabled}
          readOnly={readOnly}
          value={value as any}
          {...other}
        />
      )}
      renderTags={() => null}
      portal={portal}
      autoWidth={autoWidth}
      {...autoCompleteProps}
    />
  );
}

export default Select;
