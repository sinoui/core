import React from 'react';
import SvgIcon from '@sinoui/core/SvgIcon';
import type { SvgIconProps } from '@sinoui/core/SvgIcon';

export default function ArrowDropDownIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M7 10l5 5 5-5z" />
    </SvgIcon>
  );
}
