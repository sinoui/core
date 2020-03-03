import React from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import AppBar from '@sinoui/core/AppBar';
import AppBarTitle from '@sinoui/core/AppBarTitle';
import NavigationIcon from '@sinoui/core/NavigationIcon';
import AppBarActions from '@sinoui/core/AppBarActions';

const TitleWrapper = styled.div<{ prominent?: boolean }>`
  display: flex;
  flex: 1;
  ${(props) =>
    props.prominent &&
    css`
      align-self: flex-end;
    `}
  ${AppBarTitle} {
    margin-right: 32px;
  }
`;

export default function Demo(props: {
  prominent?: boolean;
  dense?: boolean;
  fixed?: boolean;
  short?: boolean;
}) {
  const { prominent } = props;
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar {...props}>
        <NavigationIcon>
          <div>icons</div>
        </NavigationIcon>
        <TitleWrapper prominent={prominent}>
          <AppBarTitle>标题</AppBarTitle>
          <input placeholder="请输入" />
        </TitleWrapper>
        <AppBarActions>
          <div>icon1</div>
          <div>icon2</div>
        </AppBarActions>
      </AppBar>
    </ThemeProvider>
  );
}
