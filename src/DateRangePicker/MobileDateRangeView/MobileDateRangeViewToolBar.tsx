import React from 'react';
import styled from 'styled-components';
import Caption from '@sinoui/core/Caption';
import H5 from '@sinoui/core/H5';
import IconButton from '@sinoui/core/IconButton';
import Close from '@sinoui/core/svg-icons/Close';
import Button from '@sinoui/core/Button';

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
  height: 128px;
  padding: 8px 16px 24px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  box-sizing: border-box;

  & > * {
    color: currentColor;
  }

  .sinoui-icon-button,
  .sinoui-button {
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }

  .sinoui-typography--caption,
  .sinoui-typography--h5 {
    padding-left: 48px;
  }
`;

const MobileDateRangeViewToolBarAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
      <MobileDateRangeViewToolBarAction>
        <IconButton dense>
          <Close />
        </IconButton>
        <Button>保存</Button>
      </MobileDateRangeViewToolBarAction>
      <Caption>{title}</Caption>
      <H5>
        {startDate
          ? `${startDate.getMonth() + 1}月${startDate.getDate()}日`
          : '开始时间'}
        --
        {endDate
          ? `
        ${endDate.getMonth() + 1}月${endDate.getDate()}日`
          : '结束时间'}
      </H5>
    </MobileDateRangeViewToolBarWrapper>
  );
};

export default MobileDateRangeViewToolBar;
