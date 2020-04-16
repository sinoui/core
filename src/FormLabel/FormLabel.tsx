import styled, { css } from 'styled-components';
import type { Theme } from '@sinoui/theme';
import React from 'react';
import useFormControlContext from '../FormControl/useFormControlContext';
import { removeUndefinedProperties } from '../utils/objects';
import type FormLabelProps from './FormLabelProps';
import floatingLabelCss from './floatingLabelCss';

/**
 * 获取标签颜色
 */
const getColor = ({
  theme,
  color = theme.palette.primary.main,
  focused,
  disabled,
  error,
}: FormLabelProps & { theme: Theme }) => {
  if (error) {
    return theme.palette.error.main;
  }
  if (disabled) {
    return theme.palette.text.disabled;
  }
  if (focused) {
    return color;
  }
  return theme.palette.text.secondary;
};

const requiredCss = css`
  &::before {
    content: '*';
    padding: 4px;
  }
`;

const shrinkCss = css`
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  padding-bottom: 4px;
`;

const standardCss = css`
  padding-bottom: 4px;
`;

const FormLabelInner = styled.label.attrs({
  className: 'sinoui-form-label' as any,
})<FormLabelProps>`
  display: flex;
  font-size: ${(props) => props.theme.typography.body1.fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  color: ${getColor};
  box-sizing: border-box;
  transition: ${({ theme }) =>
    theme.transitions.create(['color', 'transform'], {
      easing: theme.transitions.easing.easeInOut,
    })};

  ${({ required }) => required && requiredCss};

  ${({ layout = 'shrink' }) => layout === 'shrink' && shrinkCss}
  ${({ layout }) => layout === 'standard' && standardCss}
  ${({ layout }) => layout === 'floating' && floatingLabelCss}
`;

/**
 * 表单标签组件
 *
 * @ReactComponent
 */
const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  (props, ref) => {
    const formControlContext = useFormControlContext();
    const state = formControlContext
      ? removeUndefinedProperties({
          colon: formControlContext.colon,
          variant: formControlContext.variant,
          layout: formControlContext.labelLayout,
          filled: formControlContext.filled,
          required: formControlContext.required,
          disabled: formControlContext.disabled,
          focused: formControlContext.focused,
          htmlFor: formControlContext.id,
          dense: formControlContext.dense,
        })
      : {};

    return <FormLabelInner {...state} {...props} ref={ref} />;
  },
);

export default FormLabel;
