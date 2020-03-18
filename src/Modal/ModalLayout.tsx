import styled, { css } from 'styled-components';

export interface ModalLayoutProps {
  fullScreen?: boolean;
  zIndex?: number;
}

const fullScreenCss = css`
  width: 100%;
  height: 100%;
`;

const ModalLayout = styled.div<ModalLayoutProps>`
  ${(props) => props.fullScreen && fullScreenCss};
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  z-index: ${(props) =>
    typeof props.zIndex === 'number' ? props.zIndex : props.theme.zIndex.modal};
  justify-content: center;
  align-items: center;
`;

export default ModalLayout;
