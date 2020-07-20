import styled from 'styled-components';

/**
 * 移动端时间选择弹出后显示的时分组件
 */
const HourMinuteWrapper = styled.div<{ selected?: boolean }>`
  ${(props) => props.theme.typography.h3};
  color: rgba(255, 255, 255, 0.54);
  cursor: pointer;
  ${(props) => props.selected && `color: #fff`};
`;

export default HourMinuteWrapper;
