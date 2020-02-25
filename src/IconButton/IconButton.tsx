import React from 'react';
import styled from 'styled-components';
import { withRipple } from '@sinoui/ripple';
import IconButtonInner, { IconButtonPropsType } from './IconButtonInner';
import { spacing } from '@sinoui/theme';

const BaseIconButton = styled(IconButtonInner)`
  & .sinoui-icon-button__ripple {
    width: ${spacing.unit * 6}px;
    height: ${spacing.unit * 6}px;
    border-radius: ${spacing.unit * 3}px;
  }

  & .sinoui-icon-button__ripple-layout {
    left: 0px;
    top: 0px;
    width: ${spacing.unit * 6}px;
    height: ${spacing.unit * 6}px;
  }

  & .sinoui-icon-button__ripple-dense {
    width: ${spacing.unit * 4}px;
    height: ${spacing.unit * 4}px;
    border-radius: ${spacing.unit * 2}px;
  }

  & .sinoui-icon-button__ripple-layout-dense {
    left: 0px;
    top: 0px;
    width: ${spacing.unit * 4}px;
    height: ${spacing.unit * 4}px;
  }
`;

const rippleConfig = {
  center: true,
  rippleClassName: 'sinoui-icon-button__ripple',
  rippleLayoutClassName: 'sinoui-icon-button__ripple-layout',
  fixSize: true,
};

const denseRippleConfig = {
  center: true,
  rippleClassName: 'sinoui-icon-button__ripple-dense',
  rippleLayoutClassName: 'sinoui-icon-button__ripple-layout-dense',
  fixSize: true,
};

const DenseIconButton = withRipple(denseRippleConfig)<IconButtonPropsType>(
  BaseIconButton,
);
const NormalIconButton = withRipple(rippleConfig)<IconButtonPropsType>(
  BaseIconButton,
);

const IconButton: React.SFC<IconButtonPropsType> = (props) =>
  props.dense ? (
    <DenseIconButton {...props} />
  ) : (
    <NormalIconButton {...props} />
  );

IconButton.displayName = 'IconButton';
IconButton.sinouiName = 'IconButton';

export default IconButton;
