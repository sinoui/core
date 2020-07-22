import React from 'react';
import IconButton from '@sinoui/core/IconButton';
import Schedule from '@sinoui/icons/Schedule';
import Keyboard from '@sinoui/icons/Keyboard';
/**
 * 移动端日期弹出框 底部视图切换图标
 */
export default function TimePickerMobileViewIcon({
  isClockView,
  onChangeClockView,
}: {
  isClockView: boolean;
  onChangeClockView: (value: boolean) => void;
}) {
  return (
    <IconButton
      dense
      color="primary"
      onClick={() => onChangeClockView(!isClockView)}
    >
      {isClockView ? <Keyboard /> : <Schedule />}
    </IconButton>
  );
}
