/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import DateTimeMobileView from '../DateTimeMobileView';

afterEach(cleanup);

describe('镜像测试', () => {
  it('渲染移动端日期时间选择视图', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <DateTimeMobileView
            date={new Date(2020, 6, 20, 15, 40)}
            showToday={false}
          />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('验收测试', () => {
  it('默认渲染', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileView />
      </ThemeProvider>,
    );

    expect(
      container.querySelector('.sinoui-date-time-mobile-view__datesview'),
    ).toBeInTheDocument();
  });

  it('上个月', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileView date={new Date(2020, 6, 20, 15, 40)} />
      </ThemeProvider>,
    );

    const prevButton = container.querySelector(
      '.sinoui-calendar-view-header__prev-month-icon',
    );

    act(() => {
      fireEvent.click(prevButton!);
    });

    expect(
      container.querySelector('.sinoui-calendar-view-header'),
    ).toHaveTextContent('2020年六月');
  });

  it('下个月', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileView date={new Date(2020, 6, 20, 15, 40)} />
      </ThemeProvider>,
    );

    const nextButton = container.querySelector(
      '.sinoui-calendar-view-header__next-month-icon',
    );

    act(() => {
      fireEvent.click(nextButton!);
    });

    expect(
      container.querySelector('.sinoui-calendar-view-header'),
    ).toHaveTextContent('2020年八月');
  });

  it('点击年份，切换为年份视图', () => {
    const { container, getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileView />
      </ThemeProvider>,
    );

    fireEvent.click(getByText('2020年'));

    expect(
      container.querySelector('.sinoui-date-time-mobile-view__yearsview'),
    ).toBeInTheDocument();
  });

  it('选择年份', () => {
    const { container, getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileView date={new Date(2020, 6, 20, 15, 40)} />
      </ThemeProvider>,
    );

    fireEvent.click(getByText('2020年'));

    const year_2019 = container.querySelector('[data-year="2019"]');
    fireEvent.click(year_2019!);

    expect(
      container.querySelector('.sinoui-date-time-mobile-view__yearsview'),
    ).toBeFalsy();
    expect(getByText('2019年')).toBeInTheDocument();
    expect(
      container.querySelector('.sinoui-calendar-view-header'),
    ).toHaveTextContent('2019年七月');
  });

  it('点击时间，切换为时间选择视图', () => {
    const { container, getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileView date={new Date(2020, 6, 20, 15, 40)} />
      </ThemeProvider>,
    );

    fireEvent.click(getByText('15:40'));

    expect(
      container.querySelector('.sinoui-date-time-mobile-view__timeview'),
    ).toBeInTheDocument();
  });

  it('输入时间', () => {
    const { container, getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileView date={new Date(2020, 6, 20, 15, 40)} />
      </ThemeProvider>,
    );

    fireEvent.click(getByText('15:40'));

    const hourInput = container.querySelector(
      '.sinoui-date-time-mobile-view__timeview-hour-input',
    );
    const minuteInput = container.querySelector(
      '.sinoui-date-time-mobile-view__timeview-minute-input',
    );

    act(() => {
      fireEvent.change(hourInput!.querySelector('input')!, {
        target: { value: '18' },
      });
      fireEvent.change(minuteInput!.querySelector('input')!, {
        target: { value: '45' },
      });
    });

    expect(getByText('18:45')).toBeInTheDocument();
  });

  it('输入不符合规范的小时，将直接置成已经选定的值', () => {
    const { container, getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileView date={new Date(2020, 6, 20, 15, 40)} />
      </ThemeProvider>,
    );

    fireEvent.click(getByText('15:40'));

    const hourInput = container
      .querySelector('.sinoui-date-time-mobile-view__timeview-hour-input')!
      .querySelector('input');
    const minuteInput = container
      .querySelector('.sinoui-date-time-mobile-view__timeview-minute-input')!
      .querySelector('input');

    act(() => {
      fireEvent.change(hourInput!, {
        target: { value: '26' },
      });
    });

    fireEvent.blur(hourInput!);

    act(() => {
      fireEvent.change(minuteInput!, {
        target: { value: '45' },
      });
    });

    expect(getByText('15:45')).toBeInTheDocument();
  });

  it('输入不符合规范的分钟，将直接置成已经选定的值', () => {
    const { container, getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileView date={new Date(2020, 6, 20, 15, 40)} />
      </ThemeProvider>,
    );

    fireEvent.click(getByText('15:40'));

    const hourInput = container
      .querySelector('.sinoui-date-time-mobile-view__timeview-hour-input')!
      .querySelector('input');
    const minuteInput = container
      .querySelector('.sinoui-date-time-mobile-view__timeview-minute-input')!
      .querySelector('input');

    act(() => {
      fireEvent.change(hourInput!, {
        target: { value: '22' },
      });
    });

    act(() => {
      fireEvent.change(minuteInput!, {
        target: { value: '70' },
      });
    });

    fireEvent.blur(minuteInput!);

    expect(getByText('22:40')).toBeInTheDocument();
  });

  it('设置选中的日期时间', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileView date={new Date(2020, 6, 20, 15, 40)} />
      </ThemeProvider>,
    );

    expect(
      container.querySelector('.sinoui-date-cell--selected'),
    ).toHaveTextContent('20');
  });

  it('minDate', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileView
          date={new Date(2020, 5, 18, 12, 20)}
          minDate={new Date(2020, 5, 10, 12, 20)}
        />
      </ThemeProvider>,
    );

    expect(
      container.querySelectorAll('.sinoui-date-cell--disabled').length,
    ).toBe(9);
  });

  it('maxDate', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileView
          date={new Date(2020, 5, 18, 12, 20)}
          maxDate={new Date(2020, 5, 20, 12, 20)}
        />
      </ThemeProvider>,
    );

    expect(
      container.querySelectorAll('.sinoui-date-cell--disabled').length,
    ).toBe(11);
  });

  it('点击取消按钮，onClose被调用', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileView
          date={new Date(2020, 5, 18, 12, 20)}
          maxDate={new Date(2020, 5, 20, 12, 20)}
          onClose={onClose}
        />
      </ThemeProvider>,
    );

    fireEvent.click(getByText('取消'));

    expect(onClose).toBeCalled();
  });

  it('点击清除按钮，清除值并关闭弹窗', () => {
    const onClose = jest.fn();
    const onChange = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileView
          date={new Date(2020, 5, 18, 12, 20)}
          maxDate={new Date(2020, 5, 20, 12, 20)}
          onClose={onClose}
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    fireEvent.click(getByText('清除'));

    expect(onClose).toBeCalled();
    expect(onChange).toBeCalledWith('');
  });

  it('点击设置按钮，弹窗关闭，onChange被调用', () => {
    const onClose = jest.fn();
    const onChange = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileView
          date={new Date(2020, 5, 18, 12, 20)}
          maxDate={new Date(2020, 5, 20, 12, 20)}
          onClose={onClose}
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    fireEvent.click(getByText('设置'));

    expect(onClose).toBeCalled();
    expect(onChange).toBeCalledWith('2020-06-18 12:20');
  });
});
