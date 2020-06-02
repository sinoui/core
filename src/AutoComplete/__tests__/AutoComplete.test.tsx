/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, act, fireEvent, cleanup } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import { ThemeProvider } from 'styled-components';
import TextInput from '@sinoui/core/TextInput';
import 'jest-styled-components';
import Popper from '@sinoui/core/Popper';
import Collapse from '@sinoui/core/CollapseNew';
import AutoComplete, { AutoCompleteChangeReason } from '../AutoComplete';
import type { RenderTagsProps } from '../types';

afterEach(cleanup);

jest.useFakeTimers();

const options = [{ title: 'item 1' }, { title: 'item 2' }, { title: 'item 3' }];

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
        options={options}
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
        options={options}
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
        options={options}
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
        options={options}
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
        options={options}
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
        options={options}
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
        options={options}
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
        closeOnEscape={false}
        options={options}
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
        closeOnEscape={false}
        options={options}
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
        closeOnEscape={false}
        options={options}
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
        closeOnEscape={false}
        options={options}
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
        closeOnEscape={false}
        options={options}
        getOptionLabel={(_) => _.title}
        popupIcon={<div data-testid="custom-popup-icon" />}
        forcePopupIcon={false}
      />
    </ThemeProvider>,
  );

  expect(queryByTestId('custom-popup-icon')).toBeFalsy();
});

it('有值显示清除图标', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const clearIcon = (
    <div data-testid="custom-close-icon">custom-close-icon</div>
  );
  const { queryByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        value={options[0]}
        closeOnEscape={false}
        options={options}
        getOptionLabel={(_) => _.title}
        clearIcon={clearIcon}
      />
    </ThemeProvider>,
  );

  expect(queryByTestId('custom-close-icon')).toBeTruthy();
});

it('点击清除图标，清除值', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const clearIcon = (
    <div data-testid="custom-close-icon">custom-close-icon</div>
  );
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        value={options[0]}
        closeOnEscape={false}
        options={options}
        getOptionLabel={(_) => _.title}
        clearIcon={clearIcon}
        onChange={onChange}
      />
    </ThemeProvider>,
  );

  act(() => {
    fireEvent.click(getByTestId('custom-close-icon'));
  });

  expect(onChange).toBeCalledWith(null, 'clear');
  expect(getByTestId('text-input').querySelector('input')).toHaveValue('');
});

it('无值时，不显示清除按钮', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const clearIcon = (
    <div data-testid="custom-close-icon">custom-close-icon</div>
  );
  const { queryByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        closeOnEscape={false}
        options={options}
        getOptionLabel={(_) => _.title}
        clearIcon={clearIcon}
      />
    </ThemeProvider>,
  );

  expect(queryByTestId('custom-close-icon')).toBeFalsy();
});

it('在非freeSolo模式下，输入框聚焦时，选中文本', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const clearIcon = (
    <div data-testid="custom-close-icon">custom-close-icon</div>
  );
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        value={options[0]}
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

  expect(mock).toBeCalled();
});

it('单选状态下，点击选项，选中选项并关闭选项弹窗', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const onChange = jest.fn();
  const { getByTestId, container } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        closeOnEscape={false}
        options={options}
        getOptionLabel={(_) => _.title}
        onChange={onChange}
      />
    </ThemeProvider>,
  );
  const input = getByTestId('text-input').querySelector('input')!;
  act(() => {
    fireEvent.click(input);
  });

  act(() => {
    const firstItem = container.querySelector('.sinoui-list-item')!;
    fireEvent.click(firstItem);
  });

  expect(input).toHaveValue('item 1');
  expect(onChange).toHaveBeenCalledWith(
    options[0],
    AutoCompleteChangeReason.selectOption,
  );

  jest.runAllTimers();
  expect(container.querySelector('.sinoui-list-item')).toBeFalsy();
});

