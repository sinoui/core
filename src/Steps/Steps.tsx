import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';

export interface StepsProps {
  /**
   * 当前处于活动状态的步骤条
   */
  current: number;
  /**
   * 步骤条方向
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 是否为非线性，默认为false
   */
  nonLinear?: boolean;
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 标签位置
   */
  labelPlacement?: 'horizontal' | 'vertical';
  /**
   * 连接器
   */
  connector?: React.ReactNode;
  /**
   * 自定义图标
   */
  icon?: React.ReactNode;
  /**
   * 点击时的回调函数
   */
  onChange?: (current: number) => void;
}

const verticalStyle = css`
  align-items: flex-start;
`;

const StepsLayout = styled.div<{ labelPlacement?: 'horizontal' | 'vertical' }>`
  display: flex;
  align-items: center;
  ${({ labelPlacement }) => labelPlacement === 'vertical' && verticalStyle}

  .sinoui-step-connector--active {
    color: ${({ theme }) => theme.palette.primary.main};

    > hr {
      background: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

export default function Steps(props: StepsProps) {
  const {
    direction,
    children,
    current,
    nonLinear,
    labelPlacement,
    connector,
    icon,
    onChange,
    ...other
  } = props;
  const childrenArray = React.Children.toArray(children);
  const steps = childrenArray.map((step: any, index) => {
    const state = {
      index,
      active: false,
      completed: false,
      disabled: false,
    };

    if (current === index) {
      state.active = true;
    } else if (current > index) {
      state.completed = true;
    } else if (current < index) {
      state.disabled = true;
    }

    return React.cloneElement(step, {
      last: index + 1 === childrenArray.length,
      connector,
      labelPlacement,
      icon,
      onChange,
      ...state,
      ...step.props,
    });
  });

  return (
    <StepsLayout
      {...other}
      labelPlacement={labelPlacement}
      className={classNames('sinoui-steps', {
        'sinoui-steps--horizontal': direction === 'horizontal',
        'sinoui-steps--vertical': direction === 'vertical',
      })}
    >
      {steps}
    </StepsLayout>
  );
}
