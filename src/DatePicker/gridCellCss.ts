export interface GridCellProps {
  row: number;
  column: number;
}

/**
 * 网格单元格样式（兼容IE11）
 */
const gridCellCss = ({ row, column }: GridCellProps): any => ({
  msGridColumn: `${column}`,
  msGridRow: `${row}`,
});

export default gridCellCss;
