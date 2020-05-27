/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, act, fireEvent, cleanup } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import { ThemeProvider } from 'styled-components';
import TextInput from '@sinoui/core/TextInput';
import 'jest-styled-components';
import Popper from '@sinoui/core/Popper';
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

it('选项打开时，按下esc键，退出选项', () => {
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
    // 打开选项弹窗
    fireEvent.click(input);
  });

  act(() => {
    fireEvent.keyDown(input, {
      key: 'Escape',
      code: 'Escape',
    });
  });

  jest.runAllTimers();
  expect(
    container.querySelector('.sinoui-auto-complete__option-list'),
  ).toBeFalsy();
});

it('closeOnEscape = false', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { getByTestId, container } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        value=""
        closeOnEscape={false}
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
    // 打开选项弹窗
    fireEvent.click(input);
  });

  act(() => {
    fireEvent.keyDown(input, {
      key: 'Escape',
      code: 'Escape',
    });
  });

  jest.runAllTimers();
  expect(
    container.querySelector('.sinoui-auto-complete__option-list'),
  ).toBeTruthy();
});

it('自定义Popper组件', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const CustomPopperComponent = (props: any) => (
    <Popper {...props} data-testid="custom-popper" />
  );

  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        value=""
        closeOnEscape={false}
        options={[
          { title: 'item 1' },
          { title: 'item 2' },
          { title: 'item 3' },
        ]}
        getOptionLabel={(_) => _.title}
        PopperComponent={CustomPopperComponent}
      />
    </ThemeProvider>,
  );

  act(() => {
    fireEvent.click(getByTestId('text-input').querySelector('input')!);
  });

  expect(getByTestId('custom-popper')).toBeTruthy();
});

it('点击选项时，阻止mousedown的默认行为', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const preventDefault = jest.fn();
  const FakePopper = (props: any) => {
    const handleMouseDown = (event: React.MouseEvent) => {
      event.persist();
      props.onMouseDown({
        ...event,
        preventDefault,
      });
    };

    return (
      <Popper {...props} onMouseDown={handleMouseDown} data-testid="popper" />
    );
  };
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        value=""
        closeOnEscape={false}
        options={[
          { title: 'item 1' },
          { title: 'item 2' },
          { title: 'item 3' },
        ]}
        getOptionLabel={(_) => _.title}
        PopperComponent={FakePopper}
      />
    </ThemeProvider>,
  );

  act(() => {
    fireEvent.click(getByTestId('text-input').querySelector('input')!);
  });

  act(() => {
    fireEvent.mouseDown(getByTestId('popper'));
  });

  expect(preventDefault).toBeCalled();
});

it('定制弹窗图标', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        value=""
        closeOnEscape={false}
        options={[
          { title: 'item 1' },
          { title: 'item 2' },
          { title: 'item 3' },
        ]}
        getOptionLabel={(_) => _.title}
        popupIcon={<div data-testid="custom-popup-icon" />}
      />
    </ThemeProvider>,
  );

  expect(getByTestId('custom-popup-icon')).toBeTruthy();
});

it('forcePopupIcon = false，不显示弹窗图标', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { queryByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        value=""
        closeOnEscape={false}
        options={[
          { title: 'item 1' },
          { title: 'item 2' },
          { title: 'item 3' },
        ]}
        getOptionLabel={(_) => _.title}
        popupIcon={<div data-testid="custom-popup-icon" />}
        forcePopupIcon={false}
      />
    </ThemeProvider>,
  );

  expect(queryByTestId('custom-popup-icon')).toBeFalsy();
});
