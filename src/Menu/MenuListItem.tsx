import styled from 'styled-components';
import { Theme } from '@sinoui/theme';
import adjustOpacity from '@sinoui/core/utils/adjustOpacity';
import Item, { ListItemProps } from './ListItem';
import singleLineTextCss from '../utils/singleLineTextCss';

const getFocusStyle = (props: ListItemProps & { theme: Theme }) => {
  if (props.selected) {
    if (props.role === 'option') {
      return `background-color: ${adjustOpacity(
        0.2,
        props.theme.palette.primary.main,
      )}`;
    }

    return `background-color: ${props.theme.palette.action.selected}`;
  }
  return `background-color: ${props.theme.palette.action.selected}`;
};

const getFocusPhoneStyle = (props: ListItemProps & { theme: Theme }) => {
  if (props.selected) {
    if (props.role === 'option') {
      return `background-color: ${adjustOpacity(
        0.2,
        props.theme.palette.primary.main,
      )}`;
    }

    return `background-color: ${props.theme.palette.action.selected}`;
  }
  return 'background-color:transparent';
};

const MenuListItem = styled(Item).attrs(({ button, tabIndex }) => ({
  button: button || true,
  tabIndex: tabIndex || -1,
}))<ListItemProps>`
  ${({ theme }) => ({ ...theme.typography.subtitle1 })};
  height: ${(props) => props.theme.spacing.unit * 3}px;
  box-sizing: content-box;
  ${singleLineTextCss}
  cursor: pointer;
  ${(props) =>
    props.selected &&
    `background-color:  ${
      props.role === 'option'
        ? adjustOpacity(
            props.theme.palette.action.selectedOpacity,
            props.theme.palette.primary.main,
          )
        : props.theme.palette.action.selected
    }`};
  &:hover {
    background-color: ${(props) =>
      props.selected && props.role === 'option'
        ? adjustOpacity(0.12, props.theme.palette.primary.main)
        : props.theme.palette.action.hover};
  }
  &:focus {
    ${(props) => getFocusStyle(props)};
  }
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.md}px) {
    &:focus {
      ${(props) => getFocusPhoneStyle(props)};
    }
  }
`;

export default MenuListItem;
