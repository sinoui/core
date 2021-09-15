/**
 * @jest-environment jsdom
 */
import TextInput from '@sinoui/core/TextInput';
import defaultTheme from '@sinoui/theme/defaultTheme';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import AutoComplete from '../AutoComplete';
import { AutoCompleteCloseReason } from '../types';

afterEach(cleanup);

const options = [{ title: 'item 1' }, { title: 'item 2' }, { title: 'item 3' }];

describe('open状态受控', () => {
  it('失去焦点，调用关闭回调函数', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const onClose = jest.fn();
    const { getByTestId, container } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          renderInput={renderInput}
          options={options}
          getOptionLabel={(_) => _.title}
          open
          onClose={onClose}
          portal={false}
        />
      </ThemeProvider>,
    );

    expect(
      container.querySelector('.sinoui-auto-complete__option-list'),
    ).toBeInTheDocument();

    const textInput = getByTestId('text-input');
    const input = textInput.querySelector('input')!;

    act(() => {
      fireEvent.blur(input);
    });

    expect(onClose).toBeCalledWith(AutoCompleteCloseReason.blur);
    expect(
      container.querySelector('.sinoui-auto-complete__option-list'),
    ).toBeInTheDocument();
  });

  it('按下esc，调用关闭回调函数', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const onClose = jest.fn();
    const { getByTestId, container } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          renderInput={renderInput}
          options={options}
          getOptionLabel={(_) => _.title}
          open
          onClose={onClose}
          portal={false}
        />
      </ThemeProvider>,
    );

    const textInput = getByTestId('text-input');
    const input = textInput.querySelector('input')!;

    act(() => {
      fireEvent.keyDown(input, { key: 'Escape' });
    });

    expect(onClose).toBeCalledWith(AutoCompleteCloseReason.escape);
    expect(
      container.querySelector('.sinoui-auto-complete__option-list'),
    ).toBeInTheDocument();
  });

  it('选中选项，调用关闭回调函数', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const onClose = jest.fn();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          renderInput={renderInput}
          options={options}
          getOptionLabel={(_) => _.title}
          open
          onClose={onClose}
          portal={false}
        />
      </ThemeProvider>,
    );

    act(() => {
      const firstItem = container.querySelector('.sinoui-list-item')!;
      fireEvent.click(firstItem);
    });

    expect(onClose).toBeCalledWith(AutoCompleteCloseReason.selectOption);
    expect(
      container.querySelector('.sinoui-auto-complete__option-list'),
    ).toBeInTheDocument();
  });

  it('点击指示图标，调用关闭回调函数', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const onClose = jest.fn();
    const { getByTestId, container } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          renderInput={renderInput}
          options={options}
          getOptionLabel={(_) => _.title}
          open
          onClose={onClose}
          portal={false}
        />
      </ThemeProvider>,
    );

    const popupIndicator = getByTestId('text-input').querySelector(
      '.sinoui-auto-complete__popup-indicator',
    )!;

    act(() => {
      fireEvent.click(popupIndicator);
    });

    expect(onClose).toBeCalledWith(
      AutoCompleteCloseReason.popperIndicatorClick,
    );
    expect(
      container.querySelector('.sinoui-auto-complete__option-list'),
    ).toBeInTheDocument();
  });
});
