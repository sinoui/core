import styled, { css } from 'styled-components';

import WeekTitle from './WeekTitle';

/**
 * 组件属性
 */
interface Props {
  /**
   * 星期开始的位置。`0`表示为星期日，`1`表示为星期一。默认为`1`。
   */
  startOfWeek?: 0 | 1;
  /**
   * 是否是pc设备
   */
  isPc?: boolean;
}

const mobileStyle = css`
  -ms-grid-column-span: 4px;
  grid-column-gap: 4px;
`;

const pcStyle = css`
  -ms-grid-column-span: 0px;
  grid-column-gap: 0px;
`;

const weekTitles = ['一', '二', '三', '四', '五', '六', '日'];

/**
 * WeekTitleBarWarpper组件属性
 */
interface WeekTitleBarWrapperProps {
  /**
   * 是否是pc设备
   */
  $isPc?: boolean;
}

const WeekTitleBarWrapper = styled.div<WeekTitleBarWrapperProps>`
  ${mobileStyle}
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  -ms-grid-row: auto;
  grid-template-columns: repeat(7, 1fr);

  ${({ $isPc }) => $isPc && pcStyle}
`;

/**
 * 周标题栏
 *
 * @param props 组件属性
 * @param props.startOfWeek 星期开始的位置。`0`表示为星期日，`1`表示为星期一。默认为`1`。
 * @param props.isPc 是否是pc设备
 */
const WeekTitleBar: React.FC<Props> = ({ startOfWeek = 1, isPc, ...rest }) => {
  const titles =
    startOfWeek === 1 ? weekTitles : [weekTitles[6], ...weekTitles.slice(0, 6)];
  return (
    <WeekTitleBarWrapper
      {...rest}
      className="sinoui-week-title-bar"
      $isPc={isPc}
    >
      {titles.map((title, index) => (
        <WeekTitle key={title} $column={index + 1} $isPc={isPc}>
          {title}
        </WeekTitle>
      ))}
    </WeekTitleBarWrapper>
  );
};

export default WeekTitleBar;
