/**
 * @jest-environment jsdom
 */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';
import OptionList from '../OptionList';

afterEach(cleanup);

it('不分组数据渲染', () => {
  const simepleOptions = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
  ];
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <OptionList
          options={simepleOptions}
          getOptionLabel={(option) => option.title}
        />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('分组渲染', () => {
  const groupedOptions = [
    { title: '12 Angry Men', year: 1957 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: '3 Idiots', year: 2009 },
    { title: 'American History X', year: 1998 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'American Beauty', year: 1999 },
    { title: 'Aliens', year: 1986 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Amadeus', year: 1984 },
  ];

  const groupBy = (option: any) => {
    const firstLetter = option.title[0].toUpperCase();
    return /[0-9]/.test(firstLetter) ? '0-9' : firstLetter;
  };
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <OptionList
          options={groupedOptions}
          getOptionLabel={(option) => option.title}
          groupBy={groupBy}
        />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('无数据时显示，没有选项可供选择', () => {
  const { getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <OptionList options={[]} getOptionLabel={(option) => option.title} />
    </ThemeProvider>,
  );

  expect(getByText('没有选项可供选择')).toBeInTheDocument();
});

it('loading属性为true时，显示加载中图标', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <OptionList
        loading
        options={[]}
        getOptionLabel={(option) => option.title}
      />
    </ThemeProvider>,
  );

  expect(container.querySelector('.sinoui-progress')).toBeInTheDocument();
});

it('通过disabledOptions属性指定不可用的选项', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <OptionList
        disabledOptions={['item2']}
        options={['item1', 'item2', 'item3']}
        getOptionLabel={(option) => option as any}
        groupBy={(option) => option[0].toUpperCase()}
      />
    </ThemeProvider>,
  );

  expect(
    container.querySelector('.sinoui-list-item--disabled'),
  ).toHaveTextContent('item2');
});

it('通过focusedOption属性指定高亮选项', () => {
  const { container } = render(
    <ThemeProvider theme={defaultTheme}>
      <OptionList
        focusedOption="item2"
        options={['item1', 'item2', 'item3']}
        getOptionLabel={(option) => option as any}
        groupBy={(option) => option[0].toUpperCase()}
      />
    </ThemeProvider>,
  );

  expect(
    container.querySelector('.sinoui-list-item--focused'),
  ).toHaveTextContent('item2');
});
