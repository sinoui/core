import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import FormGroup from '../FormGroup';

it('横向排列选项', () => {
  const tree = renderer.create(<FormGroup />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('纵向排列选项', () => {
  const tree = renderer.create(<FormGroup column />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('纵向3列排列选项', () => {
  const tree = renderer.create(<FormGroup columns={3} />).toJSON();

  expect(tree).toMatchSnapshot();
});
