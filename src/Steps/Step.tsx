import React from 'react';
import styled from 'styled-components';
import Check from '@sinoui/icons/Check';

const StepLayout = styled.div`
  padding: 0 8px;
  box-sizing: border-box;
`;

const Text = styled.span<{ $active?: boolean }>`
  color: ${({ theme, $active }) =>
    $active ? theme.palette.text.primary : theme.palette.text.disabled};
  font-size: 14px;
  font-weight: ${({ theme, $active }) =>
    $active
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular};
`;

const StepContent = styled.div`
  display: flex;
  align-items: center;
`;

const NumberIcon = styled.div<{ $active?: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 50%;
  margin-right: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.palette.common.white};
  background: ${({ theme, $active }) =>
    $active ? theme.palette.primary.main : theme.palette.text.disabled};
`;

export interface StepProps {
  /**
   * 自定义图标
   */
  icon?: React.ReactNode;
  /**
   * 自定义连接器
   */
  connector?: React.ReactNode;
  /**
   * 标题
   */
  title: string;
  /**
   * 编号
   */
  index?: number;
  /**
   * 不可用状态
   */
  disabled?: boolean;
  /**
   * 是否是最后一个
   */
  last?: boolean;
  /**
   * 是否处于活动状态
   */
  active?: boolean;
  /**
   * 是否是完成状态
   */
  completed?: boolean;
}

export default function Step(props: StepProps) {
  const { title, index = 0, last, connector, active, completed } = props;
  return (
    <>
      <StepLayout>
        <StepContent>
          <NumberIcon $active={active || completed}>
            {completed ? <Check size={18} /> : index + 1}
          </NumberIcon>
          <Text $active={active || completed}>{title}</Text>
        </StepContent>
      </StepLayout>
      {!last && connector}
    </>
  );
}
