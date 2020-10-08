import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

import { MdRestore } from 'react-icons/md';
import NavigationRailAction from '@sinoui/core/NavigationRailAction';

/**
 * NavigationRailAction组件 测试
 */

describe('NavigationRailAction组件 单元测试', () => {
  afterEach(cleanup);

  it('测试value值', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <NavigationRailAction
          label="Recents"
          value="recents"
          icon={<MdRestore />}
          data-testid="NavigationRail"
        />
      </ThemeProvider>,
    );

    const test = getByTestId('NavigationRail').getAttribute('value');
    expect(test).toEqual('recents');
  });

  it('测试标签名称', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <NavigationRailAction
          label="Recents"
          value="recents"
          icon={<MdRestore />}
          data-testid="NavigationRail"
        />
      </ThemeProvider>,
    );

    const text = container.querySelector('.sinoui-navigation-rail');
    expect(text && text.lastChild).toHaveTextContent('Recents');
  });
});
