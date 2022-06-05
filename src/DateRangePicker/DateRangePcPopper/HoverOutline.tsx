import styled from 'styled-components';

import formatDate from '../../DatePicker/formatDate';
import getDayOfWeek from '../helpers/getDayOfWeek';
import getWeekNoOfMonth from '../helpers/getWeekNoOfMonth';
import isSameMonth from '../helpers/isSameMonth';

const BORDER_COLOR: Record<string, string> = {
  light: '#9a999a',
};

const HoverOutlineWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 28px;
  height: 28px;
  box-sizing: border-box;
  border: 1px solid
    ${({ theme }) =>
      BORDER_COLOR[theme.palette.type] ?? theme.palette.text.disabled};
  border-radius: 14px;
  transition: ${({ theme }) =>
    theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    })};
`;

/**
 * 悬停轮廓组件属性
 */
export interface HoverOutlineProps {
  /**
   * 悬停日期
   */
  hoverDate: Date;
  /**
   * 年份
   */
  year: number;
  /**
   * 月份
   */
  month: number;
  /**
   * 星期开始位置。`0`表示开始的是星期日，`1`表示星期一。默认为`1`。
   */
  startOfWeek?: 0 | 1;
}

/**
 * 悬停轮廓
 *
 * @param props 组件属性
 * @param props.hoverDate 悬停日期
 * @param props.year 年份
 * @param props.month 月份
 * @param props.startOfWeek 星期开始位置。`0`表示开始的是星期日，`1`表示星期一。默认为`1`。
 */
const HoverOutline: React.FC<HoverOutlineProps> = ({
  hoverDate,
  year,
  month,
  startOfWeek,
  ...rest
}) => {
  const weekNo = getWeekNoOfMonth(hoverDate, startOfWeek === 0);
  const dayOfWeek = getDayOfWeek(hoverDate, startOfWeek === 0);

  const x =
    (isSameMonth(hoverDate, year, month) ? 16 : 256 + 16) + dayOfWeek * 32 + 2;
  const y = weekNo * 32 + 2;

  return (
    <HoverOutlineWrapper
      className="sinoui-date-range-picker__hover-outline"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      data-hover-date={formatDate(hoverDate)}
      {...rest}
    />
  );
};

export default HoverOutline;
