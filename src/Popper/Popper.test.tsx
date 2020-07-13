/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable no-unused-expressions */
import { render, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import React, { useEffect } from 'react';
import { Instance } from '@popperjs/core';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '@sinoui/theme/defaultTheme';
import Popper from './Popper';
import Modal from '../Modal';

afterEach(cleanup);

jest.useFakeTimers();

it('展现弹出提示', () => {
  const referenceElementRef = React.createRef<HTMLDivElement>();

  const { getByTestId } = render(
    <div>
      <div ref={referenceElementRef}>参考元素</div>
      <Popper
        open
        referenceElement={referenceElementRef}
        data-testid="tooltip"
        portal={false}
      >
        <div data-testid="tooltip-content">这是弹出内容</div>
      </Popper>
    </div>,
  );

  expect(getByTestId('tooltip')).toHaveStyle(
    'position: absolute;top: 0px; left: 0px',
  );
  expect(getByTestId('tooltip-content')).toBeTruthy();
  expect(getByTestId('tooltip').previousElementSibling).toBe(
    referenceElementRef.current,
  );
});

it('关闭弹出提示', () => {
  const referenceElementRef = React.createRef<HTMLDivElement>();

  const { queryByTestId } = render(
    <div>
      <div ref={referenceElementRef}>参考元素</div>
      <Popper
        open={false}
        referenceElement={referenceElementRef}
        data-testid="tooltip"
      >
        <div data-testid="tooltip-content">这是弹出内容</div>
      </Popper>
    </div>,
  );

  expect(queryByTestId('tooltip')).toBeFalsy();
});

it('在传送门中打开弹出提示', () => {
  const referenceElementRef = React.createRef<HTMLDivElement>();

  const { getByTestId } = render(
    <div>
      <div ref={referenceElementRef}>参考元素</div>
      <Popper
        open
        referenceElement={referenceElementRef}
        data-testid="tooltip"
        portal
      >
        <div data-testid="tooltip-content">这是弹出内容</div>
      </Popper>
    </div>,
  );

  expect(getByTestId('tooltip')).toContainElement(
    getByTestId('tooltip-content'),
  );
  expect(getByTestId('tooltip').parentElement).toBe(document.body);
});

it('role="tooltip"', () => {
  const referenceElementRef = React.createRef<HTMLDivElement>();

  const { getByTestId } = render(
    <div>
      <div ref={referenceElementRef}>参考元素</div>
      <Popper open referenceElement={referenceElementRef} data-testid="tooltip">
        <div data-testid="tooltip-content">这是弹出内容</div>
      </Popper>
    </div>,
  );

  expect(getByTestId('tooltip')).toHaveAttribute('role', 'tooltip');
});

it('指定虚拟元素', () => {
  const { getByTestId } = render(
    <Popper
      open
      referenceElement={{
        getBoundingClientRect() {
          return {
            top: 100,
            left: 100,
            bottom: 120,
            right: 110,
            width: 10,
            height: 20,
          };
        },
      }}
      data-testid="tooltip"
    >
      <div>提示内容</div>
    </Popper>,
  );

  expect(getByTestId('tooltip')).toHaveStyle('position: absolute');
});

it('引用popper实例', () => {
  const popperRef = React.createRef<Instance>();
  render(
    <Popper
      open
      referenceElement={document.createElement('div')}
      popperRef={popperRef}
      data-testid="tooltip"
    >
      <div>提示内容</div>
    </Popper>,
  );

  expect(popperRef.current).toBeTruthy();
});

it('卸载组件后，popper会被销毁', () => {
  const popperRef = React.createRef<Instance>();
  const { unmount } = render(
    <Popper
      open
      referenceElement={document.createElement('div')}
      popperRef={popperRef}
      data-testid="tooltip"
    >
      <div>提示内容</div>
    </Popper>,
  );

  const popper = popperRef.current;
  if (popper) jest.spyOn(popper, 'destroy');

  unmount();

  expect(popper?.destroy).toBeCalled();
});

it('卸载组件后，popper引用为null', () => {
  const popperRef = React.createRef<Instance>();
  const { unmount } = render(
    <Popper
      open
      referenceElement={document.createElement('div')}
      popperRef={popperRef}
      data-testid="tooltip"
    >
      <div>提示内容</div>
    </Popper>,
  );

  unmount();

  expect(popperRef.current).toBe(null);
});

it('默认底部居中定位', () => {
  const referenceElement = document.createElement('div');
  const popperRef = React.createRef<Instance>();
  render(
    <Popper
      open
      referenceElement={referenceElement}
      popperRef={popperRef}
      data-testid="tooltip"
    >
      <div>提示内容</div>
    </Popper>,
  );

  expect(popperRef.current?.state.placement).toBe('bottom');
});

it('以动画方式展现弹出提示', () => {
  let handleEnter: Function | undefined;
  let handleExited: Function | undefined;
  const Anim = ({ onEnter, onExited, children }: Record<string, any>) => {
    handleEnter = onEnter;
    handleExited = onExited;

    return <div>{children}</div>;
  };

  const referenceElement = document.createElement('div');
  const { rerender, queryByTestId } = render(
    <Popper
      open={false}
      referenceElement={referenceElement}
      data-testid="tooltip"
    >
      <Anim in={false}>
        <div data-testid="tooltip-content">提示内容</div>
      </Anim>
    </Popper>,
  );

  expect(queryByTestId('tooltip-content')).toBeFalsy();

  rerender(
    <Popper open referenceElement={referenceElement} data-testid="tooltip">
      <Anim in>
        <div data-testid="tooltip-content">提示内容</div>
      </Anim>
    </Popper>,
  );

  expect(queryByTestId('tooltip-content')).toBeTruthy();

  act(() => handleEnter?.());
  rerender(
    <Popper
      open={false}
      referenceElement={referenceElement}
      data-testid="tooltip"
    >
      <Anim in={false}>
        <div data-testid="tooltip-content">提示内容</div>
      </Anim>
    </Popper>,
  );
  // 退场动画还在执行，所以弹出内容存在
  expect(queryByTestId('tooltip-content')).toBeTruthy();

  act(() => handleExited?.());
  // 退场动画结束，所以弹出内容卸载，不存在
  expect(queryByTestId('tooltip-content')).toBeFalsy();
});

it('展现时附带动画效果，动画结束时，更新popper', () => {
  const Anim = ({
    onEnter,
    onEntered,
    onExited,
    in: inProp,
    children,
  }: Record<string, any>) => {
    useEffect(() => {
      if (inProp) {
        onEnter();
        onEntered();
      } else {
        onExited();
      }
    }, [inProp, onEnter, onEntered, onExited]);

    return <div>{children}</div>;
  };

  const referenceElement = document.createElement('div');
  let popper: Instance | null | undefined;
  let spy: jest.SpyInstance | undefined;
  const popperRef = (_popper: Instance | null) => {
    if (_popper && popper !== _popper) {
      spy = jest.spyOn(_popper, 'update');
    }
    popper = _popper;
  };

  render(
    <Popper
      open
      referenceElement={referenceElement}
      popperRef={popperRef}
      data-testid="tooltip"
    >
      <Anim in>
        <div>提示内容</div>
      </Anim>
    </Popper>,
  );

  expect(spy).toBeCalledTimes(2);
});

it('给根元素指定样式', () => {
  const referenceElement = document.createElement('div');
  const { getByTestId } = render(
    <Popper
      open
      referenceElement={referenceElement}
      data-testid="tooltip"
      className="custom-tooltip"
      style={{ height: 100 }}
    >
      <div>提示内容</div>
    </Popper>,
  );

  expect(getByTestId('tooltip')).toHaveClass('custom-tooltip');
  expect(getByTestId('tooltip')).toHaveStyle('height: 100px');
});

it('ref 指向根元素', () => {
  const ref = React.createRef<HTMLDivElement>();
  const { getByTestId } = render(
    <Popper
      open
      referenceElement={document.createElement('div')}
      data-testid="tooltip"
      ref={ref}
    >
      <div>提示内容</div>
    </Popper>,
  );
  expect(ref.current).toBe(getByTestId('tooltip'));
});

it('重绘组件时，更新popper', () => {
  const referenceElement = document.createElement('div');
  let popper: Instance | null | undefined;
  let spy: jest.SpyInstance | undefined;
  const popperRef = (_popper: Instance | null) => {
    if (_popper && popper !== _popper) {
      spy = jest.spyOn(_popper, 'update');
    }
    popper = _popper;
  };

  const { rerender } = render(
    <Popper
      open
      referenceElement={referenceElement}
      popperRef={popperRef}
      data-testid="tooltip"
    >
      提示内容
    </Popper>,
  );

  rerender(
    <Popper
      open
      referenceElement={referenceElement}
      popperRef={popperRef}
      data-testid="tooltip"
    >
      提示内容
    </Popper>,
  );

  expect(spy).toBeCalledTimes(2);
});

it('在Modal上弹出Popper，并自动获取焦点', () => {
  const buttonRef = React.createRef<HTMLButtonElement>();
  const { getByTestId, rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <Modal open>
        <div>
          <button type="button" ref={buttonRef}>
            打开弹层
          </button>
          <Popper open={false} referenceElement={buttonRef}>
            <input autoFocus data-testid="input" />
          </Popper>
        </div>
      </Modal>
    </ThemeProvider>,
  );

  jest.runAllTimers();

  rerender(
    <ThemeProvider theme={defaultTheme}>
      <Modal open>
        <div>
          <button type="button" ref={buttonRef}>
            打开弹层
          </button>
          <Popper open referenceElement={buttonRef}>
            <input autoFocus data-testid="input" />
          </Popper>
        </div>
      </Modal>
    </ThemeProvider>,
  );

  jest.runAllTimers();

  expect(document.activeElement).toBe(getByTestId('input'));
});

it('传送门情况下的默认z-index', () => {
  const referenceElement = document.createElement('div');
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Popper open referenceElement={referenceElement} data-testid="popper">
        <input />
      </Popper>
    </ThemeProvider>,
  );

  expect(getByTestId('popper')).toHaveStyle('z-index: 1300');
});

it('指定z-index', () => {
  const referenceElement = document.createElement('div');
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Popper
        open
        referenceElement={referenceElement}
        data-testid="popper"
        zIndex={100}
      >
        <input />
      </Popper>
    </ThemeProvider>,
  );

  expect(getByTestId('popper')).toHaveStyle('z-index: 100');
});

it('非传送门，没有默认的z-index', () => {
  const referenceElement = document.createElement('div');
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Popper
        open
        referenceElement={referenceElement}
        data-testid="popper"
        portal={false}
      >
        <input />
      </Popper>
    </ThemeProvider>,
  );

  expect(getByTestId('popper')).not.toHaveStyle('z-index: 1300');
});

it('autoFocus', () => {
  const referenceElement = document.createElement('div');
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Popper
        open
        referenceElement={referenceElement}
        data-testid="popper"
        zIndex={100}
        autoFocus
        tabIndex={0}
      >
        <input />
      </Popper>
    </ThemeProvider>,
  );

  expect(document.activeElement).toBe(getByTestId('popper'));
});
