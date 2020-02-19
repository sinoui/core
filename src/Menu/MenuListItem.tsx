import styled from 'styled-components';
import { Theme } from '@sinoui/theme';
import Item, { ListItemProps } from './ListItem';

const getFocusStyle = (props: ListItemProps & { theme: Theme }) => {
  if (props.selected) {
    if (props.role === 'option') {
      return `background-color: ${props.theme.palette.primary[300]}`;
    }

    return `background-color: ${props.theme.palette.action.selected}`;
  }
  return `background-color: ${props.theme.palette.action.hover}`;
};

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
    `background-color:  ${
      props.role === 'option'
        ? props.theme.palette.primary[100]
        : props.theme.palette.action.selected
    }`};
  &:hover {
    background-color: ${(props) =>
      props.selected && props.role === 'option'
        ? props.theme.palette.primary[200]
        : props.theme.palette.action.hover};
  }
  &:focus {
    ${(props) => getFocusStyle(props)};
  }
`;

export default MenuListItem;
