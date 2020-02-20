import styled, { css } from 'styled-components';

export const getFlexDirection = (props: FormGroupProps) =>
  props.column ? 'column' : 'row';

export const gridLayoutCss = css<FormGroupProps>`
  > * {
    width: ${(props) => 100 / props.columns}%;
  }
`;

/**
 * FormGroup组件属性接口
 *
 * @export
 * @interface FormGroupProps
 */
export interface FormGroupProps {
  /**
   * 是否垂直方向显示
   *
   * @type {boolean}
   * @memberof FormGroupProps
   */
  column?: boolean;

  /**
   * 网格对齐布局
   *
   * @type {boolean}
   * @memberof CheckboxGroupProps
   */
  gridLayout?: boolean;
  /**
   * 按照几列做网格布局，默认为3列
   *
   * @type {number}
   * @memberof CheckboxGroupProps
   */
  columns?: number;
}

/**
 * 用于包装一组`Checkbox`和`Switch`的组件。可以控制组件横向或者纵向显示。使用`RadioGroup`来显示一组`Radio`。
 *
 * @ReactComponent
 */
const FormGroup = styled.div<FormGroupProps>`
  display: flex;
  flex-direction: ${getFlexDirection};
  flex-wrap: wrap;
  ${(props) => props.gridLayout && props.columns > 0 && gridLayoutCss};
`;

export default FormGroup;
