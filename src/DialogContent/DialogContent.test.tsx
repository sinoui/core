import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import DialogContent from '@sinoui/core/DialogContent';

describe('DialogContent组件 快照测试', () => {
  it('基本使用', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <DialogContent>
            Let Google help apps determine location. This means sending
            anonymous location data toGoogle, even when no apps are running.
          </DialogContent>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
