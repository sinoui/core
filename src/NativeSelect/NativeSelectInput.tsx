import React from 'react';
import styled from 'styled-components';

export interface Props {
  value?: string | string[];
  /**
   * 子元素
   */
  children: React.ReactNode;
  /**
   * 值变更时的回调函数
   */
  onChange?: (value: string | string[] | undefined) => void;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 是否不可用
   */
  disabled?: boolean;
  variant?: 'filled' | 'standard' | 'outlined';
}

const NativeSelectInputLayout = styled.div`
  && {
    min-width: 160px;
    width: 100%;
    height: 100%;
  }
`;

const NativeSelectInputContent = styled.select<Omit<Props, 'onChange'>>`
  ${({ theme }) => ({ ...theme.typography.body1 })}
  appearance: none;
  min-width: 160px;
  width: 100%;
  height: 100%;
  user-select: none;
  border: 0px;
  background: transparent;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  margin-right: ${({ variant }) =>
    variant === 'filled' || variant === 'outlined' ? -30 : -32}px;
  padding-right: 32px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

/**
 * 从子节点中解析出选项
 * @param children 子节点
 */
const parseOptionsFromChildren = (children: React.ReactNode) => {
  return (
    React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const { children: label, value = label, id = value } = child.props;
        return {
          id,
          value,
          label,
        };
      }
      return null;
    })?.filter(Boolean) ?? []
  );
};

export default function NativeSelectInput(props: Props) {
  const { onChange, value, multiple, children, ...rest } = props;
  const options = parseOptionsFromChildren(children);
  const isOptionSeleted = (itemValue: string) =>
    value === itemValue || (Array.isArray(value) && value.includes(itemValue));

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!onChange) {
      return;
    }
    const allOptions = event.target.querySelectorAll('option');
    const selectedOptions: string[] = [];
    allOptions.forEach((optionElement) => {
      if (optionElement.selected) {
        selectedOptions.push(optionElement.value);
      }
    });
    onChange(multiple ? selectedOptions : selectedOptions[0]);
  };

  const renderText = () => {
    const selectedOptions = options.filter((option) =>
      isOptionSeleted(option.value),
    );

    return selectedOptions.map((option, index) => {
      const { label } = option;

      if (typeof label === 'string') {
        return `${label}${index === selectedOptions.length - 1 ? '' : ', '}`;
      }
      return label;
    });
  };

  return (
    <NativeSelectInputLayout {...rest}>
      {value && <div>{renderText()}</div>}
      <NativeSelectInputContent
        {...rest}
        multiple={multiple}
        onChange={handleChange}
      >
        {options.map((item) => (
          <option
            key={item.id}
            value={item.value}
            selected={isOptionSeleted(item.value)}
          >
            {item.label}
          </option>
        ))}
      </NativeSelectInputContent>
    </NativeSelectInputLayout>
  );
}
