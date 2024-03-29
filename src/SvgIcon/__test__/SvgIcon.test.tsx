/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { WiDayCloudyGusts } from 'react-icons/wi';
import { render, cleanup } from '@testing-library/react';
import TestWrapper from './TestWrapper';
import SvgIcon from '../SvgIcon';

/**
 * SvgIcon组件快照测试
 */
describe('SvgIcon组件 快照测试', () => {
  it('基本使用', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <SvgIcon>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </SvgIcon>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置图标大小', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <SvgIcon size={28}>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </SvgIcon>
          <SvgIcon size="2rem">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </SvgIcon>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置指定根元素', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <SvgIcon as={WiDayCloudyGusts} />
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置指定标题', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <SvgIcon title="关闭">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </SvgIcon>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置svg可见区域', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <SvgIcon viewBox="0 0 48 48">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </SvgIcon>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置颜色', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <SvgIcon color="primary">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </SvgIcon>
          <SvgIcon color="secondary">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </SvgIcon>
          <SvgIcon color="error">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </SvgIcon>
          <SvgIcon color="warning">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </SvgIcon>
          <SvgIcon color="success">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </SvgIcon>
          <SvgIcon color="info">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </SvgIcon>
          <SvgIcon color="actionActive">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </SvgIcon>
          <SvgIcon color="actionDisabled">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </SvgIcon>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('添加自定义className', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <SvgIcon className="sinoui-svg-icon--img">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </SvgIcon>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('单元测试', () => {
  afterEach(cleanup);

  it('disabledViewBox', () => {
    const CustomIcon = (props: any) => <div {...props} />;
    const { getByTestId } = render(
      <TestWrapper>
        <SvgIcon as={CustomIcon} disabledViewBox data-testid="icon" />
      </TestWrapper>,
    );
    expect(getByTestId('icon')).not.toHaveAttribute('viewBox');
  });

  it('disabledViewBox不会传递给底层组件', () => {
    const CustomIcon = ({ disabledViewBox }: any) => (
      <svg
        viewBox={disabledViewBox ? undefined : '0 0 24 24'}
        data-testid="svg"
      />
    );
    const { getByTestId } = render(
      <TestWrapper>
        <SvgIcon as={CustomIcon} disabledViewBox />
      </TestWrapper>,
    );
    expect(getByTestId('svg')).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('style', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <SvgIcon data-testid="svgicon" style={{ color: 'red' }}>
          <path d="" />
        </SvgIcon>
      </TestWrapper>,
    );

    expect(getByTestId('svgicon')).toHaveStyle('color: red');
  });

  it('ref', () => {
    const svgRef = React.createRef<HTMLOrSVGElement>();
    const { getByTestId } = render(
      <TestWrapper>
        <SvgIcon data-testid="svgicon" style={{ color: 'red' }} ref={svgRef}>
          <path d="" />
        </SvgIcon>
      </TestWrapper>,
    );

    expect(getByTestId('svgicon')).toBe(svgRef.current);
  });
});
