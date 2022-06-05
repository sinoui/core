import styled, { css } from 'styled-components';

import { CLOCK_NUMBER_PADDING, CLOCK_SIZE } from './constants';
import { formatHourMinute } from './utils';

const selectedCss = css`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  z-index: 100;
`;

/**
 * 包装组件属性
 */
interface WrapperProps {
  /**
   * 数字
   */
  $number: number;
  /**
   * 是否选中的状态
   */
  $selected?: boolean;
  /**
   * 每个数字的角度
   */
  $degUnit: number;
}

const Wrapper = styled.div<WrapperProps>`
  display: inline-flex;
  position: absolute;
  left: calc((100% - 32px) / 2);
  top: calc((100% - 32px) / 2);
  width: 32px;
  height: 32px;
  align-items: center;
  user-select: none;
  border-radius: 50%;
  justify-content: center;
  z-index: 101;
  ${(props) => props.theme.typography.body1};
  color: ${(props) => props.theme.palette.text.primary};
  transition: ${({ theme }) => theme.transitions.create('color')};
  transform: ${({ $number, $degUnit }) => `rotate(${
    $degUnit * $number - 90
  }deg) translateX(${(CLOCK_SIZE - 32) / 2 - CLOCK_NUMBER_PADDING}px)
    rotate(${90 - $degUnit * $number}deg)`};
  ${(props) => props.$selected && selectedCss};
`;

/**
 * 表盘上的 时 分数字组件的属性
 */
export interface ClockNumberProps {
  /**
   * 表盘上的时、分数字
   */
  number: number;
  /**
   * 数字是否被选中
   */
  selectedValue: number;
  /**
   * 是否是小时视图
   */
  isHourView: boolean;
}

/**
 * 表盘上的 时 分数字
 *
 * @param props 组件属性
 * @param props.number 表盘上的时、分数字
 * @param props.selectedValue 数字是否被选中
 * @param props.isHourView 是否是小时视图
 */
const ClockNumber: React.FC<ClockNumberProps> = ({
  number,
  selectedValue,
  isHourView,
}) => {
  const showedMinute = number % 5 === 0 ? formatHourMinute(number) : null;
  return (
    <Wrapper
      $number={number}
      $selected={selectedValue === number}
      $degUnit={isHourView ? 30 : 6}
      data-clock-number={number}
    >
      {isHourView ? number : showedMinute}
    </Wrapper>
  );
};

export default ClockNumber;
