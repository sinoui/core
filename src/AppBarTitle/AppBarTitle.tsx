import styled from 'styled-components';

/**
 * 顶部应用栏标题
 */
const AppBarTitle = styled.h1.attrs(() => ({
  className: 'sinoui-app-bar--title',
}))((props) => ({
  ...props.theme.typography.h6,
  margin: 0,
  overflow: 'hidden',
}));

export default AppBarTitle;
