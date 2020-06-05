import React from 'react';
import styled from 'styled-components';
import { render, cleanup } from '@testing-library/react';
import 'jest-styled-components';
import gridCellCss, { GridCellProps } from '../gridCellCss';

afterEach(cleanup);

it('网格单元格样式', () => {
  const Demo = styled.div<GridCellProps>`
    ${gridCellCss}
  `;

  const { getByTestId } = render(
    <Demo data-testid="demo" row={10} column={2} />,
  );

  expect(getByTestId('demo')).toHaveStyleRule('-ms-grid-row', '10');
  expect(getByTestId('demo')).toHaveStyleRule('-ms-grid-column', '2');
});
