import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Paper from '@sinoui/core/Paper';

const Div = styled.div`
  width: 128px;
  height: 128px;
  margin: 8px;
`;

/**
 * Paper组件 测试
 */
describe('Paper组件 快照测试', () => {
  it('基本使用', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Paper>
            <Div>Paper Content</Div>
          </Paper>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('设置阴影高度', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Paper elevation={4}>
            <Div>Paper Content</Div>
          </Paper>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('设置是否显示圆角', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Paper square>
            <Div>Paper Content</Div>
          </Paper>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('设置是否全屏显示', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Paper fullWidth>
            <Div>Paper Content</Div>
          </Paper>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
