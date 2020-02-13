import styled from 'styled-components';
import Item, { ListItemProps } from './ListItem';

const MenuListItem = styled(Item).attrs(({ button, tabIndex }) => ({
  button: button || true,
  tabIndex: tabIndex || -1,
}))<ListItemProps>`
  font-size: ${(props) => props.theme.typography.subheading.fontSize}rem;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-weight: ${(props) => props.theme.typography.subheading.fontWeight};
  line-height: ${(props) => props.theme.typography.subheading.lineHeight}rem;
  height: ${(props) => props.theme.spacing.unit * 3}px;
  box-sizing: content-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  ${(props) =>
    props.selected &&
    `background-color: ${props.theme.palette.action.selected}`};
  &:hover {
    background-color: ${(props) => props.theme.palette.action.hover};
  }
  &:focus {
    background-color: ${(props) =>
      props.selected
        ? props.theme.palette.action.selected
        : props.theme.palette.action.hover};
  }
`;

export default MenuListItem;
