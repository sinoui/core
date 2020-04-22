import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getScrollTop, getScrollLeft } from '../domHelpers';

it('获取滚动距离', () => {
  const { container } = render(
    <div
      className="parent"
      style={{ height: 100, width: 100, overflow: 'visible' }}
    >
      <div
        className="child"
        style={{ height: 200, width: 200, overflow: 'visible', margin: 16 }}
      >
        这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本
      </div>
    </div>,
  );

  const parent = container.querySelector('.parent') as HTMLElement;
  const child = container.querySelector('.child') as HTMLElement;
  const scrollTop = getScrollTop(parent, child);

  expect(scrollTop).toBe(0);

  const scrollLeft = getScrollLeft(parent, child);
  expect(scrollLeft).toBe(0);
});
