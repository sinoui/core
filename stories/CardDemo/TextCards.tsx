import React from 'react';
import StyledCardText from './Components/StyledCardText';
import CardPrimaryAction from '@sinoui/core/CardPrimaryAction';

export default function Demo() {
  return (
    <>
      <StyledCardText>
        <CardPrimaryAction>
          <h4>Marketing</h4>
          <h1>123.4M</h1>
        </CardPrimaryAction>
      </StyledCardText>

      <StyledCardText>
        <h4>Sales</h4>
        <h1>345.8M</h1>
        <h4>+11</h4>
      </StyledCardText>

      <StyledCardText>
        <h4>Users</h4>
        <h1>345.8M</h1>
      </StyledCardText>
    </>
  );
}
