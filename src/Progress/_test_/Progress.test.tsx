/**
 * @jest-environment jsdom
 */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Progress from '@sinoui/core/Progress';
import CircleProgress from '../CircleProgress';
import CircleDeterminateProgress from '../CircleDeterminateProgress';
/**
 *  单元测试
 */
describe('Progress', () => {
  afterEach(cleanup);
  it('环形指示器自定义样式', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Progress className="test" style={{ marginTop: '10px' }} />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveClass('test');
    expect(container.firstChild).toHaveStyle('margin-top: 10px');
  });

  it('线性指示器自定义样式', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Progress linear className="test" style={{ marginTop: '10px' }} />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveClass('test');
    expect(container.firstChild).toHaveStyle('margin-top: 10px');
  });

  it('默认为环形不定量进度指示器', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Progress />
      </ThemeProvider>,
    );

    const { container: circleProgressContainer } = render(
      <ThemeProvider theme={defaultTheme}>
        <CircleProgress />
      </ThemeProvider>,
    );

    expect(container.innerHTML).toBe(circleProgressContainer.innerHTML);
    expect(container.firstChild).toHaveStyle('width: 40px');
  });

  it('环形指示器指定大小为80px', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Progress size={80} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveStyle('width: 80px');
  });

  it('环形定量进度指示器', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Progress determinate />
      </ThemeProvider>,
    );

    const { container: circleProgressContainer } = render(
      <ThemeProvider theme={defaultTheme}>
        <CircleDeterminateProgress />
      </ThemeProvider>,
    );

    expect(container.innerHTML).toBe(circleProgressContainer.innerHTML);
  });

  it('指定为线性不定量进度指示器', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Progress linear />
      </ThemeProvider>,
    );
    expect(
      container.querySelector('.sinoui-progress--linear__secondary-bar'),
    ).not.toBeNull();

    expect(container.firstChild).toHaveStyle('height: 4px');
  });

  it('指定为线性常规定量进度指示器', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Progress linear determinate />
      </ThemeProvider>,
    );
    expect(
      container.querySelector('.sinoui-progress--linear__buffer-dots'),
    ).toBeNull();
    expect(
      container.querySelector('.sinoui-progress--linear__secondary-bar'),
    ).toBeNull();
  });

  it('指定为线性缓冲进度指示器', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Progress linear buffer />
      </ThemeProvider>,
    );
    expect(
      container.querySelector('.sinoui-progress--linear__buffer-dots'),
    ).not.toBeNull();
    expect(
      container.querySelector('.sinoui-progress--linear__secondary-bar'),
    ).not.toBeNull();
  });

  it('线性进度指示器指定线条宽度为8px', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Progress linear buffer thickness={8} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveStyle('height: 8px');
  });
});

describe('快照测试', () => {
  it('默认', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Progress />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('环形定量指示器', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Progress determinate />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('线性不定量指示器', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Progress linear />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('线性定量指示器', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Progress linear determinate value={50} />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('线性缓冲指示器', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Progress linear buffer value={50} bufferValue={55} />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
