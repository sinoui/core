import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createTheme, createPalette, colors } from '@sinoui/theme';
import { MdMoreVert, MdShare } from 'react-icons/md';
import Card from '@sinoui/core/Card';
import CardPrimaryAction from '@sinoui/core/CardPrimaryAction';
import CardActions from '@sinoui/core/CardActions';
import CardActionButtons from '@sinoui/core/CardActionButtons';
import CardActionIcons from '@sinoui/core/CardActionIcons';
import CardMedia from '@sinoui/core/CardMedia';
import CardHeader from '@sinoui/core/CardHeader';
import CardContent from '@sinoui/core/CardContent';

const theme = createTheme({
  palette: createPalette({
    primary: colors.blue, // 主色调
  }),
});
export default {
  title: 'CardDemo',
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

export const baseDemo = () => (
  <ThemeProvider theme={theme}>
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

export const CardActionOnlyButtons = () => (
  <ThemeProvider theme={theme}>
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
