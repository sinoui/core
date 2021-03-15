import { ThemeProvider } from 'styled-components';
import { defaultTheme, createTheme, Theme } from '@sinoui/theme';
import Scrim from '@sinoui/core/Backdrop/Scrim';
import React, { useState } from 'react';
import Card from '@sinoui/core/Card';
import CardContent from '@sinoui/core/CardContent';
import Progress from '@sinoui/core/Progress';
import Body2 from '@sinoui/core/Body2';
import Body1 from '@sinoui/core/Body1';
import H6 from '@sinoui/core/H6';
import Backdrop from '@sinoui/core/Backdrop/Backdrop';
import { Button } from '../src';

export default {
  title: 'Backdrop',
};

const ScrimDemo = ({ theme }: { theme: Theme }) => {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Card style={{ width: 400, margin: 16 }}>
          <CardContent>
            <H6 gutterBottom>遮罩层</H6>
            <Body2 color="textSecondary" paragraph>
              Scrim
            </Body2>
            <Body1 paragraph>
              遮罩层是应用于材料表面的临时处理，目的是使表面上的内容不那么突出。它们有助于将用户的注意力转移到遮罩层之上的内容。
            </Body1>
            <Body1>可以有多种方式使用遮罩层，包括：</Body1>
            <ul>
              <li>使表面和其内容变暗或者变淡</li>
              <li>降低表面和其内容的不透明度</li>
            </ul>
            <Body1 paragraph>Scrim组件采用的是第二个方案。</Body1>
            <Body1>
              在屏幕上的多个表面可以同时显示遮罩层。遮罩层可以显示在任何海拔（深度）上，无论是在前景还是背景中。
            </Body1>
          </CardContent>
        </Card>
        <Scrim style={{ flexDirection: 'column' }}>
          <Body1 color="white" paragraph>
            正在加载您的文件
          </Body1>
          <Progress linear color="secondary" style={{ width: 240 }} />
        </Scrim>
      </div>
    </ThemeProvider>
  );
};

export const scrimDemo = () => <ScrimDemo theme={defaultTheme} />;

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
});

export const scrimDarkDemo = () => <ScrimDemo theme={darkTheme} />;

const BackdropDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: defaultTheme.palette.background.default,
          padding: 16,
          boxSizing: 'border-box',
        }}
      >
        <Button outlined onClick={() => setIsOpen(true)}>
          显示遮罩层
        </Button>
        <Backdrop
          style={{ flexDirection: 'column' }}
          open={isOpen}
          onClick={() => setIsOpen(false)}
        >
          <Body1 color="white" paragraph>
            正在加载您的文件
          </Body1>
          <Progress linear color="secondary" style={{ width: 240 }} />
        </Backdrop>
      </div>
    </ThemeProvider>
  );
};

export const backdropDemo = () => <BackdropDemo />;
