import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectValueDisplay from '../SelectValueDisplay';

afterEach(cleanup);

it('显示空值', () => {
  const { container } = render(<SelectValueDisplay items={[]} />);
  expect(container.querySelector('span')).toHaveTextContent('\u200B');
});

it('显示空数组', () => {
  const { container } = render(<SelectValueDisplay value={[]} items={[]} />);
  expect(container.querySelector('span')).toHaveTextContent('\u200B');
});

it('显示空白字符', () => {
  const { container } = render(<SelectValueDisplay value="  " items={[]} />);
  expect(container.querySelector('span')).toHaveTextContent('\u200B');
});

it('显示单个值', () => {
  const { container } = render(
    <SelectValueDisplay
      value="test1"
      items={[
        { id: '1', value: 'test1', children: '测试1' },
        { id: '2', value: 'test2', children: '测试2' },
      ]}
    />,
  );

  expect(container).toHaveTextContent('测试1');
});

it('显示多个值', () => {
  const { container } = render(
    <SelectValueDisplay
      value={['test1', 'test2']}
      items={[
        { id: '1', value: 'test1', children: '测试1' },
        { id: '2', value: 'test2', children: '测试2' },
        { id: '3', value: 'test3', children: '测试3' },
      ]}
    />,
  );

  expect(container).toHaveTextContent('测试1, 测试2');
});

it('忽略不存在选项的值', () => {
  const { container } = render(
    <SelectValueDisplay
      value={['non-exits-id', 'test1', 'test2']}
      items={[
        { id: '1', value: 'test1', children: '测试1' },
        { id: '2', value: 'test2', children: '测试2' },
        { id: '3', value: 'test3', children: '测试3' },
      ]}
    />,
  );

  expect(container).toHaveTextContent('测试1, 测试2');
});

it('按照值的顺序显示', () => {
  const { container } = render(
    <SelectValueDisplay
      value={['test2', 'test1', 'test3']}
      items={[
        { id: '1', value: 'test1', children: '测试1' },
        { id: '2', value: 'test2', children: '测试2' },
        { id: '3', value: 'test3', children: '测试3' },
      ]}
    />,
  );

  expect(container).toHaveTextContent('测试2, 测试1, 测试3');
});

it('自定义选项的渲染', () => {
  const { getByTestId } = render(
    <SelectValueDisplay
      value="test2"
      items={[
        {
          id: '1',
          value: 'test1',
          children: (
            <div id="test1" data-testid="test1">
              选项1
            </div>
          ),
        },
        {
          id: '2',
          value: 'test2',
          children: (
            <div id="test2" data-testid="test2">
              选项2
            </div>
          ),
        },
        {
          id: '3',
          value: 'test3',
          children: (
            <div id="test2" data-testid="test3">
              选项2
            </div>
          ),
        },
      ]}
    />,
  );

  expect(getByTestId('test2')).toHaveTextContent('选项2');
});
