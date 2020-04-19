import styled, { css } from 'styled-components';

export interface FormGroupProps {
  /**
   * 设置是否纵向排列
   */
  column?: boolean;
  /**
   * 在网格布局中应该显示几列
   */
  columns?: number;
  /**
   * 密集模式
   */
  dense?: boolean;
  /**
   * 禁用左缩进。默认为`false`，会自动开启左缩进。
   */
  disabledIndent?: boolean;
}

/**
 * 行排列（水平排列）
 */
const rowCss = css`
  > label {
    padding-right: 8px;
  }
  > label:last-child {
    padding-right: 0px;
  }
`;

/**
 * 纵向排列
 */
const columnCss = css<FormGroupProps>`
  ${({ column, columns = column ? 1 : 0 }) =>
    columns > 0 &&
    `
  > label {
    width: ${100 / columns}%;
  }
  `}
`;

/**
 * 左缩进
 */
const indentCss = css<FormGroupProps>`
  > label {
    transform: ${({ dense }) => `translate(-${dense ? 7 : 11}px, 0px)`};
  }
`;

/**
 * 表单分组
 */
const FormGroup = styled.div.attrs({
  className: 'sinoui-form-group' as string | undefined,
})<FormGroupProps>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  ${rowCss}
  ${columnCss}
  ${({ disabledIndent }) => !disabledIndent && indentCss}
`;

export default FormGroup;
