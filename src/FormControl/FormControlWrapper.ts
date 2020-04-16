import styled, { css } from 'styled-components';
import type FormControlProps from './FormControlProps';

const formControlHorizontalDenseStyle = css<FormControlProps>`
  &.sinoui-form-item--horizontal > .sinoui-form-label {
    min-height: 32px;
    padding-top: 4px;
  }
`;
const FormControlWrapper = styled.div<FormControlProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: stretch;

  .sinoui-form-item__content {
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    &.sinoui-form-item--horizontal {
      flex-direction: row;
      align-items: flex-start;
    }

    &.sinoui-form-item--horizontal > .sinoui-form-item__content {
      flex: 1 1 0%;
    }

    &.sinoui-form-item--horizontal > .sinoui-form-label {
      display: flex;
      justify-content: flex-end;
      align-self: flex-start;
      font-size: 16px;
      text-align: right;
      width: ${({ labelWidth = 160 }) => labelWidth}px;
      min-height: 40px;
      padding-top: 8px;
      padding-right: 8px;
      box-sizing: border-box;

      &::after {
        content: ':';
      }
    }
  }

  ${(props) => props.dense && formControlHorizontalDenseStyle}
`;

export default FormControlWrapper;
