import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { createTheme, defaultTheme } from '@sinoui/theme';
import { MdMoreVert, MdShare } from 'react-icons/md';
import Card from '@sinoui/core/Card';
import CardPrimaryAction from '@sinoui/core/CardPrimaryAction';
import CardActions from '@sinoui/core/CardActions';
import CardActionButtons from '@sinoui/core/CardActionButtons';
import CardActionIcons from '@sinoui/core/CardActionIcons';
import CardMedia from '@sinoui/core/CardMedia';
import CardHeader from '@sinoui/core/CardHeader';
import CardContent from '@sinoui/core/CardContent';
import Button from '@sinoui/core/Button';
import SvgIcon from '@sinoui/core/SvgIcon';
import IconButton from '@sinoui/core/IconButton';

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
    <Card className="custon-css">
      <CardPrimaryAction>
        <CardHeader
          avatar={<Avatar />}
          action={
            <IconButton>
              <SvgIcon as={MdMoreVert} />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="subheader"
        />
        <CardMedia imageUrl={mediaImgUrl} wide />
        <CardContent>content</CardContent>
      </CardPrimaryAction>
      <CardActions>
        <CardActionButtons>
          <Button>read</Button>
          <Button>bookmark</Button>
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
          action={
            <IconButton>
              <SvgIcon as={MdMoreVert} />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="subheader"
        />
        <CardMedia imageUrl={mediaImgUrl} wide />
        <CardContent>content</CardContent>
      </CardPrimaryAction>
      <CardActions>
        <Button>read</Button>
        <Button>bookmark</Button>
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
        <Button>read</Button>
        <Button>bookmark</Button>
      </CardActions>
    </Card>
  </ThemeProvider>
);

export const Card头部没有头像和action = () => (
  <ThemeProvider theme={defaultTheme}>
    <Card style={{ width: '360px' }}>
      <CardPrimaryAction>
        <CardHeader title="Shrimp and Chorizo Paella" subheader="subheader" />
      </CardPrimaryAction>
    </Card>
  </ThemeProvider>
);
