/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '@sinoui/theme/defaultTheme';
import '@testing-library/jest-dom';
import CalendarViewHeader from '../CalendarViewHeader';

afterEach(cleanup);

it('渲染日历视图头部', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewHeader
        year={2020}
        month={5}
        data-testid="calendar-view-header"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const header = getByTestId('calendar-view-header');

  expect(header).toHaveTextContent('2020年六月');
});

it('上个月', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewHeader
        year={2020}
        month={5}
        data-testid="calendar-view-header"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const header = getByTestId('calendar-view-header');
  const prevButton = header.querySelector(
    '.sinoui-calendar-view-header__prev-month-icon',
  );

  fireEvent.click(prevButton!);

  expect(onChange).toBeCalledWith(2020, 4);
});

it('下个月', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <CalendarViewHeader
        year={2020}
        month={5}
        data-testid="calendar-view-header"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const header = getByTestId('calendar-view-header');
  const nextButton = header.querySelector(
    '.sinoui-calendar-view-header__next-month-icon',
  );

  fireEvent.click(nextButton!);

  expect(onChange).toBeCalledWith(2020, 6);
});
