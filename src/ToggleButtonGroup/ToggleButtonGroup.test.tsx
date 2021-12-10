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
      </ToggleButtonGroup>
    </ThemeProvider>,
  );

  expect(getByText('android')).toHaveClass('sinoui-toggle-button--selected');
});

it('跳过 null、undefined、false 子元素', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <ToggleButtonGroup value="web">
        <ToggleButton value="web">web</ToggleButton>
        {null}
        {undefined}
        {false}
      </ToggleButtonGroup>
    </ThemeProvider>,
  );

  expect(container.querySelectorAll('.sinoui-toggle-button').length).toBe(1);
});

it('处理 fragement 子元素', () => {
  const { container, getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <ToggleButtonGroup value="android">
        <>
          <ToggleButton value="web">web</ToggleButton>
        </>
        <>
          <ToggleButton value="android">android</ToggleButton>
          <ToggleButton value="ios">ios</ToggleButton>
        </>
      </ToggleButtonGroup>
    </ThemeProvider>,
  );

  expect(container.querySelectorAll('.sinoui-toggle-button').length).toBe(3);
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

it('初始值为空时多选模式下的值变更', () => {
  const onChange = jest.fn();
  const { getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <ToggleButtonGroup multiple value={undefined} onChange={onChange}>
        <ToggleButton value="web">web</ToggleButton>
        <ToggleButton value="android">android</ToggleButton>
        <ToggleButton value="ios">ios</ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>,
  );
  act(() => {
    fireEvent.click(getByText('ios'));
  });

  expect(onChange).toBeCalledWith(['ios']);
});

it('初始值为字符串多选模式下的值变更', () => {
  const onChange = jest.fn();
  const { getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <ToggleButtonGroup multiple value="web" onChange={onChange}>
        <ToggleButton value="web">web</ToggleButton>
        <ToggleButton value="android">android</ToggleButton>
        <ToggleButton value="ios">ios</ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>,
  );
  act(() => {
    fireEvent.click(getByText('ios'));
  });

  expect(onChange).toBeCalledWith(['web', 'ios']);
});

it('初始值为数组的单选模式下的值变更', () => {
  const onChange = jest.fn();
  const { getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <ToggleButtonGroup value={['web']} onChange={onChange}>
        <ToggleButton value="web">web</ToggleButton>
        <ToggleButton value="android">android</ToggleButton>
        <ToggleButton value="ios">ios</ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>,
  );
  act(() => {
    fireEvent.click(getByText('web'));
  });

  expect(onChange).toBeCalledWith(undefined);
});
