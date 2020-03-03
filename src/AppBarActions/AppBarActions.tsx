import styled from 'styled-components';

const AppBarActions = styled.div`
  display: flex;
  margin-left: 32px;
  & > *:not(:last-child) {
    margin-right: 24px;
  }
`;

export default AppBarActions;
