import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import TimePickerMobileModal from '../TimePickerMobileModal';

it('弹窗显示', () => {
  const onRequestClose = jest.fn();
  const { rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimePickerMobileModal
        value="19:21"
        open
        onRequestClose={onRequestClose}
      />
    </ThemeProvider>,
  );
  const body = document.querySelector('body') as HTMLBodyElement;
  expect(body).toHaveStyle('overflow:hidden');
  expect(body).toHaveStyle('position:fixed');
  expect(body).toHaveStyle('width:100%');

  rerender(
    <ThemeProvider theme={defaultTheme}>
      <TimePickerMobileModal
        open={false}
        value="19:21"
        onRequestClose={onRequestClose}
      />
    </ThemeProvider>,
  );

  expect(body).not.toHaveStyle('overflow:hidden');
  expect(body).not.toHaveStyle('position:fixed');
  expect(body).not.toHaveStyle('width:100%');
});

describe('快照测试', () => {
  const onRequestClose = jest.fn();
  it('Clock', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <TimePickerMobileModal
            value="19:21"
            open
            onRequestClose={onRequestClose}
          />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
