import BaseButton from '@sinoui/core/BaseButton';
import styled from 'styled-components';

interface Props {
  fontSize?: number;
  selected?: boolean;
}

const ClickableText = styled(BaseButton)<Props>`
  font-size: ${({ fontSize }) => fontSize || 16}px;
  opacity: ${({ selected }) => (selected ? 1 : 0.7)};
`;

export default ClickableText;
