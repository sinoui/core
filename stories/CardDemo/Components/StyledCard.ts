import styled, { css } from 'styled-components';
import { opacify } from 'polished';
import Card from '@sinoui/core/Card';

const disabledCss = css`
  &::before {
    background-color: ${opacify(-0.62, '#fff')};
  }
`;

const enableCss = css`
  &:hover::before {
    background-color: ${opacify(-0.92, '#fff')};
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows[8]};
  }

  &:focus::before {
    background-color: ${opacify(-0.76, '#fff')};
    box-shadow: ${({ theme }) => theme.shadows[8]};
  }

  &:active {
    box-shadow: ${({ theme }) => theme.shadows[8]};
  }
`;

const StyledCard = styled(Card)<{ disabled?: boolean }>`
  padding: 16px;
  background-color: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.primary.contrastText};
  cursor: pointer;
  ${(props) => (props.disabled ? disabledCss : enableCss)}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  & h1 {
    margin: 0;
  }

  & svg {
    font-size: 24px;
    position: absolute;
    right: 16px;
  }
`;

export default StyledCard;
