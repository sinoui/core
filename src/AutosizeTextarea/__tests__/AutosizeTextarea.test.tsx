import React from 'react';
import renderer from 'react-test-renderer';
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
