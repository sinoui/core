import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import OptionList from '../OptionList';

it('不分组数据渲染', () => {
  const simepleOptions = [
    {
      key: '1',
      groupTitle: '',
      options: [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
      ],
    },
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
    {
      key: '1',
      groupTitle: '0-9',
      options: [
        { title: '12 Angry Men', year: 1957 },
        { title: '2001: A Space Odyssey', year: 1968 },
        { title: '3 Idiots', year: 2009 },
      ],
    },
    {
      key: '2',
      groupTitle: 'A',
      options: [
        { title: 'American History X', year: 1998 },
        { title: 'Apocalypse Now', year: 1979 },
        { title: 'Alien', year: 1979 },
        { title: 'American Beauty', year: 1999 },
        { title: 'Aliens', year: 1986 },
        { title: 'Amélie', year: 2001 },
        { title: 'A Clockwork Orange', year: 1971 },
        { title: 'Amadeus', year: 1984 },
      ],
    },
  ];
  const tree = renderer
    .create(
      <ThemeProvider theme={defaultTheme}>
        <OptionList
          options={groupedOptions}
          getOptionLabel={(option) => option.title}
          groupBy={(option) => option.groupTitle}
        />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('无数据时显示，没有选项可供选择', () => {
  const { getByText } = render(
    <ThemeProvider theme={defaultTheme}>
      <OptionList
        options={[{ key: '1', groupTitle: '', options: [] }]}
        getOptionLabel={(option) => option.title}
        groupBy={(option) => option.groupTitle}
      />
    </ThemeProvider>,
  );

  expect(getByText('没有选项可供选择')).toBeInTheDocument();
});
