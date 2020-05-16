/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/tabindex-no-positive */
import React from 'react';
import { render, cleanup, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '@sinoui/theme/defaultTheme';
import Grow from '@sinoui/core/Grow';
import Modal from '../Modal';

afterEach(cleanup);

jest.useFakeTimers();

it('打开模态框', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Modal open>
        <div data-testid="content">内容</div>
      </Modal>
    </ThemeProvider>,
  );

  expect(getByTestId('content')).toBeInTheDocument();
});

it('关闭模态框', () => {
  const { queryByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Modal open={false}>
        <div data-testid="content">内容</div>
      </Modal>
    </ThemeProvider>,
  );

  expect(queryByTestId('content')).toBe(null);
});

describe('在指定容器中显示模态框', () => {
  it('DOM元素', () => {
    const container = document.createElement('div');
    document.body.append(container);

    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open container={container}>
          <div data-testid="content" />
        </Modal>
      </ThemeProvider>,
    );

    expect(container).toContainElement(getByTestId('content'));
  });

  it('ref', () => {
    const container = document.createElement('div');
    document.body.append(container);
    const containerRef = React.createRef<
      HTMLElement
    >() as React.MutableRefObject<HTMLElement>;
    containerRef.current = container;

    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open container={containerRef}>
          <div data-testid="content" />
        </Modal>
      </ThemeProvider>,
    );

    expect(container).toContainElement(getByTestId('content'));
  });

  it('ref为空', () => {
    const containerRef = React.createRef<
      HTMLElement
    >() as React.MutableRefObject<HTMLElement>;

    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open container={containerRef}>
          <div data-testid="content" />
        </Modal>
      </ThemeProvider>,
    );

    expect(getByTestId('content')).toBeInTheDocument();
  });

  it('() => dom元素', () => {
    const container = document.createElement('div');
    document.body.append(container);

    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open container={() => container}>
          <div data-testid="content" />
        </Modal>
      </ThemeProvider>,
    );

    expect(container).toContainElement(getByTestId('content'));
  });

  it('() => ref', () => {
    const container = document.createElement('div');
    document.body.append(container);
    const containerRef = React.createRef<
      HTMLElement
    >() as React.MutableRefObject<HTMLElement>;
    containerRef.current = container;

    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open container={() => containerRef}>
          <div data-testid="content" />
        </Modal>
      </ThemeProvider>,
    );

    expect(container).toContainElement(getByTestId('content'));
  });

  it('() => null', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open container={() => null}>
          <div data-testid="content" />
        </Modal>
      </ThemeProvider>,
    );

    expect(getByTestId('content')).toBeInTheDocument();
  });
});

describe('backdrop', () => {
  it('默认渲染遮罩层', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open>
          <div />
        </Modal>
      </ThemeProvider>,
    );

    expect(getByTestId('sinoui-modal-backdrop')).toBeTruthy();
  });

  it('backdrop = false时不渲染遮罩层', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open backdrop={false}>
          <div />
        </Modal>
      </ThemeProvider>,
    );

    expect(queryByTestId('sinoui-modal-backdrop')).toBeFalsy();
  });

  it('点击遮罩层，调用onClose回调函数', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open onClose={onClose}>
          <div />
        </Modal>
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.click(getByTestId('sinoui-modal-backdrop'));
    });

    expect(onClose).toBeCalledWith('backdropClick');
  });

  it('backdropClick = false时，点击遮罩层不调用onClose', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open onClose={onClose} backdropClick={false}>
          <div />
        </Modal>
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.click(getByTestId('sinoui-modal-backdrop'));
    });

    expect(onClose).not.toBeCalled();
  });

  it('监听遮罩层的点击事件', () => {
    const onBackdropClick = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open onBackdropClick={onBackdropClick}>
          <div />
        </Modal>
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.click(getByTestId('sinoui-modal-backdrop'));
    });

    expect(onBackdropClick).toBeCalled();
  });

  it('设置遮罩层透明度', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open backdropOpacity={0.05}>
          <div />
        </Modal>
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.click(getByTestId('sinoui-modal-backdrop'));
    });

    expect(getByTestId('sinoui-modal-backdrop')).toHaveStyle(
      'background-color: rgba(0,0,0,0.05)',
    );
  });

  it('BackdropProps', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal
          open
          BackdropProps={{
            id: 'backdrop',
          }}
        >
          <div />
        </Modal>
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.click(getByTestId('sinoui-modal-backdrop'));
    });

    expect(getByTestId('sinoui-modal-backdrop')).toHaveAttribute(
      'id',
      'backdrop',
    );
  });

  it('renderBackdrop', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal
          open
          renderBackdrop={({ zIndex, ...props }) => (
            <div {...props}>遮罩层</div>
          )}
        >
          <div />
        </Modal>
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.click(getByTestId('sinoui-modal-backdrop'));
    });

    expect(getByTestId('sinoui-modal-backdrop')).toHaveTextContent('遮罩层');
  });
});

