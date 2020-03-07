import React from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import AppBar from '@sinoui/core/AppBar';
import AppBarTitle from '@sinoui/core/AppBarTitle';
import NavigationIcon from '@sinoui/core/NavigationIcon';
import AppBarActions from '@sinoui/core/AppBarActions';
import Icon from './Icon';
import { MdDehaze, MdFavorite, MdBookmark } from 'react-icons/md';

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
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar
        {...props}
        title={
          <>
            <div>标题</div>
            <input placeholder="请输入" style={{ height: '32px' }} />
          </>
        }
        navigationIcon={
          <Icon>
            <MdDehaze />
          </Icon>
        }
        actionItems={[
          <Icon>
            <MdFavorite />
          </Icon>,
          <Icon>
            <MdBookmark />
          </Icon>,
        ]}
      />
    </ThemeProvider>
  );
}
