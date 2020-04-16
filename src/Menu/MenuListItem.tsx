import styled from 'styled-components';
import { Theme } from '@sinoui/theme';
import { opacify } from 'polished';
import Item, { ListItemProps } from './ListItem';

const getFocusStyle = (props: ListItemProps & { theme: Theme }) => {
  if (props.selected) {
    if (props.role === 'option') {
      return `background-color: ${opacify(
        -0.8,
        props.theme.palette.primary.main,
      )}`;
    }

    return `background-color: ${props.theme.palette.action.selected}`;
  }
  return `background-color: ${props.theme.palette.action.selected}`;
};

const MenuListItem = styled(Item).attrs(({ button, tabIndex }) => ({
  button: button || true,
  tabIndex: tabIndex || -1,
}))<ListItemProps>`
  ${({ theme }) => ({ ...theme.typography.subtitle1 })};
  height: ${(props) => props.theme.spacing.unit * 3}px;
  box-sizing: content-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  ${(props) =>
    props.selected &&
    `background-color:  ${
      props.role === 'option'
        ? opacify(-0.92, props.theme.palette.primary.main)
        : props.theme.palette.action.selected
    }`};
  &:hover {
    background-color: ${(props) =>
      props.selected && props.role === 'option'
        ? opacify(-0.88, props.theme.palette.primary.main)
        : props.theme.palette.action.hover};
  }
  &:focus {
    ${(props) => getFocusStyle(props)};
  }
`;

export default MenuListItem;
