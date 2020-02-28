import React from 'react';
import styled, { css } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import {
  MdPlayArrow,
  MdFastRewind,
  MdFastForward,
  MdStar,
  MdStarBorder,
} from 'react-icons/md';
import Card from '@sinoui/core/Card';
import CardPrimaryAction from '@sinoui/core/CardPrimaryAction';
import CardActions from '@sinoui/core/CardActions';
import CardActionButtons from '@sinoui/core/CardActionButtons';
import CardActionIcons from '@sinoui/core/CardActionIcons';
import CardMedia from '@sinoui/core/CardMedia';
import CardHeader from '@sinoui/core/CardHeader';
import CardContent from '@sinoui/core/CardContent';
import mediaImg1 from './images/mediaImg1.jpg';

export default {
  title: 'CardDemo',
};

const mediaImgUrl =
  'https://material-ui.com/static/images/cards/live-from-space.jpg';

const ContentWrapper = styled.div<{
  flexDirection?: 'row' | 'column';
  border?: boolean;
}>`
  display: flex;
  display-direction: ${({ flexDirection }) => flexDirection || 'row'};
  flex: 1;
  ${({ theme, border }) =>
    border &&
    css`
      border-bottom: 1px solid ${theme.palette.divider};
    `}

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
export const UIControls0 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Card style={{ display: 'flex', maxWidth: '400px' }}>
      <ContentWrapper flexDirection="column">
        <CardContent>
          <h5>Live From Space</h5>
          <h6>Mac Miller</h6>
        </CardContent>
        <div className="icons">
          <MdFastRewind />
          <MdPlayArrow />
          <MdFastForward />
        </div>
      </ContentWrapper>

      <CardMedia
        imageUrl={mediaImgUrl}
        width={151}
        style={{ borderRadius: '0 4px 4px 0' }}
      />
    </Card>
  </ThemeProvider>
);

export const UIControls1 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Card style={{ maxWidth: '400px' }}>
      <ContentWrapper border>
        <CardMedia
          imageUrl={mediaImg1}
          width={162}
          style={{ borderRadius: '4px 0 0 0' }}
        />
        <CardContent>
          <h5>Rozes</h5>
          <h6>Mac Miller</h6>
        </CardContent>
      </ContentWrapper>

      <CardActions>
        <CardActionButtons>Rate this album</CardActionButtons>
        <CardActionIcons>
          <MdStar />
          <MdStar />
          <MdStarBorder />
        </CardActionIcons>
      </CardActions>
    </Card>
  </ThemeProvider>
);
