import styled, { css } from 'styled-components';

interface Props {
  $center?: boolean;
}

const centerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

/**
 * 模态框容器
 */
const ModalWrapper = styled.div<Props>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.modal};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  ${({ hidden }) => hidden && 'visibility: hidden;'}
  ${({ $center }) => $center && centerCss}
`;

export default ModalWrapper;
