import styled from 'styled-components';

const AppBarActions = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 24px;
  }
`;

export default AppBarActions;
