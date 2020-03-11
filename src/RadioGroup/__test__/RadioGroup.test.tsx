import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import RadioGroup from '@sinoui/core/RadioGroup';
import Radio from '@sinoui/core/Radio';

/**
 * RadioGroup 单元测试
 */

describe('RadioGroup 单元测试', () => {
  afterEach(cleanup);

  test('测试children', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <RadioGroup>
          <Radio value="1">单选框</Radio>
        </RadioGroup>
      </ThemeProvider>,
    );

    const radioGroup = getByTestId('radioGroup');
    expect(radioGroup).toHaveTextContent('单选框');
  });

  test('纵向排列的class类名', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <RadioGroup block>
          <Radio value="1">单选框</Radio>
        </RadioGroup>
      </ThemeProvider>,
    );

    const radioGroup = getByTestId('radioGroup');
    expect(radioGroup).toHaveClass('sinoui-radio-group__block');
  });
});

describe('radioGroup组件 快照测试', () => {
  it('基本使用', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <RadioGroup onChange={(event, value) => console.log(value)} value="3">
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
          <RadioGroup block>
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
