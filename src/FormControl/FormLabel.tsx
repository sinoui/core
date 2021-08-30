import styled, { css } from 'styled-components';
import type { Theme } from '@sinoui/theme';
import React from 'react';
import classNames from 'classnames';
import mem from '../utils/mem';
import useFormControlContext from './useFormControlContext';
import type FormLabelProps from './FormLabelProps';
import floatingLabelCss from './floatingLabelCss';
import { FormControlContextData } from './FormControlContext';

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

const requiredCss = css<{ $isAfterRequired: boolean }>`
  &::${({ $isAfterRequired }) => ($isAfterRequired ? 'after' : 'before')} {
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

type FormLabelInnerPropsType = FormLabelProps & { $isAfterRequired: boolean };

const FormLabelInner = styled.label.attrs(
  ({
    className,
    variant,
    layout,
    $isAfterRequired,
    filled,
    focused,
  }: FormLabelInnerPropsType) => ({
    className: classNames(
      className,
      'sinoui-form-label',
      `sinoui-form-label--variant-${variant ?? 'standard'}`,
      `sinoui-form-label--layout-${layout ?? 'standard'}`,
      {
        'sinoui-form-label--focused': focused,
        'sinoui-form-label--filled': filled,
        'sinoui-form-label--required-is-after': $isAfterRequired,
      },
    ),
  }),
)<FormLabelInnerPropsType>`
  font-size: ${(props) => props.theme.typography.body1.fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  color: ${getColor};
  box-sizing: border-box;
  margin: 0px;
  margin-top: -2px;
  transition: ${({ theme }) =>
    theme.transitions.create(['color', 'transform'], {
      easing: theme.transitions.easing.easeInOut,
    })};

  ${({ required }) => required && requiredCss};
  ${({ layout = 'shrink' }) => layout === 'shrink' && shrinkCss}
  ${({ layout }) => layout === 'standard' && standardCss}
  ${({ layout }) => layout === 'floating' && floatingLabelCss}
`;

const mapper: Array<
  | (keyof FormControlContextData & keyof FormLabelProps)
  | [keyof FormControlContextData, keyof FormLabelProps]
> = [
  'error',
  'colon',
  'variant',
  'filled',
  'required',
  'disabled',
  'focused',
  'dense',
  ['labelLayout', 'layout'],
  ['id', 'htmlFor'],
];

/**
 * 从上下文中获取状态
 *
 * @param formControlContext 表单控件上下文
 */
const getStateFromContext = mem(
  (formControlContext?: FormControlContextData | null) => {
    const state: Partial<FormLabelProps> = {};
    if (!formControlContext) {
      return state;
    }
    mapper.forEach((item) => {
      const fromKey = Array.isArray(item) ? item[0] : item;
      const toKey = Array.isArray(item) ? item[1] : item;
      const value: any = formControlContext[fromKey];
      if (value != null) {
        state[toKey] = value;
      }
    });

    return state;
  },
);

/**
 * 表单标签组件
 *
 * @ReactComponent
 */
const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, ...props }, ref) => {
    const formControlContext = useFormControlContext();

    const labelProps = {
      ...getStateFromContext(formControlContext),
      ...props,
      ref,
      $isAfterRequired: formControlContext?.layout !== 'horizontal',
    };

    return React.createElement(FormLabelInner, labelProps, children);
  },
);

export default FormLabel;
