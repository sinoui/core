import React from 'react';
import SvgIcon from '../../SvgIcon';

/* eslint max-len:0 */
const CheckBoxOutlineBlank: React.SFC = (props: {}) => (
  <SvgIcon {...props}>
    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </SvgIcon>
);
CheckBoxOutlineBlank.sinouiName = 'SvgIcon';

export default CheckBoxOutlineBlank;
