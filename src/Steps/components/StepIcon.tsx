import React from 'react';
import styled from 'styled-components';
import CheckCircle from './CheckCircleIcon';
import Error from './ErrorIcon';

const IconWrapper = styled.span<{
  $active?: boolean;
  $error?: boolean;
  $isInHorizontal?: boolean;
}>`
  height: ${({ $isInHorizontal }) => ($isInHorizontal ? '24px' : '100%')};
  width: ${({ $isInHorizontal }) => ($isInHorizontal ? '24px' : '100%')};
  margin-right: ${({ $isInHorizontal }) => ($isInHorizontal ? 8 : 0)}px;
  display: flex;
  justify-content: center;
  color: ${({ theme, $active }) =>
    $active ? theme.palette.primary.main : theme.palette.text.disabled};
  ${({ theme, $error }) => $error && `color:${theme.palette.error.main}`};
`;

const NumberIcon = styled.div<{ $active?: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 50%;
  font-size: 12px;
  color: ${({ theme }) => theme.palette.common.white};
  background: ${({ theme, $active }) =>
    $active ? theme.palette.primary.main : theme.palette.text.disabled};
`;

export interface Props {
  /**
   * 自定义图标
   */
  icon?: React.ReactNode;
  /**
   * 状态
   */
  status?: 'wait' | 'active' | 'completed' | 'error';
  /**
   * 编号
   */
  index?: number;
  /**
   * 是否用于水平方向步进器
   */
  isInHorizontal?: boolean;
}

/**
 * 步进器节点图标
 * @param props
 */
function StepIcon(props: Props) {
  const { status, icon, index = 0, isInHorizontal } = props;
  if (icon) {
    if (typeof icon === 'function') {
      return icon(status);
    }
    return (
      <IconWrapper
        $active={status === 'active' || status === 'completed'}
        $error={status === 'error'}
        $isInHorizontal={isInHorizontal}
        className="sinoui-step-icon"
      >
        {icon}
      </IconWrapper>
    );
  }
  if (status === 'completed') {
    return (
      <IconWrapper
        $active
        $isInHorizontal={isInHorizontal}
        className="sinoui-step-icon"
      >
        <CheckCircle />
      </IconWrapper>
    );
  }
  if (status === 'error') {
    return (
      <IconWrapper
        $isInHorizontal={isInHorizontal}
        className="sinoui-step-icon"
        $error
      >
        <Error />
      </IconWrapper>
    );
  }

  return (
    <IconWrapper $isInHorizontal={isInHorizontal} className="sinoui-step-icon">
      <NumberIcon $active={status === 'active'} className="sinoui-step-icon">
        {index + 1}
      </NumberIcon>
    </IconWrapper>
  );
}

export default StepIcon;
