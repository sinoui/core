import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import DialogActions from '@sinoui/core/DialogActions';
import Button from '@sinoui/core/Button';

describe('DialogActions组件 快照测试', () => {
  it('基本使用', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <DialogActions>
            <Button>Disagree</Button>
            <Button>Agree</Button>
          </DialogActions>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('按钮垂直显示', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <DialogActions column>
            <Button>Disagree</Button>
            <Button>Agree</Button>
          </DialogActions>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
