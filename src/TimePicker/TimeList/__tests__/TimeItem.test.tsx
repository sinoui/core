/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import TimeItem from '../TimeItem';

afterEach(cleanup);

const createData = (onClick: (index: number) => void) => (index: number) => ({
  selected: index === 1,
  timeValue: index + 5,
  onClick,
});

it('渲染时间选项', () => {
  const onClick = jest.fn();
  const data = createData(onClick);
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimeItem data={data} index={1} data-testid="time-item" />
    </ThemeProvider>,
  );

  const timeItem = getByTestId('time-item');

  expect(timeItem).toHaveTextContent('06');
  expect(timeItem).toHaveAttribute('data-index', '1');
  expect(timeItem).toHaveAttribute('data-time-value', '6');
  expect(timeItem).toHaveClass('sinoui-time-item--selected');
  expect(timeItem).toHaveAttribute('tabindex', '0');
});

it('点击选项', () => {
  const onClick = jest.fn();
  const data = createData(onClick);
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimeItem data={data} index={1} data-testid="time-item" />
    </ThemeProvider>,
  );

  const timeItem = getByTestId('time-item');

  fireEvent.click(timeItem);

  expect(onClick).toBeCalledWith(1);
});
