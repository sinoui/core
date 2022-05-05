import React, { useState, useCallback, useRef } from 'react';
import HelperText from '../HelperText';
import bemClassNames from '../utils/bemClassNames';
import useId from './useId';
import HelperLine from '../HelperLine';
import type FormControlProps from './FormControlProps';
import FormControlWrapper from './FormControlWrapper';
import FormLabel from './FormLabel';
import FormControlContext from './FormControlContext';

/**
 * 判断叶子节点是否只有一个且包含 placeholder 属性值
 *
 * @param children 叶子节点
 * @returns 如果叶子节点包含 placeholder 属性，则返回 true；否则返回 false
 */
const containsPlaceholder = (children?: React.ReactNode) =>
  React.Children.count(children) === 1 &&
  !!(React.Children.only(children) as any)?.props?.placeholder;

/**
 * 表单控件组件
 */
const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  (props, ref) => {
    const inputId = useId('input');
    const labelRef = useRef<HTMLLabelElement>(null);
    const {
      children,
      label,
      helperText,
      error,
      layout = 'vertical',
      className,
      id = process.env.NODE_ENV !== 'test' ? inputId : undefined,
      filled,
      variant = 'standard',
      labelLayout,
      colon = true,
      disabled,
      required,
      focused: focusedProp,
      dense,
      ...rest
    } = props;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [_focused, setFocused] = useState(false);
    const focused = focusedProp ?? _focused;
    const onFocus = useCallback(() => setFocused(true), [setFocused]);
    const onBlur = useCallback(() => setFocused(false), [setFocused]);
    const childrenContainsPlaceholder = containsPlaceholder(children);

    const childContext = {
      filled: childrenContainsPlaceholder || filled,
      id,
      variant,
      labelLayout,
      error: !!error,
      colon,
      disabled,
      required,
      focused,
      onFocus,
      onBlur,
      labelRef,
      dense,
      layout,
    };

    return (
      <FormControlContext.Provider value={childContext}>
        <FormControlWrapper
          className={bemClassNames(
            'sinoui-form-item',
            {
              horizontal: layout === 'horizontal',
              vertical: layout === 'vertical',
              floating: labelLayout === 'floating',
            },
            className,
          )}
          ref={ref}
          dense={dense}
          colon={colon}
          {...rest}
        >
          {props.label && <FormLabel ref={labelRef}>{props.label}</FormLabel>}
          <div className="sinoui-form-item__content">
            {children}
            <HelperLine>
              {helperText && !error && <HelperText>{helperText}</HelperText>}
              {error && typeof error !== 'object' && (
                <HelperText error>{error}</HelperText>
              )}
            </HelperLine>
          </div>
        </FormControlWrapper>
      </FormControlContext.Provider>
    );
  },
);

export default FormControl;
