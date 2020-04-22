import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
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

describe('快照测试', () => {
  it('头像+主标题+副标题+操作的CardHeader', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <CardHeader
            avatar={Avatar}
            title="Shrimp and Chorizo Paella"
            subheader="subheader"
            action={[<span>icon</span>]}
          />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('只有主标题的CardHeader', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <CardHeader title="Shrimp and Chorizo Paella" />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
