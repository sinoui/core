import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { createTheme, defaultTheme } from '@sinoui/theme';
import blue from '@sinoui/theme/colors/blue';
import { MdMoreVert, MdShare } from 'react-icons/md';
import Card from '@sinoui/core/Card';
import CardPrimaryAction from '@sinoui/core/CardPrimaryAction';
import CardActions from '@sinoui/core/CardActions';
import CardActionButtons from '@sinoui/core/CardActionButtons';
import CardActionIcons from '@sinoui/core/CardActionIcons';
import CardMedia from '@sinoui/core/CardMedia';
import CardHeader from '@sinoui/core/CardHeader';
import CardContent from '@sinoui/core/CardContent';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
});
export default {
  title: 'Card',
};

const mediaImgUrl =
  'https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg';

const Avatar = () => {
  return (
    <div
      style={{
        height: '40px',
        width: '40px',
        backgroundColor: '#f44336',
        borderRadius: '4px',
      }}
    />
  );
};

const MediaContent = styled.div`
  padding: 16px;
  color: #fff;
`;

const MediaText = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

const MediaSubText = styled.p`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  margin: 8px 0;
`;

const CardContentText = styled.div`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const baseDemo = () => (
  <ThemeProvider theme={defaultTheme}>
    <Card>
      <CardPrimaryAction>
        <CardHeader
          avatar={<Avatar />}
          action={<MdMoreVert />}
          title="Shrimp and Chorizo Paella"
          subheader="subheader"
        />
        <CardMedia imageUrl={mediaImgUrl} wide />
        <CardContent>content</CardContent>
      </CardPrimaryAction>
      <CardActions>
        <CardActionButtons>
          <button>read</button>
          <button>bookmark</button>
        </CardActionButtons>
        <CardActionIcons>
          <MdShare />
          <MdMoreVert />
        </CardActionIcons>
      </CardActions>
    </Card>
  </ThemeProvider>
);

export const CardInDarkTheme = () => (
  <ThemeProvider theme={darkTheme}>
    <Card>
      <CardPrimaryAction>
        <CardHeader
          avatar={<Avatar />}
          action={<MdMoreVert />}
          title="Shrimp and Chorizo Paella"
          subheader="subheader"
        />
        <CardMedia imageUrl={mediaImgUrl} wide />
        <CardContent>content</CardContent>
      </CardPrimaryAction>
      <CardActions>
        <button>read</button>
        <button>bookmark</button>
      </CardActions>
    </Card>
  </ThemeProvider>
);

export const CardDemoMediaText = () => (
  <ThemeProvider theme={defaultTheme}>
    <Card style={{ width: '360px' }}>
      <CardPrimaryAction>
        <CardMedia imageUrl={mediaImgUrl} wide>
          <MediaContent>
            <MediaText>Our Changing Planet</MediaText>
            <MediaSubText>by Kurt Wagner</MediaSubText>
          </MediaContent>
        </CardMedia>
        <CardContent>
          <CardContentText>
            Visit ten places on our planet that are undergoing the biggest
            changes today.
          </CardContentText>
        </CardContent>
      </CardPrimaryAction>
      <CardActions>
        <button>read</button>
        <button>bookmark</button>
      </CardActions>
    </Card>
  </ThemeProvider>
);
