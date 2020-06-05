import React from 'react';
import styled from 'styled-components';
import Button from '@sinoui/core/Button';

const CalendarViewActionLayout = styled.div`
  height: 48px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 16px;
`;

export interface Props {
  /**
   * 点击取消按钮的回调函数
   */
  onCancel?: (event: React.MouseEvent) => void;
  /**
   * 点击确定按钮的回调函数
   */
  onOk?: (event: React.MouseEvent) => void;
  /**
   * 点击清除按钮的回调函数
   */
  onClear?: (event: React.MouseEvent) => void;
}

/**
 * 日历视图底部按钮操作组件
 * @param param0
 */
export default function CalendarViewAction({ onClear, onCancel, onOk }: Props) {
  return (
    <CalendarViewActionLayout className="sinoui-calendar-view-action">
      <Button onClick={onClear}>清除</Button>
      <div style={{ flex: 1 }} />
      <Button onClick={onCancel}>取消</Button>
      <Button onClick={onOk}>确定</Button>
    </CalendarViewActionLayout>
  );
}
