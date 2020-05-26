/* eslint-disable no-unused-expressions */
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import React from 'react';
import Tooltip from '../Tooltip';

afterEach(cleanup);

describe('触发器测试', () => {
  it('click', () => {
    const { getByTestId, queryByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Tooltip title="这是提示文字" data-testid="tooltip">
          <button data-testid="trigger-btn" type="button">
            弹出
          </button>
        </Tooltip>
      </ThemeProvider>,
    );

    fireEvent.click(getByTestId('trigger-btn'));
    expect(getByTestId('tooltip')).toBeTruthy();
    fireEvent.click(document);
    expect(queryByTestId('tooltip')).toBeFalsy();
  });

  it('hover', () => {
    const { getByTestId, queryByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Tooltip title="这是提示文字" data-testid="tooltip" trigger="hover">
          <button data-testid="trigger-btn" type="button">
            弹出
          </button>
        </Tooltip>
      </ThemeProvider>,
    );

    fireEvent.mouseEnter(getByTestId('trigger-btn'));
    expect(queryByTestId('tooltip')).toBeTruthy();
    fireEvent.mouseLeave(getByTestId('trigger-btn'));
    expect(queryByTestId('tooltip')).toBeFalsy();
  });

  it('focus', () => {
    const { getByTestId, queryByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Tooltip title="这是提示文字" data-testid="tooltip" trigger="focus">
          <button data-testid="trigger-btn" type="button">
            弹出
          </button>
        </Tooltip>
      </ThemeProvider>,
    );

    fireEvent.focus(getByTestId('trigger-btn'));
    expect(queryByTestId('tooltip')).toBeTruthy();
    fireEvent.blur(getByTestId('trigger-btn'));
    expect(queryByTestId('tooltip')).toBeFalsy();
  });
});

describe('箭头', () => {
  it('不传入arrow属性 默认在pc端显示箭头', () => {
    const { getByTestId, container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Tooltip title="这是提示文字" data-testid="tooltip">
          <button data-testid="trigger-btn" type="button">
            弹出
          </button>
        </Tooltip>
      </ThemeProvider>,
    );

    fireEvent.click(getByTestId('trigger-btn'));
    expect(container.querySelector('[data-popper-arrow]')).toBeTruthy();
  });

  it('传入Arrow属性 显示箭头', () => {
    const { getByTestId, container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Tooltip title="这是提示文字" data-testid="tooltip" arrow>
          <button data-testid="trigger-btn" type="button">
            弹出
          </button>
        </Tooltip>
      </ThemeProvider>,
    );
    fireEvent.click(getByTestId('trigger-btn'));
    expect(container.querySelector('[data-popper-arrow]')).toBeTruthy();
  });

  it('移动端不显示箭头', () => {
    const { getByTestId, container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Tooltip title="这是提示文字" data-testid="tooltip" isMobile>
          <button data-testid="trigger-btn" type="button">
            弹出
          </button>
        </Tooltip>
      </ThemeProvider>,
    );

    fireEvent.click(getByTestId('trigger-btn'));
    expect(container.querySelector('[data-popper-arrow]')).toBeFalsy();
  });

  it('自定义className', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Tooltip title="这是提示文字" data-testid="tooltip" className="custom">
          <button data-testid="trigger-btn" type="button">
            弹出
          </button>
        </Tooltip>
      </ThemeProvider>,
    );
    fireEvent.click(getByTestId('trigger-btn'));
    expect(getByTestId('tooltip').querySelector('.sinoui-tooltip')).toHaveClass(
      'custom',
    );
  });

  it('自定义style', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Tooltip
          title="这是提示文字"
          data-testid="tooltip"
          style={{ fontSize: '14px' }}
        >
          <button data-testid="trigger-btn" type="button">
            弹出
          </button>
        </Tooltip>
      </ThemeProvider>,
    );
    fireEvent.click(getByTestId('trigger-btn'));
    expect(getByTestId('tooltip').querySelector('.sinoui-tooltip')).toHaveStyle(
      'font-size: 14px',
    );
  });
});
