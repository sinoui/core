import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import ViewModel from '@sinoui/core/DatePicker/ViewModel';
import DateTimeMobileViewToolbar from '../DateTimeMobileViewToolbar';

afterEach(cleanup);

describe('镜像测试', () => {
  it('渲染日期时间选择头部组件', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <DateTimeMobileViewToolbar
            viewModel={ViewModel.dates}
            year={2020}
            month={6}
            day={21}
            hour="15"
            minute="39"
          />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('验收测试', () => {
  it('渲染日期时间选择头部组件', () => {
    const { getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileViewToolbar
          viewModel={ViewModel.dates}
          year={2020}
          month={6}
          day={21}
          hour="15"
          minute="39"
        />
      </ThemeProvider>,
    );

    expect(getByText('2020')).toBeInTheDocument();
    expect(getByText('7月21日')).toBeInTheDocument();
    expect(getByText('15:39')).toBeInTheDocument();
  });

  it('分别点击年份、日期、时间，切换成对应视图', () => {
    const onViewModelChange = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <DateTimeMobileViewToolbar
          viewModel={ViewModel.dates}
          year={2020}
          month={6}
          day={21}
          hour="15"
          minute="39"
          onViewModelChange={onViewModelChange}
        />
      </ThemeProvider>,
    );

    fireEvent.click(getByText('2020'));
    expect(onViewModelChange).toBeCalledWith(ViewModel.years);

    fireEvent.click(getByText('7月21日'));
    expect(onViewModelChange).toBeCalledWith(ViewModel.dates);

    fireEvent.click(getByText('15:39'));
    expect(onViewModelChange).toBeCalledWith(ViewModel.time);
  });
});
