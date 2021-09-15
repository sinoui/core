/**
 * @jest-environment jsdom
 */
import TextInput from '@sinoui/core/TextInput';
import { defaultTheme } from '@sinoui/theme';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import AutoComplete, { AutoCompleteChangeReason } from '../AutoComplete';
import { RenderTagsProps } from '../types';

afterEach(cleanup);

const options = [{ title: 'item 1' }, { title: 'item 2' }, { title: 'item 3' }];

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
          portal={false}
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
          portal={false}
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
          portal={false}
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

  it('多选密集模式', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          dense
          value={[options[0], options[2]]}
          renderInput={renderInput}
        />
      </ThemeProvider>,
    );

    expect(
      container.querySelector('.sinoui-auto-complete--dense'),
    ).toBeInTheDocument();
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

  it('在聚焦的选项标签上按下退格键，删除此选项', () => {
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

    act(() => {
      fireEvent.keyDown(textInput.querySelector('[data-tag-index="1"]')!, {
        key: 'Backspace',
      });
    });

    expect(onChange).toBeCalledWith(
      [options[0]],
      AutoCompleteChangeReason.removeOption,
    );
  });

  it('焦点在选项标签上时，按下任意键，输入框获取焦点', () => {
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

    act(() => {
      fireEvent.keyDown(textInput, { key: 'A' });
    });

    expect(document.activeElement).toBe(input);
  });

  it('限定标签个数，当选中项个数大于标签个数且不获取焦点的状态下，显示隐藏标签个数', () => {
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
          dense
          value={[options[0], options[2]]}
          limitTags={1}
          renderInput={renderInput}
        />
      </ThemeProvider>,
    );

    expect(getByTestId('text-input')).toHaveTextContent('+1');
  });

  it('限定标签个数，当选中项个数大于标签个数且获取焦点状态下，不显示隐藏标签个数', () => {
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
          dense
          value={[options[0], options[2]]}
          limitTags={1}
          renderInput={renderInput}
        />
      </ThemeProvider>,
    );
    const input = getByTestId('text-input').querySelector('input')!;
    act(() => {
      fireEvent.focus(input);
    });
    expect(getByTestId('text-input')).not.toHaveTextContent('+1');
    expect(getByTestId('text-input')).toHaveTextContent('item 1item 3');
  });

  it('值为空数组时，没有默认选中项', () => {
    const renderInput = (props: any) => (
      <TextInput {...props} data-testid="text-input" />
    );
    const { container, getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <AutoComplete
          openOnFocus
          options={options}
          getOptionLabel={(_) => _.title}
          multiple
          value={[]}
          renderInput={renderInput}
        />
      </ThemeProvider>,
    );

    const input = getByTestId('text-input').querySelector('input')!;
    act(() => {
      fireEvent.focus(input);
    });

    expect(
      container.querySelectorAll('.sinoui-list-item--focused'),
    ).toHaveLength(0);
  });
});
