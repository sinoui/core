import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Row from './Row';
import Column from './Column';

describe('布局Column单元测试', () => {
  afterEach(cleanup);
  it('自定义class样式', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Column className="custom" />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  const gutter = 8;
  it(`gutter=${gutter}是Column的内边距`, () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Row gutter={gutter}>
          <Column data-testid="row-column">column</Column>
        </Row>
      </ThemeProvider>,
    );
    const column = getByTestId('row-column');
    expect(column).toHaveStyle(`padding-left: ${gutter / 2}px`);
    expect(column).toHaveStyle(`padding-right: ${gutter / 2}px`);
  });

  it(`Column启用flex布局`, () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Row gutter={gutter}>
          <Column
            flexContainer
            data-testid="row-column"
            justifyContent="center"
            alignItems="center"
            xs="24"
          >
            column
          </Column>
        </Row>
      </ThemeProvider>,
    );
    const column = getByTestId('row-column');
    expect(column).toHaveStyle(`display: flex`);
    expect(column).toHaveStyle('justify-content: center');
    expect(column).toHaveStyle('align-items: center');
  });

  // it(`Column不设置xs`, () => {
  //   const { getByTestId } = render(
  //     <ThemeProvider theme={defaultTheme}>
  //       <Row gutter={gutter}>
  //         <Column data-testid="row-column">column</Column>
  //       </Row>
  //     </ThemeProvider>,
  //   );
  //   const column = getByTestId('row-column');
  //   expect(column).toHaveStyle(`flex-grow: 1`);
  // });
});
describe('布局Column快照测试', () => {
  it('默认', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Row>
            <Column>列</Column>
          </Row>
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('栅格布局', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Row>
            <Column xs={12}>列</Column>
          </Row>
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
