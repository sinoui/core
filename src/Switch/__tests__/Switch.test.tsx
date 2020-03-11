import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom/extend-expect';
import Switch from '../Switch';

describe('Switch 镜像测试', () => {
  it('渲染Switch', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Switch value="switch1" color="primary" />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('不可用状态', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Switch value="switch2" disabled />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('选中状态', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Switch value="switch2" checked color="info" />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
