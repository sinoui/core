import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import Row from './Row';

describe('布局Row单元测试', () => {
  afterEach(cleanup);
  it('自定义class样式', () => {
    const { container } = render(<Row className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  const gutter = 8;
  it(`gutterType = "between" gutter=${gutter}`, () => {
    const { container } = render(<Row gutter={gutter} />);
    expect(container.firstChild).toHaveStyle(`margin-left: -${gutter / 2}px`);
    expect(container.firstChild).toHaveStyle(`margin-right: -${gutter / 2}px`);
  });

  it(`justifyContent = "center" alignItems="center"`, () => {
    const { container } = render(
      <Row gutter={gutter} justifyContent="center" alignItems="center" />,
    );
    expect(container.firstChild).toHaveStyle('justify-content: center');
    expect(container.firstChild).toHaveStyle('align-items: center');
  });
});
describe('布局Row快照测试', () => {
  it('默认', () => {
    const tree = renderer.create(<Row />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('gutter = 8', () => {
    const tree = renderer.create(<Row gutter={8} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('gutterType = "around"', () => {
    const tree = renderer.create(<Row gutterType="around" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('justifyContent="center"', () => {
    const tree = renderer.create(<Row justifyContent="center" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('justifyContent = "center" alignItems="center"', () => {
    const tree = renderer
      .create(<Row justifyContent="center" alignItems="center" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
