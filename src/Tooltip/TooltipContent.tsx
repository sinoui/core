import styled, { css } from 'styled-components';

const arrowStyle = css<{ hide?: boolean }>`
  ${({ hide }) =>
    hide &&
    css`
      &[data-popper-escaped] {
        opacity: 0.5;
      }
      &[data-popper-reference-hidden] {
        opacity: 0;
      }
    `}
  [data-popper-placement^='top'] > & > [data-popper-arrow] {
    bottom: -4px;
  }
  [data-popper-placement^='right'] > & > [data-popper-arrow] {
    left: -4px;
  }
  [data-popper-placement^='bottom'] > & > [data-popper-arrow] {
    top: -4px;
  }
  [data-popper-placement^='left'] > & > [data-popper-arrow] {
    right: -4px;
  }
  [data-small] {
    display: block;
  }
  [data-small] ~ *:not([data-small]) {
    display: none;
  }
`;

const pcStyle = css`
  padding: 6px 8px;
`;

const mobileStyle = css`
  padding: 10px 16px;
`;

const TooltipContent = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: rgba(97, 97, 97);
  color: #fff;
  border-radius: 4px;

  ${(props) => ({
    ...props.theme.typography.caption,
  })}
  ${pcStyle}
  ${arrowStyle};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    ${mobileStyle}
  }
`;

export default TooltipContent;
