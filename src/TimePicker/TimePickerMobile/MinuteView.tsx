import React from 'react';
import HourMinuteWrapper from './HourMinuteWrapper';

interface Props {
  minute: string;
}

export default function MinuteView({ minute }: Props) {
  return (
    <HourMinuteWrapper> {minute === '60' ? '00' : minute}</HourMinuteWrapper>
  );
}
