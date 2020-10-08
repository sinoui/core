import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';
import AutosizeTextarea from '../AutosizeTextarea';
import resizeTextarea from '../resizeTextarea';

afterEach(cleanup);

jest.mock('../resizeTextarea');
jest.useFakeTimers();

afterEach(() => {
  (resizeTextarea as jest.Mock).mockReset();
});

afterAll(() => {
  jest.unmock('../resizeTextarea');
});

it('渲染文本域', () => {
  const tree = renderer.create(<AutosizeTextarea />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('给文本域添加样式', () => {
  const tree = renderer
    .create(
      <AutosizeTextarea
        style={{
          boxSizing: 'border-box',
        }}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('初始化时调整高度', () => {
  const { container, getByTestId } = render(
    <AutosizeTextarea data-testid="textarea" minRows={1} maxRows={3} />,
  );

  const textarea = getByTestId('textarea');
  const shadow = container.querySelector('textarea[aria-hidden="true"]');

  expect(resizeTextarea).toBeCalledTimes(1);
  expect(resizeTextarea).toBeCalledWith(textarea, shadow, 1, 3);
});

it('用于计算的多行文本域应该有相同的className和style', () => {
  const { container } = render(
    <AutosizeTextarea
      className="sinoui-test-textarea"
      style={{
        marginTop: 10,
        boxSizing: 'border-box',
      }}
    />,
  );
  const shadow = container.querySelector('textarea[aria-hidden="true"]');
  expect(shadow).toHaveClass('sinoui-test-textarea');
  expect(shadow).toHaveStyle('margin-top: 10px; box-sizing: border-box;');
});

it('用于计算的多行文本域应不可见', () => {
  const { container } = render(<AutosizeTextarea />);
  const shadow = container.querySelector('textarea[aria-hidden="true"]');

  expect(shadow).toHaveAttribute('tabIndex', '-1');
  expect(shadow).toHaveStyle(`
    visibility: hidden;
    pointer-events: none;
    height: 0px;
    min-height: 0;
    max-height: 0;
    overflow: hidden;
    transform: translateZ(0);
    position: absolute;
    top: 0px;
    left: 0px;
  `);
});

it('ref 引用 textarea', () => {
  const textareaRef = React.createRef<HTMLTextAreaElement>();
  const { getByTestId } = render(
    <AutosizeTextarea data-testid="textarea" ref={textareaRef} />,
  );

  expect(getByTestId('textarea')).toBe(textareaRef.current);
});

it('minRows', () => {
  const { getByTestId } = render(
    <AutosizeTextarea minRows={3} data-testid="textarea" />,
  );

  expect(getByTestId('textarea')).toHaveAttribute('rows', '3');
});

it('在非受控模式自动调整高度', () => {
  const changeCallback = jest.fn();
  const { getByTestId } = render(
    <AutosizeTextarea data-testid="textarea" onChange={changeCallback} />,
  );

  const textarea = getByTestId('textarea');

  fireEvent.change(textarea, { target: { value: '123' } });

  expect(changeCallback).toBeCalled();
  expect(resizeTextarea).toBeCalledTimes(2); // 两次调用，第一次是初始化时调用；第二次是值变更时调用
});

it('窗口调整时自动调整高度', () => {
  render(<AutosizeTextarea />);

  (resizeTextarea as jest.Mock).mockReset();

  fireEvent(window, new Event('resize'));
  fireEvent(window, new Event('resize'));
  fireEvent(window, new Event('resize'));

  jest.runAllTimers();

  expect(resizeTextarea).toBeCalledTimes(1); // 因debounce，所以是只调用1次
});
