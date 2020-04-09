import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import createFoundation from '../createFoundation';

describe('不同模式应用栏滚动', () => {
  it('固定模式', () => {
    const { container } = render(
      <div style={{ height: '3300px' }}>
        <div>AppBar</div>
      </div>,
    );
    const appBar = container.firstChild as HTMLElement;
    createFoundation({ fixed: true }, window, appBar);

    // 触发滚动事件之前 需要先监听滚动事件
    window.addEventListener('scroll', () => {
      /* some callback */
    });
    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    });
    expect(appBar).toHaveClass('sinoui-top-app-bar--fixed-scrolled');
    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 80 } });
    });
    expect(appBar).not.toHaveClass('sinoui-top-app-bar--fixed-scrolled');
  });

  it('可收缩模式', () => {
    const { container } = render(
      <div style={{ height: '3300px' }}>
        <div>AppBar</div>
      </div>,
    );
    const appBar = container.firstChild as HTMLElement;
    createFoundation({ short: true }, window, appBar);

    // 触发滚动事件之前 需要先监听滚动事件
    window.addEventListener('scroll', () => {
      /* some callback */
    });
    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    });
    expect(appBar).toHaveClass('sinoui-top-app-bar--short-scrolled');
    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 80 } });
    });
    expect(appBar).not.toHaveClass('sinoui-top-app-bar--short-scrolled');
  });

  it('固定突出模式', () => {
    const { container } = render(
      <div style={{ height: '3300px' }}>
        <div>AppBar</div>
      </div>,
    );
    const appBar = container.firstChild as HTMLElement;
    createFoundation({ fixed: true, prominent: true }, window, appBar);

    // 触发滚动事件之前 需要先监听滚动事件
    window.addEventListener('scroll', () => {
      /* some callback */
    });
    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    });
    expect(appBar).toHaveClass('sinoui-top-app-bar--prominent-scrolled');
    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 80 } });
    });
    expect(appBar).not.toHaveClass('sinoui-top-app-bar--prominent-scrolled');
  });

  it('一直收缩模式', () => {
    const { container } = render(
      <div style={{ height: '3300px' }}>
        <div>AppBar</div>
      </div>,
    );
    const appBar = container.firstChild as HTMLElement;
    createFoundation({ short: true }, window, appBar);

    // 触发滚动事件之前 需要先监听滚动事件
    window.addEventListener('scroll', () => {
      /* some callback */
    });
    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    });
    expect(appBar).not.toHaveClass('sinoui-top-app-bar--prominent-scrolled');
    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 80 } });
    });
    expect(appBar).not.toHaveClass('sinoui-top-app-bar--prominent-scrolled');
  });
});
