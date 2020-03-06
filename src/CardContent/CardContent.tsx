import styled from 'styled-components';

/**
 * Card 主体文字区域
 */
const CardContent = styled.div`
  padding: 16px;
  color: ${(props) => props.theme.palette.text.primary};
  box-sizing: border-box;
`;

export default CardContent;
