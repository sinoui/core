import styled from 'styled-components';

/**
 * 应用栏可操作区域
 */
const AppBarActions = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 24px;
  }
`;

export default AppBarActions;
