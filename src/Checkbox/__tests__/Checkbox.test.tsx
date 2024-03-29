/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import '@testing-library/jest-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Checkbox from '@sinoui/core/Checkbox';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';

describe('Checkbox 单元测试', () => {
  afterEach(cleanup);

  test('是否选中', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Checkbox checked readOnly data-testid="checkbox" />
      </ThemeProvider>,
    );
    const check = getByTestId('checkbox');

    expect(check).toHaveClass('sinoui-checkbox--checked');
  });

  test('是否为部分选择状态', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Checkbox indeterminate data-testid="checkbox" />
      </ThemeProvider>,
    );
    const check = getByTestId('checkbox');

    expect(check).toHaveClass('sinoui-checkbox--indeterminate');
  });

  test('是否为不可用状态', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Checkbox disabled data-testid="checkbox" />
      </ThemeProvider>,
    );
    const check = getByTestId('checkbox');

    expect(check).toHaveClass('sinoui-checkbox--disabled');
  });

  it('切换选中状态', () => {
    const onChange = jest.fn();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Checkbox indeterminate onChange={onChange} />
      </ThemeProvider>,
    );

    const checkboxInput = container.querySelector(
      '.sinoui-checkbox__input',
    ) as HTMLElement;

    expect(checkboxInput).not.toBeChecked();

    act(() => {
      fireEvent.change(checkboxInput, {
        target: {
          checked: true,
        },
      });
    });

    expect(checkboxInput).toBeChecked();
  });
});

describe('Checkbox组件 快照测试', () => {
  it('基本使用', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox />
          <Checkbox checked />
          <Checkbox indeterminate />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('带有文字复选框', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox>爱好1</Checkbox>
          <Checkbox checked>爱好2</Checkbox>
          <Checkbox>爱好3</Checkbox>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置只读', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox disabled />
          <Checkbox readOnly />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('指定颜色', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox checked color="primary" />
          <Checkbox checked color="secondary" />
          <Checkbox checked color="error" />
          <Checkbox checked color="warning" />
          <Checkbox checked color="success" />
          <Checkbox checked color="info" />
          <Checkbox checked color="actionActive" />
          <Checkbox checked color="actionDisabled" />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
