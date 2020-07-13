import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '@sinoui/theme/defaultTheme';
import 'jest-styled-components';
import adjustOpacity from '@sinoui/core/utils/adjustOpacity';
import TimeItemWrapper from '../TimeItemWrapper';
import { TIME_ITEM_WIDTH, TIME_ITEM_HEIGHT } from '../../constants';

afterEach(cleanup);

it('默认样式', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimeItemWrapper data-testid="time-item-wrapper">12</TimeItemWrapper>
    </ThemeProvider>,
  );

  const timeItemWrapper = getByTestId('time-item-wrapper');

  expect(timeItemWrapper).toHaveStyleRule(
    'color',
    defaultTheme.palette.text.primary.replace(/ +/g, ''),
  );
  expect(timeItemWrapper).toHaveStyleRule('width', `${TIME_ITEM_WIDTH}px`);
  expect(timeItemWrapper).toHaveStyleRule('height', `${TIME_ITEM_HEIGHT}px`);

  expect(timeItemWrapper).toHaveStyleRule(
    'background-color',
    adjustOpacity(0.04, defaultTheme.palette.text.primary),
    {
      modifier: ':hover',
    },
  );
});

it('选中状态', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimeItemWrapper data-testid="time-item-wrapper" selected>
        12
      </TimeItemWrapper>
    </ThemeProvider>,
  );

  const timeItemWrapper = getByTestId('time-item-wrapper');

  expect(timeItemWrapper).toHaveStyleRule(
    'background-color',
    defaultTheme.palette.primary.main.replace(/ +/g, ''),
  );
  expect(timeItemWrapper).toHaveStyleRule(
    'color',
    defaultTheme.palette.primary.contrastText.replace(/ +/g, ''),
  );
});