it('输入框的值等于value，则不过滤选项列表', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { getByTestId, container } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        value={options[0]}
        options={options}
        getOptionLabel={(_) => _.title}
      />
    </ThemeProvider>,
  );

  act(() => {
    fireEvent.click(getByTestId('text-input').querySelector('input')!);
  });

  expect(container.querySelectorAll('.sinoui-list-item').length).toBe(3);
});

it('输入框为空时，则清空value', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        value={options[0]}
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

it('输入框失去焦点，输入框文本重置为value', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        value={options[0]}
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

  expect(input).toHaveValue('item 1');
});

it('openOnFocus=true,获取焦点时出现弹窗', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { getByTestId, container } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        openOnFocus
        renderInput={renderInput}
        options={options}
        getOptionLabel={(_) => _.title}
      />
    </ThemeProvider>,
  );
  const textInput = getByTestId('text-input');
  const input = textInput.querySelector('input')!;

  act(() => {
    fireEvent.focus(input);
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

it('输入框获取焦点时，按下向上或向下方向键，弹出选项列表', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { getByTestId, container } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        options={options}
        getOptionLabel={(_) => _.title}
      />
    </ThemeProvider>,
  );
  const textInput = getByTestId('text-input');
  const input = textInput.querySelector('input')!;

  act(() => {
    fireEvent.focus(input);
  });

  act(() => {
    fireEvent.keyDown(input, {
      key: 'ArrowUp',
      code: 'ArrowUp',
    });
  });

  jest.runAllTimers();

  const popupIndicator = textInput.querySelector(
    '.sinoui-auto-complete__popup-indicator',
  );

  expect(
    container
      .querySelector('.sinoui-auto-complete__option-list')
      ?.querySelectorAll('.sinoui-list-item').length,
  ).toBe(3);
  expect(popupIndicator).toHaveStyleRule('transform', 'rotate(180deg)');

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

  act(() => {
    fireEvent.keyDown(input, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });
  });

  jest.runAllTimers();
  expect(
    container
      .querySelector('.sinoui-auto-complete__option-list')
      ?.querySelectorAll('.sinoui-list-item').length,
  ).toBe(3);
});

it('自定义弹窗出现时的动效', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const CustomTranstionComp = (props: any) => (
    <Collapse {...props} data-testid="collapse" />
  );
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        openOnFocus
        renderInput={renderInput}
        TransitionComponent={CustomTranstionComp}
        options={options}
        getOptionLabel={(_) => _.title}
      />
    </ThemeProvider>,
  );
  const textInput = getByTestId('text-input');
  const input = textInput.querySelector('input')!;

  act(() => {
    fireEvent.focus(input);
  });

  expect(getByTestId('collapse')).toBeInTheDocument();
});

it('选项列表关闭状态下，在输入框中输入值，弹出选项列表', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { getByTestId, container } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        openOnFocus
        renderInput={renderInput}
        options={options}
        getOptionLabel={(_) => _.title}
      />
    </ThemeProvider>,
  );
  const textInput = getByTestId('text-input');
  const input = textInput.querySelector('input')!;

  // 弹出弹窗
  act(() => {
    fireEvent.focus(input);
  });

  // 关闭弹窗
  act(() => {
    fireEvent.keyDown(input, {
      key: 'Escape',
      code: 'Escape',
    });
  });

  act(() => {
    fireEvent.change(input, {
      target: {
        value: 'item 1',
      },
    });
  });

  jest.runAllTimers();
  expect(
    container
      .querySelector('.sinoui-auto-complete__option-list')
      ?.querySelectorAll('.sinoui-list-item').length,
  ).toBe(1);
});

