/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, act, fireEvent, cleanup } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import { ThemeProvider } from 'styled-components';
import TextInput from '@sinoui/core/TextInput';
import 'jest-styled-components';
import AutoComplete from '../AutoComplete';

afterEach(cleanup);

jest.useFakeTimers();

it('渲染带有弹出指示器的输入框', () => {
  const renderInput = jest
    .fn()
    .mockImplementation((props) => (
      <TextInput {...props} data-testid="input" />
    ));

  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        options={[]}
        getOptionLabel={(_) => _.title}
      />
    </ThemeProvider>,
  );

  const popupIndicator = getByTestId('input').querySelector(
    '.sinoui-auto-complete__popup-indicator',
  );
  expect(renderInput).toHaveBeenCalled();
  expect(popupIndicator).toBeTruthy();
});

it('点击输入框，弹出选项', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { getByTestId, container } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        options={[
          { title: 'item 1' },
          { title: 'item 2' },
          { title: 'item 3' },
        ]}
        getOptionLabel={(_) => _.title}
      />
    </ThemeProvider>,
  );
  const textInput = getByTestId('text-input');
  const input = textInput.querySelector('input')!;

  act(() => {
    fireEvent.click(input);
  });

  const popupIndicator = textInput.querySelector(
    '.sinoui-auto-complete__popup-indicator',
  );

  expect(
    container
      .querySelector('.sinoui-auto-complete__option-list')
      ?.querySelectorAll('.sinoui-list-item').length,
  ).toBe(3);
  expect(popupIndicator).toHaveStyleRule('transform', 'rotate(180deg)');
});

it('输入框失去焦点，关闭选项弹窗', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { getByTestId, container } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        options={[
          { title: 'item 1' },
          { title: 'item 2' },
          { title: 'item 3' },
        ]}
        getOptionLabel={(_) => _.title}
      />
    </ThemeProvider>,
  );
  const textInput = getByTestId('text-input');
  const input = textInput.querySelector('input')!;

  act(() => {
    fireEvent.click(input);
  });

  act(() => {
    fireEvent.blur(input);
  });

  jest.runAllTimers();

  expect(
    container.querySelector('.sinoui-auto-complete__option-list'),
  ).toBeFalsy();
});

it('点击弹出图标，输入框获取到焦点', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        options={[
          { title: 'item 1' },
          { title: 'item 2' },
          { title: 'item 3' },
        ]}
        getOptionLabel={(_) => _.title}
      />
    </ThemeProvider>,
  );

  const textInput = getByTestId('text-input');
  const input = textInput.querySelector('input')!;
  const popupIndicator = textInput.querySelector(
    '.sinoui-auto-complete__popup-indicator',
  )!;

  act(() => {
    fireEvent.click(popupIndicator);
  });

  expect(document.activeElement).toBe(input);
});

it('点击弹出图标，显示选项弹窗', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { getByTestId, container } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        options={[
          { title: 'item 1' },
          { title: 'item 2' },
          { title: 'item 3' },
        ]}
        getOptionLabel={(_) => _.title}
      />
    </ThemeProvider>,
  );

  const popupIndicator = getByTestId('text-input').querySelector(
    '.sinoui-auto-complete__popup-indicator',
  )!;

  act(() => {
    fireEvent.click(popupIndicator);
  });

  expect(
    container
      .querySelector('.sinoui-auto-complete__option-list')
      ?.querySelectorAll('.sinoui-list-item').length,
  ).toBe(3);
});

it('点击弹出图标，关闭已显示的选项弹窗', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { getByTestId, container } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        options={[
          { title: 'item 1' },
          { title: 'item 2' },
          { title: 'item 3' },
        ]}
        getOptionLabel={(_) => _.title}
      />
    </ThemeProvider>,
  );

  const popupIndicator = getByTestId('text-input').querySelector(
    '.sinoui-auto-complete__popup-indicator',
  )!;

  act(() => {
    fireEvent.click(popupIndicator);
  });

  act(() => {
    fireEvent.click(popupIndicator);
  });

  jest.runAllTimers();
  expect(
    container.querySelector('.sinoui-auto-complete__option-list'),
  ).toBeFalsy();
});

it('输入框值变化，过滤选项', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { getByTestId, container } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        value=""
        options={[
          { title: 'item 1' },
          { title: 'item 2' },
          { title: 'item 3' },
        ]}
        getOptionLabel={(_) => _.title}
      />
    </ThemeProvider>,
  );

  const input = getByTestId('text-input').querySelector('input')!;

  act(() => {
    fireEvent.click(input);
  });

  act(() => {
    fireEvent.change(input, {
      target: {
        value: '1',
      },
    });
  });

  expect(
    container
      .querySelector('.sinoui-auto-complete__option-list')
      ?.querySelectorAll('.sinoui-list-item').length,
  ).toBe(1);
});
