import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import createDOMAdapter from '../createDOMAdapter';

describe('验证createDOMAdapter中的方法', () => {
  it('addClass', () => {
    const { container } = render(
      <div style={{ height: '3300px' }}>
        <div>AppBar</div>
      </div>,
    );
    const appBar = container.firstChild as HTMLElement;
    const adapter = createDOMAdapter(window, appBar);
    adapter.addClass('test');
    expect(appBar).toHaveClass('test');
  });

  it('removeClass', () => {
    const { container } = render(
      <div style={{ height: '3300px' }} className="test">
        <div>AppBar</div>
      </div>,
    );
    const appBar = container.firstChild as HTMLElement;
    const adapter = createDOMAdapter(window, appBar);
    adapter.removeClass('test');
    expect(appBar).not.toHaveClass('test');
  });

  it('setStyle', () => {
    const { container } = render(
      <div style={{ height: '3300px' }}>
        <div>AppBar</div>
      </div>,
    );
    const appBar = container.firstChild as HTMLElement;
    const adapter = createDOMAdapter(window, appBar);
    adapter.setStyle('marginTop', '10px');
    expect(appBar).toHaveStyle('margin-top:10px');
  });

  it('window getScrollTop', () => {
    const { container } = render(
      <div style={{ height: '3300px' }}>
        <div>AppBar</div>
      </div>,
    );
    const appBar = container.firstChild as HTMLElement;
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
        <div>AppBar</div>
        <div style={{ height: '3300px' }} />
      </div>,
    );
    const appBar = container.firstChild as HTMLElement;
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
