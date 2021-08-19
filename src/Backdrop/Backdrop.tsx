import React from 'react';
import { useTheme } from 'styled-components';
import Fade from '../Fade';
import Scrim from './Scrim';
import type { ScrimProps } from './Scrim';

interface Props extends ScrimProps, React.ComponentPropsWithoutRef<'div'> {
  /**
   * 设置为`true`，则显示遮罩层。
   */
  open: boolean;
  /**
   * 设置为`false`，则遮罩层为全透明。默认为`true`。
   */
  visible?: boolean;
  /**
   * 设置动画时长
   */
  transitionDuration?: number;
}

/**
 * 遮罩层
 */
const Backdrop = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const theme = useTheme();
  const {
    open,
    visible,
    opacity,
    transitionDuration = theme.transitions.duration.shorter,
    children,
    ...rest
  } = props;
  return (
    <Fade appear in={open} timeout={transitionDuration} {...rest} ref={ref}>
      <Scrim opacity={visible === false ? 0 : opacity}>{children}</Scrim>
    </Fade>
  );
});

export default Backdrop;
