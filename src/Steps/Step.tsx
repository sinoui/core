import React from 'react';
import styled, { css } from 'styled-components';
import Check from '@sinoui/icons/Check';
import { useRipple } from '@sinoui/ripple';
import classNames from 'classnames';
import Connector from './Connector';

const verticalLayoutCss = css`
  flex: 1;
  position: relative;

  .sinoui-step-connector {
    position: absolute;
    top: 12px;
    left: calc(50% + 20px);
    right: calc(-50% + 20px);
  }

  .sinoui-step-connector--active {
    color: ${({ theme }) => theme.palette.primary.main};

    > hr {
      background: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

const StepLayout = styled.div<{
  $isVertical?: boolean;
  $isClickable?: boolean;
}>`
  padding: 0 8px;
  box-sizing: border-box;
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
  ${({ $isVertical }) => $isVertical && verticalLayoutCss};

  .sinoui-step-content--vertical {
    flex-direction: column;

    .sinoui-step-number-icon {
      margin-right: 0;
    }

    .sinoui-step-title {
      margin-top: 16px;
    }
  }
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

const StepContent = styled.div<{ $isVertical?: boolean }>`
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

const IconWrapper = styled.span<{ $active?: boolean }>`
  margin-right: 8px;
  color: ${({ theme, $active }) =>
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
  /**
   * 标签位置
   */
  labelPlacement?: 'horizontal' | 'vertical';
  /**
   * 点击时的回调函数
   */
  onChange?: (current: number) => void;
  /**
   * 步骤条方向
   */
  direction?: 'horizontal' | 'vertical';
}

export default function Step(props: StepProps) {
  const {
    title,
    index = 0,
    last,
    connector,
    active,
    completed,
    labelPlacement,
    icon,
    onChange,
    direction,
  } = props;

  const ref = onChange ? useRipple<HTMLDivElement>() : null;

  const handleClick = () => {
    if (!onChange) {
      return;
    }
    onChange(index);
  };
  return (
    <>
      <StepLayout
        className="sinoui-step"
        $isVertical={labelPlacement === 'vertical'}
        onClick={handleClick}
        $isClickable={!!onChange}
        ref={ref}
      >
        {labelPlacement === 'vertical' && direction !== 'vertical' && !last && (
          <Connector
            className={classNames('sinoui-step-connector', {
              'sinoui-step-connector--active': completed,
            })}
          >
            {connector}
          </Connector>
        )}
        <StepContent
          className={classNames('sinoui-step-content', {
            'sinoui-step-content--vertical': labelPlacement === 'vertical',
          })}
        >
          {icon ? (
            <IconWrapper $active={active || completed}>{icon}</IconWrapper>
          ) : (
            <NumberIcon
              $active={active || completed}
              className="sinoui-step-number-icon"
            >
              {completed ? <Check size={18} /> : index + 1}
            </NumberIcon>
          )}
          <Text $active={active || completed} className="sinoui-step-title">
            {title}
          </Text>
        </StepContent>
      </StepLayout>
      {!last &&
        (labelPlacement !== 'vertical' ||
          (labelPlacement === 'vertical' && direction === 'vertical')) && (
          <Connector
            className={classNames('sinoui-step-connector', {
              'sinoui-step-connector--active': completed,
            })}
          >
            {connector}
          </Connector>
        )}
    </>
  );
}
