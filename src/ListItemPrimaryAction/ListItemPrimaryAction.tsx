import styled from 'styled-components';

/**
 * ListItemPrimaryAction 列表主要操作区
 */

const ListItemPrimaryAction = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 32px;
  }

  & > .sinoui-icon-button {
    margin: 8px 16px 8px 0;
  }
`;

export default ListItemPrimaryAction;
