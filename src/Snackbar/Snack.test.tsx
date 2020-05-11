import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import Button from '@sinoui/core/Button';
import Snackbar from './Snackbar';

describe('Snackbar单元测试', () => {
  afterEach(cleanup);
  beforeAll(() =>
    jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect),
  );

  it('自定义class样式', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Snackbar open message="提示信息" className="custom" />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('自定义style样式', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Snackbar open message="提示信息" style={{ marginBottom: '150px' }} />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveStyle('margin-bottom: 150px');
  });

  it('样式类', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Snackbar open leading stacked message="提示信息" />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveClass('sinoui-snackbar--open');
    expect(container.firstChild).toHaveClass('sinoui-snackbar--stacked');
    expect(container.firstChild).toHaveClass('sinoui-snackbar--leading');
  });

  it('自动关闭snackbar', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    render(
      <ThemeProvider theme={defaultTheme}>
        <Snackbar
          data-testid="snackbar"
          open
          message="提示信息"
          onClose={onClose}
        />
      </ThemeProvider>,
    );

    expect(onClose).not.toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(onClose).toHaveBeenCalled();
  });

  it('设置3s自动关闭snackbar', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    render(
      <ThemeProvider theme={defaultTheme}>
        <Snackbar
          data-testid="snackbar"
          open
          duration={3000}
          message="提示信息"
          onClose={onClose}
        />
      </ThemeProvider>,
    );

    expect(onClose).not.toHaveBeenCalled();
    jest.advanceTimersByTime(3000);
    expect(onClose).toHaveBeenCalled();
  });

  it('手动关闭snackbar', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Snackbar
          data-testid="snackbar"
          open
          duration={-1}
          message="提示信息"
          onClose={onClose}
        />
      </ThemeProvider>,
    );

    const actionButton = getByTestId('snackbar').querySelector(
      '.sinoui-snackbar__dismiss > *',
    ) as HTMLElement;
    act(() => {
      fireEvent.click(actionButton);
    });
    expect(onClose).toHaveBeenCalled();
  });

  it('不显示关闭按钮', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Snackbar
          data-testid="snackbar"
          open
          duration={-1}
          message="提示信息"
          showCloseIcon={false}
        />
      </ThemeProvider>,
    );

    expect(
      container.querySelector('.sinoui-snackbar__dismiss'),
    ).not.toBeInTheDocument();
  });
});

describe('Snackbar快照测试', () => {
  it('纯文本不显示', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Snackbar message="消息条文本" />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('纯文本显示', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Snackbar open message="消息条文本" />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('设置自定义时长', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Snackbar open message="消息条文本" duration={3000} />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('不自动消失', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Snackbar open message="消息条文本" duration={-1} />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('居左显示', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Snackbar open duration={-1} message="消息条文本" leading />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('含有操作区域', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Snackbar
            open
            duration={-1}
            message="消息条文本"
            action={
              <Button raised color="error">
                undo
              </Button>
            }
          />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('操作区域换行显示', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Snackbar
            open
            duration={-1}
            leading
            message="消息条文本"
            action={
              <Button raised color="error">
                undo
              </Button>
            }
            stacked
          />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
