import { css } from 'styled-components';
import { opacify } from 'polished';

const textButtonStyle = css`
  ${({ theme }) => ({ ...theme.typography.button })};
  min-width: 64px;
  height: 36px;
  color: ${({ theme }) => theme.palette.primary.main};
  user-select: none;
  transition: background-color 100ms ease-in-out;
  padding: 0px 8px;
  overflow: hidden;
  box-sizing: border-box;

  &:hover {
    background-color: ${({ theme }) =>
      opacify(
        theme.palette.action.hoverOpacity - 1,
        theme.palette.primary.main,
      )};
  }
`;

export default textButtonStyle;
