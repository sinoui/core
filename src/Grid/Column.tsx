import styled, { css } from 'styled-components';
import classNames from 'classnames';

/**
 * 列布局
 */

interface Props {
  xs: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  flexContainer?: boolean;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-between';
  alignItems?: 'flex-start' | 'flex-end' | 'center';
}

const flexCss = css<Props>`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  align-items: ${(props) => props.alignItems || 'flex-start'};
`;
const Column = styled.div.attrs(() => ({
  className: classNames('sinoui-column'),
}))<Props>`
  display: block;
  box-sizing: border-box;
  ${(props) => props.flexContainer && flexCss}

  & >  div {
    background: pink;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    width: ${(props) => (props.xs / 24) * 100}%;
  }

  @media (min-width: ${(props) =>
      props.theme.breakpoints.sm}px) and (max-width: ${(props) =>
      props.theme.breakpoints.md}px) {
    width: ${(props) => ((props.sm || props.xs) / 24) * 100}%;
  }

  @media (min-width: ${(props) =>
      props.theme.breakpoints.md}px) and (max-width: ${(props) =>
      props.theme.breakpoints.lg}px) {
    width: ${(props) => ((props.md || props.sm || props.xs) / 24) * 100}%;
  }

  @media (min-width: ${(props) =>
      props.theme.breakpoints.lg}px) and (max-width: ${(props) =>
      props.theme.breakpoints.xl}px) {
    width: ${(props) =>
      ((props.lg || props.md || props.sm || props.xs) / 24) * 100}%;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.xl}px) {
    width: ${(props) =>
      ((props.xl || props.lg || props.md || props.sm || props.xs) / 24) * 100}%;
  }
`;
export default Column;
