import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Badge from '@sinoui/core/Badge';
import Avatar from '@sinoui/core/Avatar';
import useBaseUrl from '@docusaurus/useBaseUrl';

const BadgeWrapper = styled(Badge)`
  & .sinoui-badge__content {
    right: 14%;
    bottom: 14%;
  }
`;

const AvatarWrapper = styled(Avatar)`
  width: 22px;
  height: 22px;
  background-color: #fff;

  > img {
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }
`;

function BadgeContentDemo() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BadgeWrapper
        badgeContent={
          <AvatarWrapper>
            <img src={useBaseUrl('img/avatarf.jpg')} alt="" />
          </AvatarWrapper>
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar>
          <img src={useBaseUrl('img/avatarf.jpg')} alt="" />
        </Avatar>
      </BadgeWrapper>
    </ThemeProvider>
  );
}

export default BadgeContentDemo;
