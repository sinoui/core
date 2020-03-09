import React from 'react';
import styled from 'styled-components';
import Divider from '@sinoui/core/Divider';

const Wrapper = styled.div`
  display: flex;
  border: 1px solid ${(props) => props.theme.palette.divider};

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;

    li:nth-child(2n + 1) {
      padding: 8px;
    }
  }
`;
export default function Demo(props: {
  middle?: boolean;
  inset?: boolean;
  marginHorizontal?: number;
  marginVertical?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
}) {
  return (
    <Wrapper>
      <ul>
        <li>item1</li>
        <Divider as="li" {...props} />
        <li>item2</li>
        <Divider as="li" {...props} />
        <li>item3</li>
        <Divider as="li" {...props} />
        <li>item4</li>
      </ul>
    </Wrapper>
  );
}