describe('animate', () => {
  it('子元素应用了过渡，关闭模态框时，不立即卸载子元素', () => {
    const { getByTestId, rerender } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open>
          <Grow in>
            <div data-testid="content" />
          </Grow>
        </Modal>
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <Modal open={false}>
          <Grow in={false}>
            <div data-testid="content" />
          </Grow>
        </Modal>
      </ThemeProvider>,
    );

    expect(getByTestId('content')).toBeTruthy();
  });

  it('关闭带过渡效果的模态框，过渡结束后卸载子元素', () => {
    const { container, rerender } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open>
          <Grow in>
            <div data-testid="content" />
          </Grow>
        </Modal>
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <Modal open={false}>
          <Grow in={false}>
            <div data-testid="content" />
          </Grow>
        </Modal>
      </ThemeProvider>,
    );

    // 执行过渡定时器，相当于过渡结束
    jest.runAllTimers();
    // 卸载后，容器不包含任何元素
    expect(container).toBeEmpty();
  });

  it('关闭带过渡效果模态框后能够正常打开模态框', () => {
    const { getByTestId, rerender } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open>
          <Grow in>
            <div data-testid="content" />
          </Grow>
        </Modal>
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <Modal open={false}>
          <Grow in={false}>
            <div data-testid="content" />
          </Grow>
        </Modal>
      </ThemeProvider>,
    );
    jest.runAllTimers();

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <Modal open>
          <Grow in>
            <div data-testid="content" />
          </Grow>
        </Modal>
      </ThemeProvider>,
    );
    expect(getByTestId('content')).toBeTruthy();
  });

  it('onEneter & onExited', () => {
    const onEnter = jest.fn();
    const onExited = jest.fn();
    const { rerender } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open>
          <Grow in onEnter={onEnter} onExited={onExited}>
            <div />
          </Grow>
        </Modal>
      </ThemeProvider>,
    );

    expect(onEnter).toBeCalled();

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <Modal open={false}>
          <Grow in={false} onEnter={onEnter} onExited={onExited}>
            <div />
          </Grow>
        </Modal>
      </ThemeProvider>,
    );

    jest.runAllTimers();

    expect(onExited).toBeCalled();
  });
});

it('tabIndex默认为-1', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Modal open>
        <Grow in>
          <div data-testid="content" />
        </Grow>
      </Modal>
    </ThemeProvider>,
  );

  expect(getByTestId('content')).toHaveAttribute('tabIndex', '-1');
});

describe('keyboard', () => {
  it('按下Escape键退出模态框', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open data-testid="modal" onClose={onClose}>
          <Grow in>
            <div data-testid="content" />
          </Grow>
        </Modal>
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.keyDown(getByTestId('modal'), {
        key: 'Escape',
        code: 'Escape',
      });
    });

    expect(onClose).toBeCalled();
  });

  it('keyboard = false，阻止Escape键关闭模态框', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open data-testid="modal" onClose={onClose} keyboard={false}>
          <Grow in>
            <div data-testid="content" />
          </Grow>
        </Modal>
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.keyDown(getByTestId('modal'), {
        key: 'Escape',
        code: 'Escape',
      });
    });

    expect(onClose).not.toBeCalled();
  });

  it('onEscapeKeydown', () => {
    const onEscapeKeydown = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open data-testid="modal" onEscapeKeydown={onEscapeKeydown}>
          <Grow in>
            <div data-testid="content" />
          </Grow>
        </Modal>
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.keyDown(getByTestId('modal'), {
        key: 'Escape',
        code: 'Escape',
      });
    });

    expect(onEscapeKeydown).toBeCalled();
  });
});

