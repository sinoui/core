import Body2 from '@sinoui/core/Body2';
import styled, { css } from 'styled-components';

/**
 * 周状态栏中的标题组件属性
 */
interface WeekTitleProps {
  /**
   * 标题所属的列
   */
  $column: number;
  /**
   * 是否是 pc 设备
   */
  $isPc?: boolean;
}

const mobileStyle = css<WeekTitleProps>`
  width: 40px;
  height: 40px;
`;

const pcStyle = css`
  font-size: 13px;
  width: 32px;
  height: 18px;
`;

/**
 * 周状态栏中的标题
 *
 * @param props 组件属性
 * @param props.theme 主题
 * @param props.$column 标题所属的列
 * @param props.$isPc 是否是 pc 设备
 */
const WeekTitle = styled(Body2)<WeekTitleProps>`
  ${mobileStyle}
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  line-height: 18px;
  -ms-grid-column: ${({ $column }) => $column};
  -ms-grid-row: 1;

  ${({ $isPc }) => $isPc && pcStyle}
`;

export default WeekTitle;
