import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import CheckboxGroup from '@sinoui/core/CheckboxGroup';
import Checkbox from '@sinoui/core/Checkbox';

/**
 * CheckboxGroup 单元测试
 */
describe('CheckboxGroup 单元测试', () => {
  afterEach(cleanup);

  test('测试children', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <CheckboxGroup data-testid="checkboxGroup">
          <Checkbox value="1">复选框</Checkbox>
        </CheckboxGroup>
      </ThemeProvider>,
    );

    const checkboxGroup = getByTestId('checkboxGroup');
    expect(checkboxGroup).toHaveTextContent('复选框');
  });

  test('测试items', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <CheckboxGroup
          items={[<Checkbox value="1">复选框</Checkbox>]}
          data-testid="checkboxGroup"
        />
      </ThemeProvider>,
    );

    const checkboxGroup = getByTestId('checkboxGroup');
    expect(checkboxGroup).toHaveTextContent('复选框');
  });
  test('测试复选框不可用', async () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <CheckboxGroup disabled>
          <Checkbox value="1">复选框</Checkbox>
          <Checkbox value="2">复选框2</Checkbox>
        </CheckboxGroup>
      </ThemeProvider>,
    );

    const check = container.querySelectorAll('.sinoui-checkbox--disabled');
    expect(check.length).toBe(2);
  });
  test('是否支持全选，全部选中', async () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <CheckboxGroup enableSelectAll value={['1', '2', '3']}>
          <Checkbox value="1">复选框</Checkbox>
          <Checkbox value="2">复选框2</Checkbox>
          <Checkbox value="3">复选框3</Checkbox>
        </CheckboxGroup>
      </ThemeProvider>,
    );

    const check = container.querySelectorAll('.sinoui-checkbox--checked');
    expect(check.length).toBe(4);

    const selectAll = container.querySelector(
      '.sinoui-checkboxGroup-selectAll',
    );

    expect(selectAll).toBeTruthy();
  });
  test('是否支持全选，未全部选中', async () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <CheckboxGroup enableSelectAll value={['1', '2']}>
          <Checkbox value="1">复选框</Checkbox>
          <Checkbox value="2">复选框2</Checkbox>
          <Checkbox value="3">复选框3</Checkbox>
        </CheckboxGroup>
      </ThemeProvider>,
    );

    const check = container.querySelectorAll('.sinoui-checkbox--checked');
    expect(check.length).toBe(2);
  });
});

describe('CheckboxGroup组件 快照测试', () => {
  it('基本使用', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <CheckboxGroup
            onChange={(value) => console.log(value)}
            value={['2', '3']}
          >
            <Checkbox value="1">复选框1</Checkbox>
            <Checkbox value="2">复选框2</Checkbox>
            <Checkbox value="3">复选框3</Checkbox>
            <Checkbox value="4">复选框4</Checkbox>
          </CheckboxGroup>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置items属性', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <CheckboxGroup
            onChange={(value) => console.log(value)}
            items={[
              <Checkbox value="1">复选框1</Checkbox>,
              <Checkbox value="2">复选框2</Checkbox>,
              <Checkbox value="3">复选框3</Checkbox>,
              <Checkbox value="4">复选框4</Checkbox>,
            ]}
          />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置是否支持全选', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <CheckboxGroup
            enableSelectAll
            onChange={(value) => console.log(value)}
          >
            <Checkbox value="1">复选框1</Checkbox>
            <Checkbox value="2">复选框2</Checkbox>
            <Checkbox value="3">复选框3</Checkbox>
            <Checkbox value="4">复选框4</Checkbox>
          </CheckboxGroup>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置不可用', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <p>不可用:</p>
          <CheckboxGroup disabled>
            <Checkbox value="1">复选框1</Checkbox>
            <Checkbox value="2">复选框2</Checkbox>
          </CheckboxGroup>
          <p>只读:</p>
          <CheckboxGroup readOnly>
            <Checkbox value="1">复选框1</Checkbox>
            <Checkbox value="2">复选框2</Checkbox>
          </CheckboxGroup>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置是否纵向显示', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <CheckboxGroup column>
            <Checkbox value="1">复选框1</Checkbox>
            <Checkbox value="2">复选框2</Checkbox>
          </CheckboxGroup>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置标题显示位置', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <>
            <p>标题显示在右侧：</p>
            <CheckboxGroup>
              <Checkbox value="1">复选框1</Checkbox>
              <Checkbox value="2">复选框2</Checkbox>
            </CheckboxGroup>
            <p>标题显示在左侧：</p>
            <CheckboxGroup labelPosition="left">
              <Checkbox value="1">复选框1</Checkbox>
              <Checkbox value="2">复选框2</Checkbox>
            </CheckboxGroup>
          </>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置网格对齐布局默认3列', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <>
            <p>默认：</p>
            <CheckboxGroup gridLayout>
              <Checkbox value="1">复选框1</Checkbox>
              <Checkbox value="2">复选框2</Checkbox>
              <Checkbox value="3">复选框3</Checkbox>
              <Checkbox value="4">复选框4</Checkbox>
              <Checkbox value="5">复选框5</Checkbox>
            </CheckboxGroup>
            <p>设置colums为4：</p>
            <CheckboxGroup gridLayout columns={4}>
              <Checkbox value="1">复选框1</Checkbox>
              <Checkbox value="2">复选框2</Checkbox>
              <Checkbox value="3">复选框3</Checkbox>
              <Checkbox value="4">复选框4</Checkbox>
              <Checkbox value="5">复选框5</Checkbox>
            </CheckboxGroup>
          </>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
