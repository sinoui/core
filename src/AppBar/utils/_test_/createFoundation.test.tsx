import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import createFoundation from '../createFoundation';
import createDOMAdapter from '../createDOMAdapter';

/**
 * 获取应用栏
 * @param container
 */
const getAppBarDom = (container: any) => {
  return container.querySelector('#appBar') as HTMLElement;
};

describe('不同模式应用栏滚动', () => {
  it('固定模式', () => {
    const { container } = render(
      <div style={{ height: '3300px' }}>
        <div id="appBar">AppBar</div>
      </div>,
    );
    const appBar = getAppBarDom(container);
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
        <div id="appBar">AppBar</div>
      </div>,
    );
    const appBar = getAppBarDom(container);
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
      fireEvent.scroll(window, { target: { pageYOffset: 0 } });
    });
    expect(appBar).not.toHaveClass('sinoui-top-app-bar--short-scrolled');
  });

  it('固定突出模式', () => {
    const { container } = render(
      <div style={{ height: '3300px' }}>
        <div id="appBar">AppBar</div>
      </div>,
    );
    const appBar = getAppBarDom(container);
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
      fireEvent.scroll(window, { target: { pageYOffset: 0 } });
    });
    expect(appBar).not.toHaveClass('sinoui-top-app-bar--prominent-scrolled');
  });

  it('一直收缩模式', () => {
    const { container } = render(
      <div style={{ height: '3300px' }}>
        <div id="appBar">AppBar</div>
      </div>,
    );
    const appBar = getAppBarDom(container);
    createFoundation({ shortCollapsed: true }, window, appBar);

    // 触发滚动事件之前 需要先监听滚动事件
    window.addEventListener('scroll', () => {
      /* some callback */
    });
    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    });
    console.log(appBar.outerHTML);
    expect(appBar).toHaveStyle('top:0px');
    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 0 } });
    });
    expect(appBar).toHaveStyle('top:0px');
  });

  it('标准模式', () => {
    const { container } = render(
      <div style={{ height: '3300px' }}>
        <div id="appBar">AppBar</div>
      </div>,
    );
    const appBar = getAppBarDom(container);
    createFoundation({}, window, appBar);
    const adapter = createDOMAdapter(window, appBar);
    // 触发滚动事件之前 需要先监听滚动事件
    window.addEventListener('scroll', () => {
      /* some callback */
    });
    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    });
    expect(appBar).toHaveStyle(`top:-${adapter.getTopAppBarTopOffset()}px`);
    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 80 } });
    });
    expect(appBar).toHaveStyle(`top:0px`);
  });

  it('突出紧凑模式', () => {
    const { container } = render(
      <div style={{ height: '3300px' }}>
        <div id="appBar">AppBar</div>
      </div>,
    );
    const appBar = getAppBarDom(container);
    createFoundation({ prominent: true, dense: true }, window, appBar);
    const adapter = createDOMAdapter(window, appBar);
    // 触发滚动事件之前 需要先监听滚动事件
    window.addEventListener('scroll', () => {
      /* some callback */
    });
    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    });
    expect(appBar).toHaveStyle(`top:-${adapter.getTopAppBarTopOffset()}px`);
    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 80 } });
    });
    expect(appBar).toHaveStyle(`top:0px`);
  });
});
