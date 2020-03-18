import React from 'react';
import styled from 'styled-components';
import Fade from '../transitions/Fade';

const BackdropWrapper = styled.div.attrs({
  'aria-hidden': true,
  'data-sinoui-test': 'Backdrop',
})<BackdropProps>`
  position: fixed;
  z-index: -1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.visible === false ? 'transparent' : 'rgba(0, 0, 0, 0.5)'};
`;

export interface BackdropProps {
  /**
   * 是否显示
   */
  visible?: boolean;
  /**
   * 是否有open属性
   */
  open?: boolean;
  /**
   * transitionDuration
   */
  transitionDuration?: 'auto' | number;
  /**
   * 点击事件
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * 添加自定义类名
   */
  className?: string;
}

export default function Backdrop(props: BackdropProps) {
  const { open, transitionDuration } = props;
  return (
    <Fade appear in={open} timeout={transitionDuration} {...props}>
      <BackdropWrapper />
    </Fade>
  );
}
