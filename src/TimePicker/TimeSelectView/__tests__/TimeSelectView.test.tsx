/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import TimeSelectView from '../TimeSelectView';

afterEach(cleanup);

jest.useFakeTimers();

it('展现时间视图', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimeSelectView hour={10} minute={1} data-testid="time-select-view" />
    </ThemeProvider>,
  );

  const timeSelectView = getByTestId('time-select-view');

  expect(timeSelectView).toHaveClass('sinoui-time-select-view');
  expect(
    timeSelectView.querySelector('.sinoui-time-select-view__hour-list'),
  ).toBeTruthy();
  expect(
    timeSelectView.querySelector('.sinoui-time-select-view__minute-list'),
  ).toBeTruthy();

  const timeItems = timeSelectView.querySelectorAll(
    '.sinoui-time-item--selected',
  );
  expect(timeItems[0]).toHaveTextContent('10');
  expect(timeItems[1]).toHaveTextContent('01');
});

describe('时间范围', () => {
  it('默认最大小时为23', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeSelectView hour={23} minute={1} data-testid="time-select-view" />
      </ThemeProvider>,
    );

    const timeSelectView = getByTestId('time-select-view');
    const timeItems = timeSelectView.querySelectorAll(
      '.sinoui-time-item--selected',
    );

    expect(timeItems[0]).toHaveTextContent('23');
  });

  it('指定最大小时', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeSelectView
          hour={15}
          minute={1}
          maxHour={15}
          data-testid="time-select-view"
        />
      </ThemeProvider>,
    );

    const timeSelectView = getByTestId('time-select-view');

    expect(
      timeSelectView.querySelector(
        '.sinoui-time-select-view__hour-list [data-time-value="16"]',
      ),
    ).toBeFalsy();
  });

  it('默认最小小时为0', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeSelectView hour={0} minute={1} data-testid="time-select-view" />
      </ThemeProvider>,
    );

    const timeSelectView = getByTestId('time-select-view');
    const timeItems = timeSelectView.querySelectorAll(
      '.sinoui-time-item--selected',
    );

    expect(timeItems[0]).toHaveTextContent('0');
  });

  it('指定最小小时', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeSelectView
          hour={15}
          minute={1}
          minHour={15}
          data-testid="time-select-view"
        />
      </ThemeProvider>,
    );

    const timeSelectView = getByTestId('time-select-view');

    expect(
      timeSelectView.querySelector(
        '.sinoui-time-select-view__hour-list [data-time-value="14"]',
      ),
    ).toBeFalsy();
  });

  it('默认最大分钟为59', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeSelectView hour={23} minute={59} data-testid="time-select-view" />
      </ThemeProvider>,
    );

    const timeSelectView = getByTestId('time-select-view');
    const timeItems = timeSelectView.querySelectorAll(
      '.sinoui-time-item--selected',
    );

    expect(timeItems[1]).toHaveTextContent('59');
  });

  it('指定最大小时', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeSelectView
          hour={15}
          minute={10}
          maxMinute={15}
          data-testid="time-select-view"
        />
      </ThemeProvider>,
    );

    const timeSelectView = getByTestId('time-select-view');

    expect(
      timeSelectView.querySelector(
        '.sinoui-time-select-view__minute-list [data-time-value="16"]',
      ),
    ).toBeFalsy();
  });

  it('默认最小分钟为0', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeSelectView hour={0} minute={0} data-testid="time-select-view" />
      </ThemeProvider>,
    );

    const timeSelectView = getByTestId('time-select-view');
    const timeItems = timeSelectView.querySelectorAll(
      '.sinoui-time-item--selected',
    );

    expect(timeItems[1]).toHaveTextContent('0');
  });

  it('指定最小分钟', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeSelectView
          hour={15}
          minute={15}
          minMinute={15}
          data-testid="time-select-view"
        />
      </ThemeProvider>,
    );

    const timeSelectView = getByTestId('time-select-view');

    expect(
      timeSelectView.querySelector(
        '.sinoui-time-select-view__minute-list [data-time-value="14"]',
      ),
    ).toBeFalsy();
  });
});

