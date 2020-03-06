import styled from 'styled-components';

/**
 * 顶部应用栏标题
 */
const AppBarTitle = styled.h1((props) => {
  return {
    ...props.theme.typography.h6,
    margin: 0,
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  };
});

export default AppBarTitle;