it('closeOnSelect=false时， 点击选项，不关闭弹窗', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const onChange = jest.fn();
  const { getByTestId, container } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        closeOnSelect={false}
        closeOnEscape={false}
        options={options}
        getOptionLabel={(_) => _.title}
        onChange={onChange}
      />
    </ThemeProvider>,
  );
  const input = getByTestId('text-input').querySelector('input')!;
  act(() => {
    fireEvent.click(input);
  });

  act(() => {
    const firstItem = container.querySelector('.sinoui-list-item')!;
    fireEvent.click(firstItem);
  });

  expect(input).toHaveValue('item 1');
  expect(onChange).toHaveBeenCalledWith(
    options[0],
    AutoCompleteChangeReason.selectOption,
  );

  jest.runAllTimers();
  expect(container.querySelector('.sinoui-list-item')).toBeInTheDocument();
});

it('使用方向键切换聚焦选项', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const scrollIntoViewMock = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  const { getByTestId, container } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        openOnFocus
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
      key: 'ArrowUp',
      code: 'ArrowUp',
    });
  });

  jest.runAllTimers();

  expect(
    container.querySelector('.sinoui-list-item--focused'),
  ).toHaveTextContent('item 3');

  act(() => {
    fireEvent.keyDown(input, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });
  });

  jest.runAllTimers();
  expect(
    container.querySelector('.sinoui-list-item--focused'),
  ).toHaveTextContent('item 1');
});

it('clearOnEscape', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        value={options[0]}
        renderInput={renderInput}
        options={options}
        getOptionLabel={(_) => _.title}
        onChange={onChange}
        clearOnEscape
      />
    </ThemeProvider>,
  );

  const input = getByTestId('text-input').querySelector('input')!;

  act(() => {
    fireEvent.keyDown(input, {
      key: 'Escape',
      code: 'Escape',
    });
  });

  expect(onChange).toBeCalledWith(null, AutoCompleteChangeReason.clear);
  expect(input).toHaveValue('');
});

it('clearOnEscape，无值时不调用onChange', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        renderInput={renderInput}
        options={options}
        getOptionLabel={(_) => _.title}
        onChange={onChange}
        clearOnEscape
      />
    </ThemeProvider>,
  );

  const input = getByTestId('text-input').querySelector('input')!;

  act(() => {
    fireEvent.change(input, { target: { value: 'item 1' } });
  });

  act(() => {
    fireEvent.keyDown(input, {
      key: 'Escape',
      code: 'Escape',
    });
  });

  expect(onChange).not.toBeCalled();
});

it('禁止输入框文本为空时清空值', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        value={options[0]}
        renderInput={renderInput}
        options={options}
        getOptionLabel={(_) => _.title}
        onChange={onChange}
        clearable={false}
      />
    </ThemeProvider>,
  );

  const input = getByTestId('text-input').querySelector('input')!;
  act(() => {
    fireEvent.change(input, {
      target: { value: '' },
    });
  });

  expect(onChange).not.toBeCalled();
});

it('value发生变化，同步到输入框', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const onChange = jest.fn();
  const { getByTestId, rerender } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        value={options[0]}
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
        value={options[1]}
        renderInput={renderInput}
        options={options}
        getOptionLabel={(_) => _.title}
        onChange={onChange}
      />
    </ThemeProvider>,
  );
  expect(input).toHaveValue('item 2');
});

it('选项列表展现时，按下home键，第一个选项高亮', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { getByTestId, container } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        openOnFocus
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
      key: 'Home',
      code: 'Home',
    });
  });

  jest.runAllTimers();

  expect(
    container.querySelector('.sinoui-list-item--focused'),
  ).toHaveTextContent('item 1');
});

it('选项列表为打开状态，按下End键，最后一个选项被选中', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { getByTestId, container } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        openOnFocus
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
    container.querySelector('.sinoui-list-item--focused'),
  ).toHaveTextContent('item 3');
});

it('handleHomeEndKeys=false，按下Home键或者End键，不会引起焦点变化', () => {
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { getByTestId, container } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        openOnFocus
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

  expect(container.querySelectorAll('.sinoui-list-item--focused')).toHaveLength(
    0,
  );

  act(() => {
    fireEvent.keyDown(input, {
      key: 'Home',
      code: 'Home',
    });
  });

  jest.runAllTimers();
  expect(container.querySelectorAll('.sinoui-list-item--focused')).toHaveLength(
    0,
  );
});

