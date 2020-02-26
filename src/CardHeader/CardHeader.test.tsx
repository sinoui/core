import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom/extend-expect';
import CardHeader from './CardHeader';

const Avatar = () => {
  return (
    <div
      style={{
        height: '40px',
        width: '40px',
        backgroundColor: '#f44336',
        borderRadius: '4px',
      }}
    />
  );
};

it('正确渲染CardHeader', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <CardHeader
          avatar={Avatar}
          title="Shrimp and Chorizo Paella"
          subheader="subheader"
        />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
