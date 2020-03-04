import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

export default function InsetCircle() {
  const {
    palette: {
      primary: { main },
    },
  } = useContext(ThemeContext);
  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      width="72px"
      height="56px"
      viewBox="0 0 72 56"
      enableBackground="new 0 0 72 56"
    >
      <path
        fill={main}
        d="M36,36.018c-19.882,0-36-16.154-36-36.08v56.125h72V-0.063C72,19.864,55.882,36.018,36,36.018z"
      />
    </svg>
  );
}
