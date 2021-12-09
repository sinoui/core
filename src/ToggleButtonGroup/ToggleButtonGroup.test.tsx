/**
 * @jest-environment jsdom
 */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import ToggleButtonGroup from './ToggleButtonGroup';
import ToggleButton from '../ToggleButton';

afterEach(cleanup);

it('单选指定值', () => {
  const { getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <ToggleButtonGroup value="android">
        <ToggleButton value="web">web</ToggleButton>
        <ToggleButton value="android">android</ToggleButton>
        <ToggleButton value="ios">ios</ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>,
  );

  expect(getByText('android')).toHaveClass('sinoui-toggle-button--selected');
});

it('多选指定值', () => {
  const { getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <ToggleButtonGroup multiple value={['web', 'ios']}>
        <ToggleButton value="web">web</ToggleButton>
        <ToggleButton value="android">android</ToggleButton>
        <ToggleButton value="ios">ios</ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>,
  );

  expect(getByText('web')).toHaveClass('sinoui-toggle-button--selected');
  expect(getByText('ios')).toHaveClass('sinoui-toggle-button--selected');
});

it('切换选中项', () => {
  const onChange = jest.fn();
  const { getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <ToggleButtonGroup value="android" onChange={onChange}>
        <ToggleButton value="web">web</ToggleButton>
        <ToggleButton value="android">android</ToggleButton>
        <ToggleButton value="ios">ios</ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>,
  );
  act(() => {
    fireEvent.click(getByText('ios'));
  });

  expect(onChange).toBeCalledWith('ios');
});

it('多选模式下的值变更', () => {
  const onChange = jest.fn();
  const { getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <ToggleButtonGroup multiple value={['web', 'ios']} onChange={onChange}>
        <ToggleButton value="web">web</ToggleButton>
        <ToggleButton value="android">android</ToggleButton>
        <ToggleButton value="ios">ios</ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>,
  );
  act(() => {
    fireEvent.click(getByText('ios'));
  });

  expect(onChange).toBeCalledWith(['web']);
});
