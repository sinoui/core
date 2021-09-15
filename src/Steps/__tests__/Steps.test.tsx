/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Steps from '../Steps';
import Step from '../Step';

afterEach(cleanup);

it('基础渲染', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <Steps current={0}>
        <Step title="第一步" />
        <Step title="第二步" />
        <Step title="第三步" />
      </Steps>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('正确渲染--标签垂直布局', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <Steps current={0} labelPlacement="vertical">
        <Step title="第一步" />
        <Step title="第二步" />
        <Step title="第三步" />
      </Steps>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('正确渲染--垂直方向步进器', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <Steps current={0} direction="vertical">
        <Step title="第一步" />
        <Step title="第二步" />
        <Step title="第三步" />
      </Steps>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('正确渲染--垂直方向步进器且标签垂直布局', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <Steps current={0} direction="vertical" labelPlacement="vertical">
        <Step title="第一步" />
        <Step title="第二步" />
        <Step title="第三步" />
      </Steps>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

describe('classname', () => {
  it('基本使用', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Steps current={0} data-testid="Steps">
          <Step title="第一步" />
          <Step title="第二步" />
          <Step title="第三步" />
        </Steps>
      </ThemeProvider>,
    );

    expect(getByTestId('Steps')).toHaveClass('sinoui-steps');
  });

  it('垂直布局', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Steps current={0} data-testid="Steps" direction="vertical">
          <Step title="第一步" />
          <Step title="第二步" />
          <Step title="第三步" />
        </Steps>
      </ThemeProvider>,
    );

    expect(getByTestId('Steps')).toHaveClass('sinoui-steps--vertical');
  });
});

it('指定onChange属性时，点击单个步进器，onchange被调用', () => {
  const onChange = jest.fn();
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <Steps current={0} data-testid="Steps" onChange={onChange}>
        <Step title="第一步" />
        <Step title="第二步" />
        <Step title="第三步" />
      </Steps>
    </ThemeProvider>,
  );
  const firstStep = container.querySelectorAll('.sinoui-step')[0];

  fireEvent.click(firstStep);

  expect(onChange).toHaveBeenCalled();
});
