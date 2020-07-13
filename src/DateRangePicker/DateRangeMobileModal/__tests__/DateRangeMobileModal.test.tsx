import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import DateRangeMobileModal from '../DateRangeMobileModal';

it('打开状态', () => {
  const onRequestClose = jest.fn();
  render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeMobileModal
        open
        onRequestClose={onRequestClose}
        defaultMonth={5}
        defaultYear={2020}
      />
    </ThemeProvider>,
  );
  expect(
    document.querySelector('.sinoui-date-range-mobile-view'),
  ).toBeInTheDocument();
});

it('关闭状态', () => {
  const onRequestClose = jest.fn();
  render(
    <ThemeProvider theme={defaultTheme}>
      <DateRangeMobileModal
        open={false}
        onRequestClose={onRequestClose}
        defaultMonth={5}
        defaultYear={2020}
      />
    </ThemeProvider>,
  );
  expect(document.querySelector('.sinoui-date-range-mobile-view')).toBeFalsy();
});

describe('快照测试', () => {
  xit('打开状态', () => {
    const onRequestClose = jest.fn();
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <DateRangeMobileModal
            open
            onRequestClose={onRequestClose}
            defaultMonth={5}
            defaultYear={2020}
          />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  xit('关闭状态', () => {
    const onRequestClose = jest.fn();
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <DateRangeMobileModal
            open={false}
            onRequestClose={onRequestClose}
            defaultMonth={5}
            defaultYear={2020}
          />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