describe('焦点管理', () => {
  it('自动聚焦', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open data-testid="modal">
          <Grow in>
            <div data-testid="content" />
          </Grow>
        </Modal>
      </ThemeProvider>,
    );

    expect(document.activeElement).toBe(getByTestId('content'));
  });

  it('模态框中包含了自动聚焦的输入框', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open data-testid="modal">
          <Grow in>
            <div data-testid="content">
              <input type="text" autoFocus data-testid="input" />
            </div>
          </Grow>
        </Modal>
      </ThemeProvider>,
    );

    expect(document.activeElement).toBe(getByTestId('input'));
  });

  it('autoFocus = false', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open data-testid="modal" autoFocus={false}>
          <Grow in>
            <div data-testid="content" />
          </Grow>
        </Modal>
      </ThemeProvider>,
    );

    expect(document.activeElement).not.toBe(getByTestId('content'));
  });

  it('关闭模态框，将焦点还原给之前的焦点元素', () => {
    const modalManager = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      add() {},
      isTopModal() {
        return true;
      },
      remove() {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        getByTestId('input').focus();
      },
    } as any;
    const { getByTestId, rerender } = render(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <input data-testid="input" autoFocus />
          <Modal open data-testid="modal" modalManager={modalManager}>
            <div data-testid="content" />
          </Modal>
        </div>
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <input data-testid="input" autoFocus />
          <Modal open={false} data-testid="modal" modalManager={modalManager}>
            <div data-testid="content" />
          </Modal>
        </div>
      </ThemeProvider>,
    );

    jest.runAllTimers();

    expect(document.activeElement).toBe(getByTestId('input'));
  });

  it('卸载模态框时，将焦点还原给之前的焦点元素', () => {
    const modalManager = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      add() {},
      isTopModal() {
        return true;
      },
      remove() {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        getByTestId('input').focus();
      },
    } as any;

    const { getByTestId, rerender } = render(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <input data-testid="input" autoFocus />
          <Modal open data-testid="modal" modalManager={modalManager}>
            <div data-testid="content" />
          </Modal>
        </div>
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <div>
          <input data-testid="input" autoFocus />
        </div>
      </ThemeProvider>,
    );

    jest.runAllTimers();

    expect(document.activeElement).toBe(getByTestId('input'));
  });

  it('阻止焦点移出模态框', () => {
    const add = jest.fn();
    const modalManager = {
      add,
      isTopModal() {
        return true;
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      remove() {},
    } as any;
    render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open data-testid="modal" modalManager={modalManager}>
          <div data-testid="content" />
        </Modal>
      </ThemeProvider>,
    );
    expect(add.mock.calls[0][0].enforceFocus).toBe(true);
  });

  it('enforceFocus = false 时，焦点可以移出模态框', () => {
    const add = jest.fn();
    const modalManager = {
      add,
      isTopModal() {
        return true;
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      remove() {},
    } as any;
    render(
      <ThemeProvider theme={defaultTheme}>
        <Modal
          open
          data-testid="modal"
          enforceFocus={false}
          modalManager={modalManager}
        >
          <div data-testid="content" />
        </Modal>
      </ThemeProvider>,
    );
    expect(add.mock.calls[0][0].enforceFocus).toBe(false);
  });
});

describe('scrollLock', () => {
  it('默认锁定页面', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open>
          <div />
        </Modal>
      </ThemeProvider>,
    );

    expect(document.body).toHaveStyle('overflow: hidden');
  });

  it('关闭模态框，解除页面滚动锁定', () => {
    const { rerender } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open>
          <div />
        </Modal>
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <Modal open={false}>
          <div />
        </Modal>
      </ThemeProvider>,
    );

    expect(document.body).not.toHaveStyle('overflow: hidden');
  });

  it('卸载模态框时，解除页面滚动锁定', () => {
    const { rerender } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open>
          <div />
        </Modal>
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <div />
      </ThemeProvider>,
    );

    expect(document.body).not.toHaveStyle('overflow: hidden');
  });

  it('scrollLock = false', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open scrollLock={false}>
          <div />
        </Modal>
      </ThemeProvider>,
    );

    expect(document.body).not.toHaveStyle('overflow: hidden');
  });
});

describe('可访问性', () => {
  it('aria-modal', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open scrollLock={false}>
          <div data-testid="dialog" />
        </Modal>
      </ThemeProvider>,
    );

    expect(getByTestId('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('打开模态框时，容器内其它元素aria-hidden设置为hidden', () => {
    const content = document.createElement('div');
    document.body.append(content);

    render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open scrollLock={false}>
          <div data-testid="dialog" />
        </Modal>
      </ThemeProvider>,
    );

    expect(content).toHaveAttribute('aria-hidden', 'true');
  });

  it('隐藏模态框时删除容器内其它元素aria-hidden', () => {
    const content = document.createElement('div');
    document.body.append(content);

    const { rerender } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open scrollLock={false}>
          <div data-testid="dialog" />
        </Modal>
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <Modal open={false} scrollLock={false}>
          <div data-testid="dialog" />
        </Modal>
      </ThemeProvider>,
    );

    expect(content).not.toHaveAttribute('aria-hidden');
  });

  it('遮罩层的aria-hidden为true', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open scrollLock={false}>
          <div data-testid="dialog" />
        </Modal>
      </ThemeProvider>,
    );

    expect(getByTestId('sinoui-modal-backdrop')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('dialog示例', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open scrollLock={false}>
          <div
            data-testid="dialog"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-content"
          >
            <div role="document">
              <h4 id="modal-title">模态框标题</h4>
              <p id="modal-content">模态框内容</p>
            </div>
          </div>
        </Modal>
      </ThemeProvider>,
    );
  });
});
