import styled from 'styled-components';

const StepContent = styled.div`
  display: inline-block;
  vertical-align: top;

  .sinoui-step-subtitle--error,
  .sinoui-step-description--error {
    color: ${({ theme }) => theme.palette.error.main};
  }
`;

export default StepContent;
