import styled from 'styled-components';

const Wrapper = styled.div`
  background: rgb(41, 45, 62);
  padding: 16px 0;
  & .sinoui-column {
    margin-bottom: 16px;
    > div {
      height: 100%;
      padding: 16px;
      background: #fff;
      border-radius: 4px;
      box-shadow: ${(props) => props.theme.shadows[1]};
    }
  }
`;
export default Wrapper;
