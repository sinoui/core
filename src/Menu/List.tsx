import React from 'react';
import styled, { css } from 'styled-components';

export interface ListProps {
  children: React.ReactNode;
  subheader?: React.ReactElement<any>;
  dense?: boolean;
  disablePadding?: boolean;
  role?: string;
  onBlur?: (event: React.FocusEvent<HTMLUListElement>) => void;
  color?: string;
  textStyle?: React.CSSProperties;
}

const paddingStyle = css`
  padding-top: ${(props) => props.theme.spacing.unit}px;
  padding-bottom: ${(props) => props.theme.spacing.unit}px;
`;

const denseStyle = css`
  padding-top: ${(props) => props.theme.spacing.unit / 2}px;
  padding-bottom: ${(props) => props.theme.spacing.unit / 2}px;
`;

const subheaderStyle = css`
  padding-top: 0px;
`;

const StyleList = styled.ul<ListProps>`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  margin: 0px;
  padding: 0px;
  position: relative;
  list-style: none;
  ${(props) => props.dense && !props.disablePadding && denseStyle};
  ${(props) => !props.disablePadding && paddingStyle};
  ${(props) => props.subheader && subheaderStyle};
`;

export default React.forwardRef<HTMLUListElement, ListProps>(function List(
  props,
  ref,
) {
  const { children, subheader, ...other } = props;

  return (
    <StyleList subheader={subheader} {...other} ref={ref}>
      {subheader}
      {React.Children.map(
        children as any,
        (
          child: React.ReactElement<{
            dense?: boolean;
            color?: string;
            textStyle?: any;
          }>,
        ) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              dense: props.dense,
              color: props.color,
              textStyle: props.textStyle,
            });
          }
          return child;
        },
      )}
    </StyleList>
  );
});
