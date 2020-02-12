import styled from 'styled-components';
import Paper from '@sinoui/core/Paper';

/**
 * Popover内容组件
 */
const PopoverContent = styled(Paper)`
  max-height: calc(100% - 16px);
  overflow-y: auto;
  overflow-x: hidden;
  margin: 8px;
`;

export default PopoverContent;
