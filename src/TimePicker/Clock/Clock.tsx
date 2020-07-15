import React from 'react';
import ClockWrapper from './ClockWrapper';
import ClockNumber from './ClockNumber';

const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export default function CircleClock() {
  return (
    <ClockWrapper size={260}>
      {hours.map((item) => (
        <ClockNumber key={item} number={item} />
      ))}
    </ClockWrapper>
  );
}
