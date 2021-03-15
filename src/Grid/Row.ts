import styled, { css } from 'styled-components';
import classNames from 'classnames';

/**
 * 行布局
 */
export interface RowProps {
  /**
   * 列间距
   */
  gutter?: number;
  /**
   * 行两边留白方式
   */
  gutterType?: 'around' | 'between';
  /**
   * 主轴对齐方式
   */
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-between';
  /**
   * 交叉轴对齐方式
   */
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  /**
   * 自定义样式名称
   */
  className?: string;
}

const gutterBetweenCss = css<RowProps>`
  width: calc(100% + ${({ gutter = 0 }) => gutter}px);
  margin: 0 -${({ gutter = 0 }) => gutter / 2}px;
`;

const Row = styled.div.attrs(() => ({
  className: classNames('sinoui-row'),
}))<RowProps>`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  align-items: ${(props) => props.alignItems || 'flex-start'};
  ${({ gutterType = 'between' }) =>
    gutterType === 'between' && gutterBetweenCss}

  & > *.sinoui-column {
    padding: 0 ${({ gutter = 0 }) => gutter / 2}px;
  }
`;

export default Row;
