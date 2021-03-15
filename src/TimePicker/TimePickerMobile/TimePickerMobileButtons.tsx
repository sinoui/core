import React from 'react';
import Button from '@sinoui/core/Button';
import styled from 'styled-components';

const ButtonsWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

/**
 * 移动端日期弹出底部按钮
 */
export default function TimePickerMobileButtons({
  onClear,
  onOk,
  onClose,
}: {
  onClear: () => void;
  onOk: () => void;
  onClose: () => void;
}) {
  return (
    <ButtonsWrapper>
      <Button onClick={onClear} data-testid="clock-clear-btn">
        清除
      </Button>
      <Button onClick={onClose} data-testid="clock-cancel-btn">
        取消
      </Button>
      <Button onClick={onOk} data-testid="clock-ok-btn">
        设置
      </Button>
    </ButtonsWrapper>
  );
}
