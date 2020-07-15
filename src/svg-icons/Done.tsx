import React from 'react';
import SvgIcon from '@sinoui/core/SvgIcon';
import type { SvgIconProps } from '@sinoui/core/SvgIcon';

export default function Done(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
    </SvgIcon>
  );
}
