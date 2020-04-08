import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';
import { defaultTheme } from '@sinoui/theme';
import BaseInputLayout from '../BaseInputLayout';

it('单行输入框', () => {
  const tree = renderer
    .create(
      <BaseInputLayout theme={defaultTheme}>
        <input />
      </BaseInputLayout>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('多行输入框', () => {
  const tree = renderer
    .create(
      <BaseInputLayout theme={defaultTheme}>
        <textarea />
      </BaseInputLayout>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('禁用状态', () => {
  const tree = renderer
    .create(
      <BaseInputLayout theme={defaultTheme} $disabled>
        <textarea />
      </BaseInputLayout>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('cursor', 'default');
  expect(tree).toHaveStyleRule(
    'color',
    defaultTheme.palette.text.disabled.replace(/ +/g, ''),
  );
});

it('全宽模式', () => {
  const tree = renderer.create(
    <BaseInputLayout theme={defaultTheme} $fullWidth>
      <textarea />
    </BaseInputLayout>,
  );

  expect(tree).toMatchSnapshot();
});
