import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Card from './Card';

describe('Card快照测试', () => {
  it('默认(海拔为1的Card)', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Card>文本</Card>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('边框模式Card', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Card outlined>文本</Card>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('海拔为0的Card', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Card elevation={0}>文本</Card>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
