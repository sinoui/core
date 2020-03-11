import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import Radio from '@sinoui/core/Radio';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

/**
 * Radio组件 单元测试
 */
describe('Radio 单元测试', () => {
  afterEach(cleanup);

  test('测试是否选中', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Radio checked readOnly />
      </ThemeProvider>,
    );
    const test = getByTestId('radio');
    expect(test).toHaveClass('sinoui-radio--checked');
  });

  test('测试是否不可用', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Radio disabled />
      </ThemeProvider>,
    );
    const test = getByTestId('radio');
    expect(test).toHaveClass('sinoui-radio--disabled');
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
