import React from 'react';
import styled from 'styled-components';
import Caption from '@sinoui/core/Caption';
import H5 from '@sinoui/core/H5';

interface Props {
  /**
   * 弹窗标题
   */
  title?: string;
  /**
   * 开始时间
   */
  startDate?: Date;
  /**
   * 结束时间
   */
  endDate?: Date;
}

const MobileDateRangeViewToolBarWrapper = styled.div`
  height: 96px;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};

  & > * {
    color: currentColor;
  }
`;

/**
 * 日历视图的工具栏
 */
const MobileDateRangeViewToolBar = ({
  title,
  startDate,
  endDate,
  ...rest
}: Props) => {
  return (
    <MobileDateRangeViewToolBarWrapper
      className="sinoui-date-range-view-toolbar"
      {...rest}
    >
      <Caption>{title}</Caption>
      <H5>
        {startDate
          ? `${startDate.getFullYear()}年${
              startDate.getMonth() + 1
            }月${startDate.getDate()}日`
          : '开始时间'}
        --
        {endDate
          ? `${endDate.getFullYear()}年
        ${endDate.getMonth() + 1}月${endDate.getDate()}日`
          : '结束时间'}
      </H5>
    </MobileDateRangeViewToolBarWrapper>
  );
};

export default MobileDateRangeViewToolBar;
