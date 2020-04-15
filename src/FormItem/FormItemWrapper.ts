import styled from 'styled-components';

const FormItemWrapper = styled.div`
  display: flex;
  position: relative;

  & > .sinoui-form-item__content {
    display: flex;
    flex-direction: column;
  }

  &.sinoui-form-item--vertical {
    flex-direction: column;
    align-items: stretch;
  }
`;

export default FormItemWrapper;
