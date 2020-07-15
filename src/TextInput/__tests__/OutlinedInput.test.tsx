import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { render } from '@testing-library/react';
import OutlinedInput from '../OutlinedInput';

it('正确渲染边框模式下的Input', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <OutlinedInput />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染不可用状态下边框模式的Input', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <OutlinedInput disabled />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染错误状态下边框模式的Input', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <OutlinedInput error notched />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('聚焦状态', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <OutlinedInput focused />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('无标签', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <OutlinedInput noLabel />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('渲染密集状态下边框模式的Input', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <>
          <OutlinedInput dense />
          <OutlinedInput dense noLabel />
        </>
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('获取缺口大小', () => {
  const labelRef = React.createRef<HTMLLabelElement>();
  (labelRef as any).current = {
    clientWidth: 100,
  };

  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <OutlinedInput labelRef={labelRef} data-testid="input" />
    </ThemeProvider>,
  );

  expect(
    getByTestId('input').querySelector('.sinoui-notched-outline__notch'),
  ).toHaveStyle('width: 75px');
});

it('有值时获取缺口大小', () => {
  const labelRef = React.createRef<HTMLLabelElement>();
  (labelRef as any).current = {
    clientWidth: 100,
  };

  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <OutlinedInput labelRef={labelRef} data-testid="input" value="test" />
    </ThemeProvider>,
  );

  expect(
    getByTestId('input').querySelector('.sinoui-notched-outline__notch'),
  ).toHaveStyle('width: 75px');
});
