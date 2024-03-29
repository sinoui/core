/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { render, cleanup, act, fireEvent } from '@testing-library/react';
import Radio from '@sinoui/core/Radio';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';

/**
 * Radio组件 单元测试
 */
describe('Radio 单元测试', () => {
  afterEach(cleanup);

  test('测试是否选中', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Radio checked readOnly data-testid="radio" />
      </ThemeProvider>,
    );
    const test = getByTestId('radio');
    expect(test).toHaveClass('sinoui-radio--checked');
  });

  test('测试是否不可用', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Radio disabled data-testid="radio" />
      </ThemeProvider>,
    );
    const test = getByTestId('radio');
    expect(test).toHaveClass('sinoui-radio--disabled');
  });

  it('点击选中，onChange被调用', () => {
    const onChange = jest.fn();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Radio data-testid="radio" value="" onChange={onChange} />
      </ThemeProvider>,
    );

    const radioInput = container.querySelector(
      '.sinoui-radio__input',
    ) as HTMLInputElement;

    act(() => {
      fireEvent.click(radioInput);
    });

    expect(onChange).toHaveBeenCalled();
  });
});

describe('Radio组件 快照测试', () => {
  it('基本使用', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Radio />
          <Radio checked />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('带文字单选框', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Radio>单选框1</Radio>
          <Radio checked>单选框2</Radio>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置只读', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Radio disabled>单选框1</Radio>
          <Radio readOnly>单选框2</Radio>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('指定颜色', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Radio disabled>单选框1</Radio>
          <Radio checked color="primary" />
          <Radio checked color="secondary" />
          <Radio checked color="error" />
          <Radio checked color="warning" />
          <Radio checked color="success" />
          <Radio checked color="info" />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
