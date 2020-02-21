import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestWrapper from './TestWrapper';
import CheckboxGroup from '../../CheckboxGroup';
import Checkbox from '../../Checkbox';

/**
 * CheckboxGroup 单元测试
 */
describe('CheckboxGroup 单元测试', () => {
  afterEach(cleanup);

  test('测试children', async () => {
    const { getByTestId } = render(
      <TestWrapper>
        <CheckboxGroup>
          <Checkbox value="1">复选框</Checkbox>
        </CheckboxGroup>
      </TestWrapper>,
    );

    const checkboxGroup = getByTestId('checkboxGroup');
    expect(checkboxGroup).toHaveTextContent('复选框');
  });

  test('测试items', async () => {
    const { getByTestId } = render(
      <TestWrapper>
        <CheckboxGroup
          items={[<Checkbox value="1">复选框</Checkbox>]}
        ></CheckboxGroup>
      </TestWrapper>,
    );

    const checkboxGroup = getByTestId('checkboxGroup');
    expect(checkboxGroup).toHaveTextContent('复选框');
  });
  test('测试复选框不可用', async () => {
    const { container } = render(
      <TestWrapper>
        <CheckboxGroup disabled>
          <Checkbox value="1">复选框</Checkbox>
          <Checkbox value="2">复选框2</Checkbox>
        </CheckboxGroup>
      </TestWrapper>,
    );

    const check = container.querySelectorAll(
      '.sinoui-checkbox-button__disabled',
    );
    expect(check.length).toBe(2);
  });
  test('是否支持全选，全部选中', async () => {
    const { container } = render(
      <TestWrapper>
        <CheckboxGroup enableSelectAll value={['1', '2', '3']}>
          <Checkbox value="1">复选框</Checkbox>
          <Checkbox value="2">复选框2</Checkbox>
          <Checkbox value="3">复选框3</Checkbox>
        </CheckboxGroup>
      </TestWrapper>,
    );

    const check = container.querySelectorAll(
      '.sinoui-checkbox-button__checked',
    );
    expect(check.length).toBe(4);

    const selectAll = container.querySelector(
      '.sinoui-checkboxGroup-selectAll',
    );

    expect(selectAll).toBeTruthy();
  });
  test('是否支持全选，未全部选中', async () => {
    const { container } = render(
      <TestWrapper>
        <CheckboxGroup enableSelectAll value={['1', '2']}>
          <Checkbox value="1">复选框</Checkbox>
          <Checkbox value="2">复选框2</Checkbox>
          <Checkbox value="3">复选框3</Checkbox>
        </CheckboxGroup>
      </TestWrapper>,
    );

    const check = container.querySelectorAll(
      '.sinoui-checkbox-button__checked',
    );
    expect(check.length).toBe(2);
  });
});
