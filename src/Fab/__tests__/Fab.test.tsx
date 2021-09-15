/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MdAdd } from 'react-icons/md';
import TestWrapper from './TestWrapper';
import Fab from '../Fab';

/**
 * Fab组件 测试
 */

describe('Fab组件 单元测试', () => {
  test('extended状态下class类名', () => {
    const { container } = render(
      <TestWrapper>
        <Fab extended>按钮</Fab>
      </TestWrapper>,
    );

    const fab = container.firstChild;

    expect(fab && fab.firstChild).toHaveClass('sinoui-fab--extended');
  });
  test('mini状态下class类名', () => {
    const { container } = render(
      <TestWrapper>
        <Fab mini>按钮</Fab>
      </TestWrapper>,
    );

    const fab = container.firstChild;

    expect(fab && fab.firstChild).toHaveClass('sinoui-fab--mini');
  });
  test('disabled状态下class类名', () => {
    const { container } = render(
      <TestWrapper>
        <Fab disabled>按钮</Fab>
      </TestWrapper>,
    );

    const fab = container.firstChild;

    expect(fab && fab.firstChild).toHaveClass('sinoui-fab--disabled');
  });
});

describe('Fab组件 快照测试', () => {
  it('基本使用', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Fab>
            <MdAdd />
          </Fab>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置较小显示', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Fab mini>
            <MdAdd />
          </Fab>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置不可用状态', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Fab disabled>
            <MdAdd />
          </Fab>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置扩展样式', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Fab extended>
            <MdAdd />
          </Fab>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('指定不同颜色', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Fab color="primary">
            <MdAdd />
          </Fab>
          <Fab color="secondary">
            <MdAdd />
          </Fab>
          <Fab color="error">
            <MdAdd />
          </Fab>
          <Fab color="warning">
            <MdAdd />
          </Fab>
          <Fab color="info">
            <MdAdd />
          </Fab>
          <Fab color="success">
            <MdAdd />
          </Fab>
          <Fab color="actionActive">
            <MdAdd />
          </Fab>
          <Fab color="actionDisabled">
            <MdAdd />
          </Fab>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
