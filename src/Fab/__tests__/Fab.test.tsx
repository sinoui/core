import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { MdAdd } from 'react-icons/md';
import TestWrapper from './TestWrapper';
import Fab from '../Fab';

/**
 * Fab组件 测试
 */
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
});
