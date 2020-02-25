import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import isSinouiElement from '../utils/reactHelpers';
import { colorCss } from '../utils/colors';
import { BaseButtonStyle } from '../BaseButton';
import { SimpleIcon } from '../Icon';
import { spacing } from '@sinoui/theme';

export interface StyledButtonProps {
  role?: string;
  dense?: boolean;
}

export interface IconButtonPropsType {
  innerRef?: (component: React.Component) => void;
  children?: any;
  component?: React.ReactType;
  dense?: boolean;
  color?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

const iconStyle = {
  fontSize: 24,
  userSelect: 'none',
};

const denseStyle = {
  fontSize: 20,
  userSelect: 'none',
};

function IconButtonInner({
  children,
  component: Component = 'button',
  dense,
  className,
  ...rest
}: IconButtonPropsType) {
  return (
    <Component
      role="button"
      type="button"
      {...rest}
      ref={rest.innerRef}
      className={classNames('sinoui-icon-button', className)}
    >
      {React.Children.map(children, (child) => {
        if (isSinouiElement(child, ['Icon'])) {
          return (
            <SimpleIcon
              {...child.props}
              style={dense ? denseStyle : iconStyle}
            />
          );
        } else {
          return child;
        }
      })}
    </Component>
  );
}

export default styled(IconButtonInner)`
  ${BaseButtonStyle};
  ${colorCss};
  width: ${(props) => (props.dense ? spacing.unit * 4 : spacing.unit * 6)}px;
  height: ${(props) => (props.dense ? spacing.unit * 4 : spacing.unit * 6)}px;
`;
