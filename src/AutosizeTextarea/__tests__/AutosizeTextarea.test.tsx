import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import AutosizeTextarea from '../AutosizeTextarea';

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

it('在非受控模式自动调整高度', () => {
  const changeCallback = jest.fn();
  const { getByTestId } = render(
    <AutosizeTextarea data-testid="textarea" onChange={changeCallback} />,
  );

  const textarea = getByTestId('textarea');

  fireEvent.change(textarea, { target: { value: '123' } });

  expect(changeCallback).toBeCalled();
});
