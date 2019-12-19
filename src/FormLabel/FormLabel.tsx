import React from 'react';
import FormLabelContainer from './FormLabelContainer';
import FormLabelContent from './FormLabelContent';

/**
 * 表单项中的标签组件属性
 *
 * @export
 * @interface FormLabelProps
 */
export interface FormLabelProps {
  /**
   * 标签文本。
   */
  children: React.ReactNode;
  /**
   * 标签宽度
   */
  width?: number | string;
  /**
   * label要绑定元素的id
   */
  name?: string;
  /**
   * 文本对齐方式
   */
  align?: 'left' | 'right' | 'center' | 'justify';
  /**
   * 文本之后添加冒号
   */
  colon?: boolean;
  /**
   * 警告状态
   */
  warning?: boolean;
  /**
   * 错误状态
   */
  error?: boolean;
  /**
   * 焦点状态
   */
  focused?: boolean;
  /**
   * 不可用状态
   */
  disabled?: boolean;
  /**
   * 必填项
   */
  required?: boolean;
  /**
   * label要绑定元素的id
   */
  htmlFor?: string;
  /**
   * 是否垂直显示
   */
  vertical?: boolean;
}

/**
 * 表单项中的标签
 *
 * @ReactComponent
 */
function FormLabel({
  required,
  children,
  align = 'right',
  ...props
}: FormLabelProps) {
  return (
    <FormLabelContainer {...props} align={align}>
      <FormLabelContent required={required} align={align}>
        {children}
      </FormLabelContent>
    </FormLabelContainer>
  );
}

export default FormLabel;
