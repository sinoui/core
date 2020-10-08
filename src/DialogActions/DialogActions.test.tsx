import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import DialogActions from '@sinoui/core/DialogActions';
import Button from '@sinoui/core/Button';

describe('DialogActions组件 单元测试', () => {
  afterEach(cleanup);
  test('测试按钮垂直显示', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DialogActions column>
          <Button>Disagree</Button>
          <Button>Agree</Button>
        </DialogActions>
      </ThemeProvider>,
    );
    const test = container.querySelector('.sinoui-dialog-actions');
    expect(test).toHaveStyle('flex-direction:column');
  });
});

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
