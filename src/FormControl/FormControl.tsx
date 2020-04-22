import React, { useState, useCallback, useRef } from 'react';
import HelperText from '../HelperText';
import bemClassNames from '../utils/bemClassNames';
import useId from './useId';
import HelperLine from '../HelperLine';
import type FormControlProps from './FormControlProps';
import FormControlWrapper from './FormControlWrapper';
import FormLabel from '../FormLabel';
import FormControlContext from './FormControlContext';

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
      id = inputId,
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

    const [_focused, setFocused] = useState(false);
    const focused = focusedProp ?? _focused;
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
      <FormControlContext.Provider value={childContext}>
        <FormControlWrapper
          className={bemClassNames('sinoui-form-item', {
            horizontal: layout === 'horizontal',
            vertical: layout === 'vertical',
            floating: labelLayout === 'floating',
          })}
          ref={ref}
          dense={dense}
          colon={colon}
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
        </FormControlWrapper>
      </FormControlContext.Provider>
    );
  },
);

export default FormControl;
