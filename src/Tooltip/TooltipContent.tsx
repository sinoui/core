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
    bottom: 6px;
  }
  [data-popper-placement^='bottom'] > & > [data-popper-arrow] {
    top: -5px;
  }
  [data-popper-placement='top'] > & > [data-popper-arrow],
  [data-popper-placement='bottom'] > & > [data-popper-arrow] {
    margin-left: -5px;
  }
  [data-popper-placement='bottom-start'] > & > [data-popper-arrow],
  [data-popper-placement='top-start'] > & > [data-popper-arrow] {
    margin-left: -20px;
  }
  [data-popper-placement='bottom-end'] > & > [data-popper-arrow],
  [data-popper-placement='top-end'] > & > [data-popper-arrow] {
    margin-left: 11px;
  }

  [data-popper-placement^='right'] > & > [data-popper-arrow] {
    left: -5px;
  }
  [data-popper-placement^='left'] > & > [data-popper-arrow] {
    right: 6px;
  }
  [data-popper-placement='left'] > & > [data-popper-arrow],
  [data-popper-placement='right'] > & > [data-popper-arrow] {
    margin-top: -5px;
  }
  [data-popper-placement='right-start'] > & > [data-popper-arrow],
  [data-popper-placement='left-start'] > & > [data-popper-arrow] {
    margin-top: -12px;
  }
  [data-popper-placement='right-end'] > & > [data-popper-arrow],
  [data-popper-placement='left-end'] > & > [data-popper-arrow] {
    margin-top: 2px;
  }
  [data-small] {
    display: block;
  }
  [data-small] ~ *:not([data-small]) {
    display: none;
  }
`;

const pcStyle = css`
  padding: 3.2px 8px;
`;

const mobileStyle = css`
  padding: 7.2px 16px;
`;

const TooltipContent = styled.div`
  display: block;
  box-sizing: border-box;
  background-color: rgb(97, 97, 97);
  color: #fff;
  border-radius: 4px;

  ${(props) => props.theme.typography.caption};
  font-family: ${(props) => props.theme.typography.fontFamily};
  line-height: 1.5;
  ${pcStyle}
  ${arrowStyle};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    ${mobileStyle}
  }
`;

export default TooltipContent;
