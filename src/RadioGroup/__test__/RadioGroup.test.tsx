import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import RadioGroup from '@sinoui/core/RadioGroup';
import Radio from '@sinoui/core/Radio';
import 'jest-styled-components';

/**
 * RadioGroup 单元测试
 */

describe('RadioGroup 单元测试', () => {
  afterEach(cleanup);

  test('测试children', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <RadioGroup data-testid="radioGroup">
          <Radio value="1">单选框</Radio>
        </RadioGroup>
      </ThemeProvider>,
    );

    const radioGroup = getByTestId('radioGroup');
    expect(radioGroup).toHaveTextContent('单选框');
  });

  it('纵向排列的class类名', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <RadioGroup column data-testid="radioGroup">
          <Radio value="1">单选框</Radio>
        </RadioGroup>
      </ThemeProvider>,
    );
    expect(getByTestId('radioGroup')).toHaveStyleRule('width', '100%', {
      modifier: '> label',
    });
  });

  test('切换选中状态', () => {
    const onChange = jest.fn();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <RadioGroup onChange={onChange} value="3">
          <Radio value="1">单选框1</Radio>
          <Radio value="2">单选框2</Radio>
          <Radio value="3">单选框3</Radio>
          <Radio value="4">单选框4</Radio>
        </RadioGroup>
      </ThemeProvider>,
    );
    const radio = container.querySelectorAll(
      '.sinoui-radio__input',
    )[1] as HTMLElement;

    act(() => {
      fireEvent.click(radio);
    });

    expect(onChange).toHaveBeenCalled();
  });

  it('dense', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <RadioGroup dense data-testid="radiogroup">
          <Radio value="1">单选框1</Radio>
          <Radio value="2">单选框2</Radio>
          <Radio value="3">单选框3</Radio>
          <Radio value="4">单选框4</Radio>
        </RadioGroup>
      </ThemeProvider>,
    );
    expect(getByTestId('radiogroup')).toHaveStyleRule(
      'transform',
      'translate(-7px,0px)',
      {
        modifier: '> label',
      },
    );
  });

  it('测试某个选项不可用', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <RadioGroup>
          <Radio value="1" disabled>
            复选框
          </Radio>
          <Radio value="2">复选框2</Radio>
        </RadioGroup>
      </ThemeProvider>,
    );

    const check = container.querySelectorAll('.sinoui-radio--disabled');
    expect(check.length).toBe(1);
  });

  it('标签在图标左侧显示时，不缩进', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <RadioGroup dense data-testid="radiogroup" labelPosition="left">
          <Radio value="1">单选框1</Radio>
          <Radio value="2">单选框2</Radio>
          <Radio value="3">单选框3</Radio>
          <Radio value="4">单选框4</Radio>
        </RadioGroup>
      </ThemeProvider>,
    );
    expect(getByTestId('radiogroup')).not.toHaveStyleRule(
      'transform',
      'translate(-7px,0px)',
      {
        modifier: '> label',
      },
    );
  });
});

describe('radioGroup组件 快照测试', () => {
  it('基本使用', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <RadioGroup onChange={(value) => console.log(value)} value="3">
            <Radio value="1">单选框1</Radio>
            <Radio value="2">单选框2</Radio>
            <Radio value="3">单选框3</Radio>
            <Radio value="4">单选框4</Radio>
          </RadioGroup>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置纵向排列', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <RadioGroup column>
            <Radio value="1">单选框1</Radio>
            <Radio value="2">单选框2</Radio>
            <Radio value="3">单选框3</Radio>
            <Radio value="4">单选框4</Radio>
          </RadioGroup>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置只读', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <RadioGroup disabled>
            <Radio value="1">单选框1</Radio>
            <Radio value="2">单选框2</Radio>
            <Radio value="3">单选框3</Radio>
            <Radio value="4">单选框4</Radio>
          </RadioGroup>
          <RadioGroup readOnly>
            <Radio value="1">单选框1</Radio>
            <Radio value="2">单选框2</Radio>
            <Radio value="3">单选框3</Radio>
            <Radio value="4">单选框4</Radio>
          </RadioGroup>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置标题显示位置', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <RadioGroup>
            <Radio value="1">单选框1</Radio>
            <Radio value="2">单选框2</Radio>
            <Radio value="3">单选框3</Radio>
          </RadioGroup>
          <RadioGroup labelPosition="left">
            <Radio value="1">单选框1</Radio>
            <Radio value="2">单选框2</Radio>
            <Radio value="3">单选框3</Radio>
          </RadioGroup>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
