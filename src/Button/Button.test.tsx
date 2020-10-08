import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render, cleanup } from '@testing-library/react';
import Button from './Button';

afterEach(cleanup);

it('正确渲染三种形式按钮', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <>
        <Button>文本按钮</Button>
        <Button outlined>轮廓按钮</Button>
        <Button raised>容器按钮</Button>
      </>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('渲染不可用状态下的三种形式按钮', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <>
        <Button disabled>文本按钮</Button>
        <Button disabled outlined>
          轮廓按钮
        </Button>
        <Button disabled raised>
          容器按钮
        </Button>
      </>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('渲染带图标按钮', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <>
        <Button>
          <svg height="24" viewBox="0 0 24 24" width="24">
            <path
              fill="currentColor"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          icon
        </Button>
        <Button>
          icon
          <svg height="24" viewBox="0 0 24 24" width="24">
            <path
              fill="currentColor"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </Button>
        <Button outlined>
          <svg height="24" viewBox="0 0 24 24" width="24">
            <path
              fill="currentColor"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          icon
        </Button>
        <Button raised>
          <svg height="24" viewBox="0 0 24 24" width="24">
            <path
              fill="currentColor"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          icon
        </Button>
      </>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('指定颜色', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <>
        <Button color="secondary">文本按钮</Button>
        <Button outlined color="secondary">
          轮廓按钮
        </Button>
        <Button raised color="secondary">
          容器按钮
        </Button>
        <Button color="textPrimary">文本按钮</Button>
        <Button outlined color="textPrimary">
          轮廓按钮
        </Button>
        <Button raised color="textPrimary">
          容器按钮
        </Button>
      </>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

describe('className', () => {
  it('文本按钮', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Button data-testid="textButton">文本按钮</Button>
      </ThemeProvider>,
    );

    expect(getByTestId('textButton')).toHaveClass('sinoui-button');
  });

  it('轮廓按钮', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Button data-testid="outlinedButton" outlined>
          轮廓按钮
        </Button>
      </ThemeProvider>,
    );

    expect(getByTestId('outlinedButton')).toHaveClass(
      'sinoui-button',
      'sinoui-button--outlined',
    );
  });

  it('容器按钮', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Button data-testid="raisedButton" raised>
          容器按钮
        </Button>
      </ThemeProvider>,
    );

    expect(getByTestId('raisedButton')).toHaveClass(
      'sinoui-button',
      'sinoui-button--raised',
    );
  });

  it('指定自定义 className', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Button data-testid="customButton" className="x-button">
          自定义按钮
        </Button>
      </ThemeProvider>,
    );

    expect(getByTestId('customButton')).toHaveClass(
      'sinoui-button',
      'x-button',
    );
  });
});
