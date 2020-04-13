import styled from 'styled-components';

const StyledDivider = styled.div`
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
  margin: 16px -16px;
`;

export default StyledDivider;
