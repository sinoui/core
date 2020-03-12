import styled from 'styled-components';

/**
 * ListItemPrimaryAction 列表主要操作区
 */

const ListItemPrimaryAction = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 1;

  & > svg {
    margin-right: 32px;
  }

  & > .sinoui-icon-button,
  & > .sinoui-avatar {
    margin-right: 16px;
  }
`;

export default ListItemPrimaryAction;
