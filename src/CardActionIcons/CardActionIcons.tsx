import styled from 'styled-components';
import CardActionButtons from '@sinoui/core/CardActionButtons';

const CardActionIcons = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-end;
  ${CardActionButtons} + & {
    margin-left: 16px;
  }
`;

export default CardActionIcons;
