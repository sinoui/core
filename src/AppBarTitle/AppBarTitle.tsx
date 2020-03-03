import styled from 'styled-components';

const AppBarTitle = styled.h1((props) => {
  return {
    ...props.theme.typography.h6,
    margin: 0,
  };
});

export default AppBarTitle;