it('有聚焦选项时，按下Enter键，该选项被选中', () => {
  const onChange = jest.fn();
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        openOnFocus
        renderInput={renderInput}
        options={options}
        getOptionLabel={(_) => _.title}
        onChange={onChange}
      />
    </ThemeProvider>,
  );
  const textInput = getByTestId('text-input');
  const input = textInput.querySelector('input')!;

  // openOnFocus状态下获取焦点时弹出弹窗
  act(() => {
    fireEvent.focus(input);
  });

  // 聚焦第一项
  act(() => {
    fireEvent.keyDown(input, {
      key: 'Home',
      code: 'Home',
    });
  });

  act(() => {
    fireEvent.keyDown(input, {
      key: 'Enter',
      code: 'Enter',
    });
  });

  jest.runAllTimers();

  expect(onChange).toHaveBeenCalledWith({ title: 'item 1' }, 'select-option');
});

it('没有聚焦选项时，按下Enter键，无副作用', () => {
  const onChange = jest.fn();
  const renderInput = (props: any) => (
    <TextInput {...props} data-testid="text-input" />
  );
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <AutoComplete
        openOnFocus
        renderInput={renderInput}
        options={options}
        getOptionLabel={(_) => _.title}
        onChange={onChange}
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
      key: 'Enter',
      code: 'Enter',
    });
  });

  jest.runAllTimers();

  expect(onChange).not.toHaveBeenCalled();
});

