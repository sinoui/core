import React from 'react';
import styled from 'styled-components';

export interface NotchedOutlineProps {
  notched?: boolean;
  labelWidth?: number;
  style?: React.CSSProperties;
}

const NotchedOutlineLayout = styled.fieldset`
  position: absolute;
  bottom: 0;
  right: 0;
  top: -5px;
  left: 0;
  margin: 0;
  padding: 0;
  padding-left: 8px;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: inherit;
  border-style: solid;
  border-width: 1px;
  transition: ${(props) =>
    props.theme.transitions.create('border-color', {
      duration: props.theme.transitions.duration.shorter,
      easing: props.theme.transitions.easing.easeOut,
    })};
`;

const Legend = styled.legend`
  width: auto;
  text-align: left;
  padding: 0;
  line-height: 11px;
  transition: ${(props) =>
    props.theme.transitions.create('width', {
      duration: props.theme.transitions.duration.shorter,
      easing: props.theme.transitions.easing.easeOut,
    })};
`;

export default function NotchedOutline(props: NotchedOutlineProps) {
  const { notched, labelWidth: labelWidthProp = 0 } = props;

  const labelWidth = labelWidthProp > 0 ? labelWidthProp * 0.75 + 8 : 0;
  return (
    <NotchedOutlineLayout aria-hidden {...props}>
      <Legend style={{ width: !notched ? 'auto' : labelWidth }}>
        <span>&#8203;</span>
      </Legend>
    </NotchedOutlineLayout>
  );
}
