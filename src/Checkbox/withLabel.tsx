import React from 'react';
import FormControlLabel from '@sinoui/core/FormControlLabel';
import { ColorProp } from '../types';

function getDisplayName(WrappedComponent: any, displayName?: string) {
  return (
    displayName ||
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'
  );
}

export interface FormControlBaseProps<V, T> {
  /**
   * 数值
   */
  value?: V;
  /**
   * 值发生变化时的回调函数
   */
  onChange?: (event: React.ChangeEvent<T>, value?: string) => void;
  /**
   * 获取焦点时的回调函数
   */
  onFocus?: (event: React.FocusEvent<T>) => void;
  /**
   * 失去焦点时的回调函数
   */
  onBlur?: (event: React.FocusEvent<T>) => void;
  /**
   * 选中状态
   */
  checked?: boolean;
  /**
   * 不可用状态
   */
  disabled?: boolean;
  /**
   * 是否只读
   */
  readOnly?: boolean;
  /**
   * 指定颜色
   */
  color?: ColorProp;
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

export interface FormControlWithLabelProps<V, T>
  extends FormControlBaseProps<V, T> {
  /**
   * label位置
   */
  labelPosition?: 'left' | 'right';
}

/**
 * @ReactHighOrderComponent
 *
 * 添加标签的高阶组件
 *
 * @template V 包含组件的值类型
 * @template P 包含组件的属性类型
 * @param {string} displayName 组件名称
 * @returns 返回包装后的组件
 */
function withLabel<V, T, P extends FormControlBaseProps<V, T>>(
  displayName: string,
) {
  return (BaseComponent: React.ComponentType<P>) => {
    const FormControlWithLabel: React.SFC<
      P & FormControlWithLabelProps<V, T>
    > = ({ children, labelPosition, ...props }: any) => {
      if (!children) {
        return <BaseComponent {...props} />;
      }
      return (
        <FormControlLabel
          labelPosition={labelPosition}
          label={children}
          control={<BaseComponent {...props} />}
        />
      );
    };

    if (process.env.NODE_ENV !== 'production') {
      FormControlWithLabel.displayName = `withLabel${getDisplayName(
        BaseComponent,
        displayName,
      )}`;
    }

    return FormControlWithLabel;
  };
}

export default withLabel;