describe('multiple', () => {
  const renderTags = ({ tags, getTagProps }: RenderTagsProps) =>
    tags.map((tag, index) => {
      const { onDelete, ...rest } = getTagProps(index);
      return (
        <div key={tag} {...rest} data-testid="tag" className="sinoui-chip">
          {tag}
          <button type="button" data-testid="remove-tag" onClick={onDelete}>
            删除
          </button>
        </div>
      );
    });

  it('展现多个选项', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          value={[options[0], options[2]]}
          renderInput={renderInput}
        />
      </ThemeProvider>,
    );

    const tags = getByTestId('text-input').querySelectorAll('.sinoui-chip');
    expect(tags.length).toBe(2);
    expect(tags[0]).toHaveTextContent('item 1');
    expect(tags[1]).toHaveTextContent('item 3');
  });

  it('输入框文本默认为空', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          value={[options[0], options[2]]}
          renderInput={renderInput}
        />
      </ThemeProvider>,
    );

    expect(getByTestId('text-input').querySelector('input')).toHaveValue('');
  });

  it('renderTags', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const { getAllByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          value={[options[0], options[2]]}
          renderInput={renderInput}
          renderTags={renderTags}
        />
      </ThemeProvider>,
    );
    expect(getAllByTestId('tag').length).toBe(2);
  });

  it('点击未选中选项，将选项添加到值中', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const onChange = jest.fn();
    const { getByTestId, container } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          renderInput={renderInput}
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.click(getByTestId('text-input'));
    });

    act(() => {
      const item1 = container.querySelector('.sinoui-list-item');
      fireEvent.click(item1!);
    });

    expect(onChange).toBeCalledWith(
      [options[0]],
      AutoCompleteChangeReason.createOption,
    );
  });

  it('点击已选中选项，将选项添加到值中', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const onChange = jest.fn();
    const { getByTestId, container } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          renderInput={renderInput}
          onChange={onChange}
          value={[options[0]]}
        />
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.click(getByTestId('text-input'));
    });

    act(() => {
      const item1 = container.querySelector('.sinoui-list-item');
      fireEvent.click(item1!);
    });

    expect(onChange).toBeCalledWith([], AutoCompleteChangeReason.removeOption);
  });

  it('点击选项，清空输入框值', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const onChange = jest.fn();
    const { getByTestId, container } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          renderInput={renderInput}
          onChange={onChange}
          value={[options[0]]}
        />
      </ThemeProvider>,
    );

    const input = getByTestId('text-input').querySelector('input')!;

    act(() => {
      fireEvent.focus(input);
      fireEvent.change(input, {
        target: { value: 'item 1' },
      });
    });

    act(() => {
      const item1 = container.querySelector('.sinoui-list-item');
      fireEvent.click(item1!);
    });

    expect(input).toHaveValue('');
  });

  it('点击选项标签时，获取焦点', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          value={[options[0], options[2]]}
          renderInput={renderInput}
        />
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.click(getByTestId('text-input').querySelector('.sinoui-chip')!);
    });

    expect(document.activeElement).toBe(
      getByTestId('text-input').querySelector('input'),
    );
  });

  it('点击选项标签的删除图标时，不获取焦点', () => {
    // TODO: 等待renderTags
  });

  it('openOnClickTags = false', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          value={[options[0], options[2]]}
          renderInput={renderInput}
          openOnClickTags={false}
        />
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.click(getByTestId('text-input').querySelector('.sinoui-chip')!);
    });

    expect(document.activeElement).not.toBe(
      getByTestId('text-input').querySelector('input'),
    );
  });

  it('tagVariant', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" variant="filled" />
    );
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          value={[options[0], options[2]]}
          renderInput={renderInput}
          openOnClickTags={false}
          tagVariant="outlined"
        />
      </ThemeProvider>,
    );

    expect(container.querySelectorAll('.sinoui-chip--outlined').length).toBe(2);
  });

  it('点击选项标签删除按钮，将选项从值中移除', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const onChange = jest.fn();
    const { getAllByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          value={[options[0], options[2]]}
          renderInput={renderInput}
          renderTags={renderTags}
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    fireEvent.click(getAllByTestId('remove-tag')[1]);

    expect(onChange).toBeCalledWith(
      [options[0]],
      AutoCompleteChangeReason.removeOption,
    );
  });

  it('点击选项标签删除按钮，输入框不获取焦点', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const onChange = jest.fn();
    const { getAllByTestId, getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          value={[options[0], options[2]]}
          renderInput={renderInput}
          renderTags={renderTags}
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.click(getAllByTestId('remove-tag')[1]);
    });

    expect(document.activeElement).not.toBe(
      getByTestId('text-input').querySelector('input'),
    );
  });

  it('输入框清空时，不清空值', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const onChange = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          value={[options[0], options[2]]}
          renderInput={renderInput}
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    const input = getByTestId('text-input').querySelector('input')!;

    act(() => {
      fireEvent.change(input!, { target: { value: '' } });
    });

    expect(onChange).not.toBeCalled();
  });

  it('在空的输入框中按下Backsapce，删除最后一个选中选项', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const onChange = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          value={[options[0], options[2]]}
          renderInput={renderInput}
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    const input = getByTestId('text-input').querySelector('input')!;

    act(() => {
      fireEvent.keyDown(input!, { code: 'Backspace', key: 'Backspace' });
    });

    expect(onChange).toBeCalledWith(
      [options[0]],
      AutoCompleteChangeReason.removeOption,
    );
  });

  it('输入框有点时，按下向左键，焦点转移到最后一个选项标签中', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const onChange = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          value={[options[0], options[2]]}
          renderInput={renderInput}
          onChange={onChange}
          renderTags={renderTags}
        />
      </ThemeProvider>,
    );

    const textInput = getByTestId('text-input');
    const input = textInput.querySelector('input')!;
    act(() => {
      // 聚焦输入框
      fireEvent.click(input);
      fireEvent.focus(input);
    });

    act(() => {
      fireEvent.keyDown(textInput, { key: 'ArrowLeft' });
    });

    expect(document.activeElement).toBe(
      textInput.querySelector('[data-tag-index="1"]'),
    );
  });
});

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
});
