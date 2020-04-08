import styled from 'styled-components';
import Card from '@sinoui/core/Card';

const StyledCardText = styled(Card)`
  padding: 16px;
  margin-right: 16px;
  & h1 {
    margin: 16px 0 0;
  }

  & h1 ~ h4 {
    margin: 16px 0 0;
  }
  & h4 {
    margin: 0;
    color: ${(props) => props.theme.palette.text.secondary};
    font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  }
`;

export default StyledCardText;
