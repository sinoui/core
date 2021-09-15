/**
 * @jest-environment jsdom
 */
import TextInput from '@sinoui/core/TextInput';
import { defaultTheme } from '@sinoui/theme';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import AutoComplete, { AutoCompleteChangeReason } from '../AutoComplete';

afterEach(cleanup);

jest.useFakeTimers();

const options = [{ title: 'item 1' }, { title: 'item 2' }, { title: 'item 3' }];

describe('freeSolo模式', () => {
  it('输入框聚焦时，不选中文本', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const clearIcon = (
      <div data-testid="custom-close-icon">custom-close-icon</div>
    );
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          freeSolo
          renderInput={renderInput}
          value={options[0].title}
          closeOnEscape={false}
          options={options}
          getOptionLabel={(_) => _.title}
          clearIcon={clearIcon}
        />
      </ThemeProvider>,
    );
    const input = getByTestId('text-input').querySelector('input')!;
    const mock = jest.spyOn(input, 'select');

    act(() => {
      fireEvent.click(input);
    });

    expect(mock).not.toBeCalled();
  });

  it('默认情况下，不显示弹窗图标', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const { queryByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          freeSolo
          renderInput={renderInput}
          closeOnEscape={false}
          options={options}
          getOptionLabel={(_) => _.title}
          popupIcon={<div data-testid="custom-popup-icon" />}
        />
      </ThemeProvider>,
    );

    expect(queryByTestId('custom-popup-icon')).toBeFalsy();
  });

  it('forcePopupIcon=true，显示弹窗图标', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const { queryByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          freeSolo
          renderInput={renderInput}
          closeOnEscape={false}
          options={options}
          getOptionLabel={(_) => _.title}
          popupIcon={<div data-testid="custom-popup-icon" />}
          forcePopupIcon
        />
      </ThemeProvider>,
    );

    expect(queryByTestId('custom-popup-icon')).toBeInTheDocument();
  });

  it('默认情况下，禁止HOME/END键的选项高亮', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const { getByTestId, container } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          freeSolo
          handleHomeEndKeys={false}
          renderInput={renderInput}
          options={options}
          getOptionLabel={(_) => _.title}
        />
      </ThemeProvider>,
    );
    const textInput = getByTestId('text-input');
    const input = textInput.querySelector('input')!;

    // openOnFocus状态下获取焦点时弹出弹窗
    act(() => {
      fireEvent.focus(input);
    });

    act(() => {
      fireEvent.keyDown(input, {
        key: 'End',
        code: 'End',
      });
    });

    jest.runAllTimers();

    expect(
      container.querySelectorAll('.sinoui-list-item--focused'),
    ).toHaveLength(0);

    act(() => {
      fireEvent.keyDown(input, {
        key: 'Home',
        code: 'Home',
      });
    });

    jest.runAllTimers();
    expect(
      container.querySelectorAll('.sinoui-list-item--focused'),
    ).toHaveLength(0);
  });

  it('不显示无可选选项的提示', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const { getByTestId, container } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          freeSolo
          handleHomeEndKeys={false}
          renderInput={renderInput}
          options={options}
          getOptionLabel={(_) => _.title}
        />
      </ThemeProvider>,
    );
    const textInput = getByTestId('text-input');
    const input = textInput.querySelector('input')!;

    // openOnFocus状态下获取焦点时弹出弹窗
    act(() => {
      fireEvent.focus(input);
    });

    act(() => {
      fireEvent.change(input, {
        target: {
          value: '张三',
        },
      });
    });
    jest.runAllTimers();

    expect(
      container.querySelector('.sinoui-option-list__nodata-content'),
    ).toBeFalsy();
  });

  it('默认情况下，输入框文本清空时，不调用onChange', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const onChange = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          freeSolo
          renderInput={renderInput}
          value={options[0].title}
          options={options}
          getOptionLabel={(_) => _.title}
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.change(getByTestId('text-input').querySelector('input')!, {
        target: {
          value: '',
        },
      });
    });

    expect(onChange).not.toBeCalled();
  });

  it('clearable=true，输入框文本清空，调用onChange', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const onChange = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          freeSolo
          clearable
          renderInput={renderInput}
          value={options[0].title}
          options={options}
          getOptionLabel={(_) => _.title}
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.change(getByTestId('text-input').querySelector('input')!, {
        target: {
          value: '',
        },
      });
    });

    expect(onChange).toBeCalledWith(null, AutoCompleteChangeReason.clear);
  });

  it('输入框值与value值同步', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const onChange = jest.fn();
    const { getByTestId, rerender } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          freeSolo
          value={options[0].title}
          renderInput={renderInput}
          options={options}
          getOptionLabel={(_) => _.title}
          onChange={onChange}
        />
      </ThemeProvider>,
    );
    const input = getByTestId('text-input').querySelector('input')!;
    expect(input).toHaveValue('item 1');

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          freeSolo
          value={options[1].title}
          renderInput={renderInput}
          options={options}
          getOptionLabel={(_) => _.title}
          onChange={onChange}
        />
      </ThemeProvider>,
    );
    expect(input).toHaveValue('item 2');
  });

  it('输入框失去焦点时，调用onChange,更新value', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const onChange = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          freeSolo
          renderInput={renderInput}
          value={options[0].title}
          options={options}
          getOptionLabel={(_) => _.title}
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    const input = getByTestId('text-input').querySelector('input')!;
    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'item 123',
        },
      });
    });

    act(() => {
      fireEvent.blur(input);
    });

    expect(input).toHaveValue('item 123');
  });

  it('freeSolo的多选模式', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          freeSolo
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          value={[options[0].title, options[2].title]}
          renderInput={renderInput}
        />
      </ThemeProvider>,
    );

    const tags = getByTestId('text-input').querySelectorAll('.sinoui-chip');
    expect(tags.length).toBe(2);
    expect(tags[0]).toHaveTextContent('item 1');
    expect(tags[1]).toHaveTextContent('item 3');
  });

  it('freeSolo的多选模式下，失去焦点时，onChange被调用', () => {
    const onChange = jest.fn();
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          freeSolo
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          value={[options[0].title, options[2].title]}
          renderInput={renderInput}
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    const input = getByTestId('text-input').querySelector('input')!;

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'item 123',
        },
      });
    });

    act(() => {
      fireEvent.blur(input);
    });

    jest.runAllTimers();
    expect(onChange).toBeCalledWith(
      ['item 1', 'item 3', 'item 123'],
      AutoCompleteChangeReason.blur,
    );
    expect(input).toHaveValue('');
  });
});
