import React from 'react';
import renderer from 'react-test-renderer';

import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Paper from '@sinoui/core/Paper';

const PaperWrapper = styled(Paper)`
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
          <PaperWrapper>Paper Content</PaperWrapper>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('设置阴影高度', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <PaperWrapper elevation={4}>Paper Content</PaperWrapper>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('设置是否显示方角', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <PaperWrapper square>Paper Content</PaperWrapper>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('设置轮廓模式', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <PaperWrapper outlined>Paper Content</PaperWrapper>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