describe('时间间隔', () => {
  it('默认的时间间隔为1', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeSelectView hour={10} minute={1} data-testid="time-select-view" />
      </ThemeProvider>,
    );

    const timeSelectView = getByTestId('time-select-view');

    // 出现连续的两个小时选项
    expect(
      timeSelectView.querySelector(
        '.sinoui-time-select-view__hour-list [data-time-value="9"]',
      ),
    ).toBeTruthy();
    expect(
      timeSelectView.querySelector(
        '.sinoui-time-select-view__hour-list [data-time-value="10"]',
      ),
    ).toBeTruthy();

    // 出现连续的两个分钟选项
    expect(
      timeSelectView.querySelector(
        '.sinoui-time-select-view__minute-list [data-time-value="1"]',
      ),
    ).toBeTruthy();
    expect(
      timeSelectView.querySelector(
        '.sinoui-time-select-view__minute-list [data-time-value="2"]',
      ),
    ).toBeTruthy();
  });

  it('指定小时间隔', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeSelectView
          hour={10}
          minute={1}
          data-testid="time-select-view"
          hourStep={2}
        />
      </ThemeProvider>,
    );

    const timeSelectView = getByTestId('time-select-view');

    // 因时间间隔为2，则不会出现奇数小时
    expect(
      timeSelectView.querySelector(
        '.sinoui-time-select-view__hour-list [data-time-value="9"]',
      ),
    ).toBeFalsy();
  });

  it('指定分钟间隔', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeSelectView
          hour={10}
          minute={2}
          data-testid="time-select-view"
          minuteStep={2}
        />
      </ThemeProvider>,
    );

    const timeSelectView = getByTestId('time-select-view');

    // 因时间间隔为2，则不会出现奇数分钟
    expect(
      timeSelectView.querySelector(
        '.sinoui-time-select-view__minute-list [data-time-value="1"]',
      ),
    ).toBeFalsy();
  });
});

describe('焦点管理', () => {
  it('默认情况下，不自动获取焦点', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <TimeSelectView />
      </ThemeProvider>,
    );

    expect(document.activeElement).toBe(document.body);
  });

  it('自动获取焦点', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <TimeSelectView hour={10} autoFocus />
      </ThemeProvider>,
    );

    expect(document.activeElement).toHaveAttribute('data-time-value', '10');
  });

  it('监听失去焦点事件', () => {
    const onBlur = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeSelectView data-testid="time-select-view" onBlur={onBlur} />
      </ThemeProvider>,
    );

    const timeSelectView = getByTestId('time-select-view');

    fireEvent.blur(timeSelectView);
    jest.runAllTimers();

    expect(onBlur).toBeCalled();
  });

  it('焦点在内部元素之间转移，不调用onBlur回调函数', () => {
    // 注意：焦点在内部元素之间转移，会触发一次onBlur事件，但是焦点其实还是在视图内
    const onBlur = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeSelectView
          hour={10}
          data-testid="time-select-view"
          onBlur={onBlur}
          autoFocus
        />
      </ThemeProvider>,
    );

    const timeSelectView = getByTestId('time-select-view');
    fireEvent.blur(timeSelectView);

    (timeSelectView.querySelector(
      '.sinoui-time-select-view__minute-list [data-time-value="1"]',
    ) as HTMLElement)?.focus();

    jest.runAllTimers();

    expect(onBlur).not.toBeCalled();
  });

  it('按向右键，分钟列表获取焦点', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeSelectView hour={10} minute={1} data-testid="time-select-view" />
      </ThemeProvider>,
    );

    const timeSelectView = getByTestId('time-select-view');

    fireEvent.keyDown(timeSelectView, { key: 'ArrowRight' });

    // 焦点转移到值为1的分钟选项上
    expect(document.activeElement).toHaveAttribute('data-time-value', '1');
  });

  it('按向左键，小时列表获取焦点', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <TimeSelectView hour={10} minute={1} data-testid="time-select-view" />
      </ThemeProvider>,
    );

    const timeSelectView = getByTestId('time-select-view');

    // 按下向右键，焦点转移到分钟列表
    fireEvent.keyDown(timeSelectView, { key: 'ArrowRight' });

    // 按下向左键
    fireEvent.keyDown(timeSelectView, { key: 'ArrowLeft' });

    // 焦点转移到值为10的小时选项上
    expect(document.activeElement).toHaveAttribute('data-time-value', '10');
  });
});

it('点击小时、分钟选项，回调onChange', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <TimeSelectView
        hour={10}
        minute={1}
        data-testid="time-select-view"
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  const timeSelectView = getByTestId('time-select-view');

  fireEvent.click(
    timeSelectView.querySelector(
      '.sinoui-time-select-view__hour-list [data-time-value="11"]',
    )!,
  );

  expect(onChange).toBeCalledWith(11, 1);

  fireEvent.click(
    timeSelectView.querySelector(
      '.sinoui-time-select-view__minute-list [data-time-value="5"]',
    )!,
  );

  expect(onChange).toBeCalledWith(10, 5);
});
