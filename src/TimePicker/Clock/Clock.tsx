import React from 'react';
import ClockWrapper from './ClockWrapper';
import ClockNumber from './ClockNumber';
import ClockPin from './ClockPin';
import ClockPointer from './ClockPointer';

const hours = new Array(12).fill(1).map((_, index) => index + 1);
export default function CircleClock({ size = 260 }: { size: number }) {
  return (
    <ClockWrapper $size={size}>
      {hours.map((hour) => (
        <ClockNumber key={hour} $number={hour} $size={size} />
      ))}
      <ClockPin />
      <ClockPointer size={size} />
    </ClockWrapper>
  );
}
