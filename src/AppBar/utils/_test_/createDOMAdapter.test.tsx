import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import createDOMAdapter from '../createDOMAdapter';

/**
 * 获取应用栏
 * @param container
 */
const getAppBarDom = (container: any) => {
  return container.querySelector('#appBar') as HTMLElement;
};

describe('验证createDOMAdapter中的方法', () => {
  it('addClass', () => {
    const { container } = render(
      <div style={{ height: '3300px' }}>
        <div id="appBar">AppBar</div>
      </div>,
    );
    const appBar = getAppBarDom(container);
    const adapter = createDOMAdapter(window, appBar);
    adapter.addClass('test');
    expect(appBar).toHaveClass('test');
  });

  it('removeClass', () => {
    const { container } = render(
      <div style={{ height: '3300px' }} className="test">
        <div id="appBar">AppBar</div>
      </div>,
    );
    const appBar = getAppBarDom(container);
    const adapter = createDOMAdapter(window, appBar);
    adapter.removeClass('test');
    expect(appBar).not.toHaveClass('test');
  });

  it('setStyle', () => {
    const { container } = render(
      <div style={{ height: '3300px' }}>
        <div id="appBar">AppBar</div>
      </div>,
    );
    const appBar = getAppBarDom(container);
    const adapter = createDOMAdapter(window, appBar);
    adapter.setStyle('marginTop', '10px');
    expect(appBar).toHaveStyle('margin-top:10px');
  });

  it('getStyleValue', () => {
    const { container } = render(
      <div style={{ height: '3300px' }}>
        <div id="appBar" style={{ height: '64px', top: '0px' }}>
          AppBar
        </div>
      </div>,
    );
    const appBar = getAppBarDom(container);
    const adapter = createDOMAdapter(window, appBar);
    expect(adapter.getStyleValue('top')).toEqual('0px');
    expect(adapter.getStyleValue('height')).toEqual('64px');
  });

  it('window getScrollTop', () => {
    const { container } = render(
      <div style={{ height: '3300px' }}>
        <div id="appBar">AppBar</div>
      </div>,
    );
    const appBar = getAppBarDom(container);
    const adapter = createDOMAdapter(window, appBar);
    expect(adapter.getScrollTop()).toBe(0);
    window.addEventListener('scroll', () => {
      /* some callback */
    });
    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    });
    expect(window.pageYOffset).toBe(100);
    expect(adapter.getScrollTop()).toBe(100);
  });

  it('div getScrollTop', () => {
    const { container } = render(
      <div style={{ height: '1000px;overflow:auto' }}>
        <div id="appBar">AppBar</div>
        <div style={{ height: '3300px' }} />
      </div>,
    );
    const appBar = getAppBarDom(container);
    const adapter = createDOMAdapter(container, appBar);
    expect(adapter.getScrollTop()).toBe(0);
    container.addEventListener('scroll', () => {
      /* some callback */
    });
    act(() => {
      fireEvent.scroll(container, { target: { scrollTop: 100 } });
    });
    expect(adapter.getScrollTop()).toBe(100);
  });
});
