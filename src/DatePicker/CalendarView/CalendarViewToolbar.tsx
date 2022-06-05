/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Caption from '@sinoui/core/Caption';
import H5 from '@sinoui/core/H5';
import type React from 'react';
import styled from 'styled-components';

/**
 * 日历视图的工具栏组件属性
 */
interface Props {
  /**
   * 标题
   */
  title: string;
  /**
   * 需要显示的子元素
   */
  children?: React.ReactNode;
}

const CalendarViewToolbarWrapper = styled.div`
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
 *
 * @param props 组件属性
 * @param props.title 标题
 * @param props.children 需要在工具栏上显示的内容
 */
const CalendarViewToolbar: React.FC<Props> = ({ title, children, ...rest }) => (
    <CalendarViewToolbarWrapper
      className="sinoui-calendar-view-toolbar"
      {...rest}
    >
      <Caption>{title}</Caption>
      <H5>{children}</H5>
    </CalendarViewToolbarWrapper>
  );

export default CalendarViewToolbar;
