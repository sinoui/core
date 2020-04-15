import styled, { css } from 'styled-components';
import type FormItemProps from './FormItemProps';

const formItemHorizontalDenseStyle = css`
  &.sinoui-form-item--horizontal > .sinoui-form-label {
    min-height: 32px;
    padding-top: 4px;
  }
`;
const FormItemWrapper = styled.div<FormItemProps>`
  display: flex;
  position: relative;

  & > .sinoui-form-item__content {
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
  }

  &.sinoui-form-item--vertical {
    flex-direction: column;
    align-items: stretch;
  }

  &.sinoui-form-item--horizontal > .sinoui-form-label {
    display: flex;
    justify-content: flex-end;
    align-self: flex-start;
    margin: 0;
    min-height: 40px;
    width: 160px;
    padding-top: 8px;
    padding-right: 8px;
    box-sizing: border-box;
    font-size: 16px;
  }

  ${(props) => props.dense && formItemHorizontalDenseStyle}
`;

export default FormItemWrapper;
