import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import Connector from './Connector';

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
}

const StepsLayout = styled.div`
  display: flex;
  align-items: center;
`;

export default function Steps(props: StepsProps) {
  const { direction, children, current, nonLinear, ...other } = props;
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
    } else if (!nonLinear && current > index) {
      state.completed = true;
    } else if (!nonLinear && current < index) {
      state.disabled = true;
    }

    return React.cloneElement(step, {
      last: index + 1 === childrenArray.length,
      connector: <Connector />,
      ...state,
      ...step.props,
    });
  });

  return (
    <StepsLayout
      {...other}
      className={classNames('sinoui-steps', {
        'sinoui-steps--horizontal': direction === 'horizontal',
        'sinoui-steps--vertical': direction === 'vertical',
      })}
    >
      {steps}
    </StepsLayout>
  );
}
