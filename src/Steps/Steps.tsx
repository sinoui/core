import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import Divider from '../Divider';

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

const lableVerticalStyle = css`
  align-items: flex-start;
`;

const verticalStyle = css`
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  height: 100%;
  justify-content: space-between;
`;

const dirAndLabelVerticalStyle = css`
  .sinoui-step {
    flex: 0;
    padding: 8px;
  }
  .sinoui-step-connector {
    margin-left: 8px;
  }
`;

const StepsLayout = styled.div<{
  labelPlacement?: 'horizontal' | 'vertical';
  direction?: 'horizontal' | 'vertical';
}>`
  display: flex;
  align-items: center;
  ${({ labelPlacement }) =>
    labelPlacement === 'vertical' && lableVerticalStyle};
  ${({ direction }) => direction === 'vertical' && verticalStyle};

  ${({ labelPlacement, direction }) =>
    direction === 'vertical' &&
    labelPlacement === 'vertical' &&
    dirAndLabelVerticalStyle};

  .sinoui-step-connector--active {
    color: ${({ theme }) => theme.palette.primary.main};

    > hr {
      background: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

const StyledDivider = styled(Divider)<{ vertical?: boolean }>`
  flex: 1;
  height: ${({ vertical }) => (vertical ? 'calc(100% - 16px)' : '1px')};
  margin-left: ${({ vertical }) => (vertical ? 20 : 0)}px;
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
      connector: connector ?? (
        <StyledDivider vertical={direction === 'vertical'} />
      ),
      labelPlacement,
      direction,
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
      direction={direction}
      className={classNames('sinoui-steps', {
        'sinoui-steps--horizontal': direction === 'horizontal',
        'sinoui-steps--vertical': direction === 'vertical',
      })}
    >
      {steps}
    </StepsLayout>
  );
}
