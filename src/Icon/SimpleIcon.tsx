import styled from 'styled-components';
import { transitions } from '@sinoui/theme';
import classNames from 'classnames';

const SimpleIcon = styled.span.attrs(({ className }) => ({
  className: classNames('sinoui-icon', className),
}))`
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px; /* Preferred icon size */
  max-width: 1em;
  display: inline-block;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';

  color: currentColor;
  transition: ${transitions.create('color', {
    duration: transitions.duration.shorter,
  })};
`;

SimpleIcon.sinouiName = 'Icon';

export default SimpleIcon;
