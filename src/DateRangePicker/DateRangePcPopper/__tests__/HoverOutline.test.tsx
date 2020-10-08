import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import HoverOutline from '../HoverOutline';

afterEach(cleanup);

it('展现悬停轮廓', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <HoverOutline
        data-testid="hover-outline"
        hoverDate={new Date(2020, 6, 8)}
        year={2020}
        month={6}
      />
    </ThemeProvider>,
  );

  expect(getByTestId('hover-outline')).toHaveClass(
    'sinoui-date-range-picker__hover-outline',
  );
  expect(getByTestId('hover-outline')).toHaveStyle(
    'transform: translate(82px, 34px)',
  );
});

it('悬停轮廓在第二个日历上', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <HoverOutline
        data-testid="hover-outline"
        hoverDate={new Date(2020, 6, 8)}
        year={2020}
        month={7}
      />
    </ThemeProvider>,
  );

  expect(getByTestId('hover-outline')).toHaveStyle(
    'transform: translate(338px, 34px)',
  );
});

it('星期从周日开始', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <HoverOutline
        data-testid="hover-outline"
        hoverDate={new Date(2020, 6, 8)}
        year={2020}
        month={6}
        startOfWeek={0}
      />
    </ThemeProvider>,
  );

  expect(getByTestId('hover-outline')).toHaveStyle(
    'transform: translate(114px, 34px)',
  );
});

it('快照测试', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <HoverOutline
          data-testid="hover-outline"
          hoverDate={new Date(2020, 6, 8)}
          year={2020}
          month={6}
        />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
