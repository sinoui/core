import styled from 'styled-components';

const StyledCardInner = styled.div<{
  flexDirection?: 'row' | 'column';
  border?: boolean;
}>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  flex: 1;

  & h5 {
    margin: 0;
    font-size: ${(props) => props.theme.typography.h5.fontSize};
    font-weight: ${(props) => props.theme.typography.fontWeightRegular};
    line-height: 1.334;
  }

  & h6 {
    margin: 0;
    font-size: ${(props) => props.theme.typography.body1.fontSize};
    color: ${(props) => props.theme.palette.text.secondary};
    font-weight: ${(props) => props.theme.typography.fontWeightRegular};
    line-height: 1.75;
  }

  & .icons {
    display: flex;
    align-items: center;
    padding: 0 0 16px 16px;
    & svg {
      font-size: 24px;
    }
  }
`;
export default StyledCardInner;
