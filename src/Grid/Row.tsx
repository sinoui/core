import styled, { css } from 'styled-components';
import classNames from 'classnames';

/**
 * 行布局
 */
export interface RowProps {
  gutter?: number;
  gutterType?: 'around' | 'between';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-between';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
}

const gutterBetweenCss = css<RowProps>`
  width: calc(100% + ${({ gutter }) => gutter}px);
  margin: 0px -${({ gutter = 0 }) => gutter / 2}px;
`;

const gutterAroundCss = css<RowProps>`
  margin: 0px ${({ gutter = 0 }) => gutter / 2}px;
`;

const Row = styled.div.attrs(() => ({
  className: classNames('sinoui-row'),
}))<RowProps>`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  align-items: ${(props) => props.alignItems || 'flex-start'};
  ${(props) =>
    props.gutterType === 'around' ? gutterAroundCss : gutterBetweenCss}

  & > *.sinoui-column {
    padding: 0 ${({ gutter = 0 }) => gutter / 2}px;
  }
`;

export default Row;
