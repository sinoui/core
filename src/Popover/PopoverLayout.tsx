import styled from 'styled-components';

/**
 * Popover弹出内容的布局组件
 */
const PopoverLayout = styled.div<any>`
  position: absolute;
  min-width: 16px;
  min-height: 16px;
  padding: 0px;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 32px);
  z-index: 2;

  &:focus {
    outline: none;
  }
`;

export default PopoverLayout;
