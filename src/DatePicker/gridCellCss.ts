import { css } from 'styled-components';

export interface GridCellProps {
  row: number;
  column: number;
}

/**
 * 网格单元格样式（兼容IE11）
 */
const gridCellCss = css<GridCellProps>`
  -ms-grid-column: ${({ column }) => column};
  -ms-grid-row: ${({ row }) => row};
`;

export default gridCellCss;
