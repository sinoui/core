import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

import { MdRestore } from 'react-icons/md';
import BottomNavigationAction from '@sinoui/core/BottomNavigationAction';

/**
 * BottomNavigationAction组件 测试
 */

describe('BottomNavigationAction组件 单元测试', () => {
  afterEach(cleanup);

  it('测试value值', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<MdRestore />}
          data-testid="bottomNavigation"
        />
      </ThemeProvider>,
    );

    const test = getByTestId('bottomNavigation').getAttribute('value');
    expect(test).toEqual('recents');
  });

  it('测试标签名称', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<MdRestore />}
          data-testid="bottomNavigation"
          showLabel
        />
      </ThemeProvider>,
    );

    const text = container.querySelector('.sinoui-bottom-navigation');
    expect(text && text.lastChild).toHaveTextContent('Recents');
  });

  it('测试是否选中', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<MdRestore />}
          data-testid="bottomNavigation"
          showLabel
        />
      </ThemeProvider>,
    );

    const text = container.querySelector('.sinoui-bottom-navigation');
    expect(text && text.lastChild).toHaveTextContent('Recents');
  });
});
