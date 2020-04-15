import React, { useState, useCallback, useRef } from 'react';
import HelperText from '../HelperText';
import bemClassNames from '../utils/bemClassNames';
import useId from './useId';
import HelperLine from '../HelperLine';
import type FormItemProps from './FormItemProps';
import FormItemWrapper from './FormItemWrapper';
import FormLabel from '../FormLabel';
import FormItemContext from './FormItemContext';

/**
 * 表单项组件
 */
const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
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
      id = inputId,
      filled,
      variant = 'standard',
      labelLayout,
      colon,
      disabled,
      required,
      focused: focusedProp,
      dense,
      ...rest
    } = props;

    const [_focused, setFocused] = useState(false);
    const focused = focusedProp != null ? focusedProp : _focused;
    const onFocus = useCallback(() => setFocused(true), [setFocused]);
    const onBlur = useCallback(() => setFocused(false), [setFocused]);

    const childContext = {
      filled,
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
      <FormItemContext.Provider value={childContext}>
        <FormItemWrapper
          className={bemClassNames('sinoui-form-item', {
            horizontal: layout === 'horizontal',
            vertical: layout === 'vertical',
          })}
          ref={ref}
          dense={dense}
          {...rest}
        >
          <FormLabel ref={labelRef}>{props.label}</FormLabel>
          <div className="sinoui-form-item__content">
            {props.children}
            <HelperLine>
              {helperText && !error && <HelperText>{helperText}</HelperText>}
              {error && <HelperText error>{error}</HelperText>}
            </HelperLine>
          </div>
        </FormItemWrapper>
      </FormItemContext.Provider>
    );
  },
);

export default FormItem;
