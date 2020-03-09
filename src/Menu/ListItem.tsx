import React from 'react';
import styled, { css } from 'styled-components';
import { withRipple } from '@sinoui/ripple';

export interface ListItemProps {
  button?: boolean;
  children?: React.ReactNode;
  component?: React.ReactType;
  dense?: boolean;
  disabled?: boolean;
  disableGutters?: boolean;
  divider?: boolean;
  selected?: boolean;
  tabIndex?: number;
  textStyle?: React.CSSProperties;
  color?: string;
  value?: any;
  onClick?: (event: React.MouseEvent<any>) => void;
  role?: string;
}

const denseStyle = css`
  padding: 8px 12px;
`;

const gutterStyle = css`
  padding-left: ${(props) => props.theme.spacing.unit * 2}px;
  padding-right: ${(props) => props.theme.spacing.unit * 2}px;
`;

const dividerStyle = css`
  border-bottom: 1px solid ${(props) => props.theme.palette.divider};
`;

const buttonStyle = css`
  transition: ${(props) =>
    props.theme.transitions.create('background-color', {
      duration: props.theme.transitions.duration.shortest,
    })};
  ${(props: ListItemProps) => props.disabled && 'background-color:transparent'};

  &:hover {
    text-decoration: none;
    background-color: ${(props) => props.theme.palette.action.hover};

    @media (hover: none) {
      background-color: transparent;
    }
  }
`;

const Typography = styled.div`
  font-size: ${(props) => props.theme.typography.subtitle1.fontSize}rem;
  color: ${(props) =>
    props.color ? props.color : props.theme.palette.text.primary};
`;

const StyleItem = styled.li<ListItemProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  text-decoration: none;
  padding-top: 12px;
  padding-bottom: 12px;
  outline: none;
  ${(props) => !props.disableGutters && gutterStyle};
  ${(props) => props.divider && dividerStyle};
  ${(props) => props.disabled && 'opacity: 0.5'};
  ${buttonStyle};
  ${(props) => props.dense && denseStyle};
`;

const StyleBaseButton = withRipple({
  enableKeyboardFocus: false,
})(StyleItem);

/**
 * Menu组件中的列表项组件
 *
 */
function ListItem(props: ListItemProps) {
  const {
    button = true,
    children: childrenProp,
    component: componentProp,
    disabled,
    ...other
  } = props;
  const itemChildren = React.Children.map(childrenProp, (child) => {
    if (typeof child === 'string') {
      return (
        <Typography
          key="menu-title"
          color={props.color}
          style={props.textStyle}
        >
          {child}
        </Typography>
      );
    }
    return child;
  });

  const listItemProps = {
    disabled,
    button,
    component: undefined,
    ...other,
  };
  let ComponentMain = componentProp || StyleItem;

  if (button) {
    ComponentMain = StyleBaseButton;
    listItemProps.component = componentProp as any;
  }

  return <ComponentMain {...listItemProps}>{itemChildren}</ComponentMain>;
}

export default ListItem;
