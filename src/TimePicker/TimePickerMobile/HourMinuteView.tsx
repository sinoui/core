import React from 'react';
import HourMinuteWrapper from './HourMinuteWrapper';
import { formatHourMinute } from './utils';

interface Props {
  value: number;
  selected?: boolean;
}
export default function HourMinuteView({ value, selected }: Props) {
  return (
    <HourMinuteWrapper selected={selected}>
      {formatHourMinute(value)}
    </HourMinuteWrapper>
  );
}
