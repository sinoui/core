/* eslint-disable no-nested-ternary */
import React from 'react';
import styled, { css } from 'styled-components';
import { useRipple } from '@sinoui/ripple';
import classNames from 'classnames';
import Connector from './components/Connector';
import VerticalStep from './components/VerticalStep';
import StepIcon from './components/StepIcon';
import Title from './components/Title';
import SubTitle from './components/SubTitle';
import StepContent from './components/StepContent';

const verticalLayoutCss = css`
  flex: 1;
  position: relative;

  .sinoui-step-connector {
    position: absolute;
    top: 12px;
    left: calc(50% + 20px);
    right: calc(-50% + 20px);

    hr {
      margin-top: 0px;
    }
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
  padding: 0 16px;
  box-sizing: border-box;
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
  ${({ $isVertical }) => $isVertical && verticalLayoutCss};

  .sinoui-step-container--vertical {
    flex-direction: column;
    align-items: center;

    .sinoui-step-icon {
      margin-right: 0;
    }

    .sinoui-step-content {
      margin-top: 16px;
      text-align: center;
    }
  }
`;

const Description = styled.div<{ $active?: boolean }>`
  color: ${({ theme, $active }) =>
    $active ? theme.palette.text.secondary : theme.palette.text.disabled};
`;

const StepContainer = styled.div`
  display: flex;
  align-items: flex-start;
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
  /**
   * 状态
   */
  status?: 'wait' | 'active' | 'completed' | 'error';
  /**
   * 副标题
   */
  subTitle?: React.ReactNode;
  /**
   * 描述文字（内容）
   */
  description?: React.ReactNode;
}

/**
 * 步进器中的单个步骤组件
 *
 * @param props
 */
export default function Step(props: StepProps) {
  const {
    title,
    index = 0,
    last,
    connector,
    labelPlacement,
    icon,
    onChange,
    direction,
    status,
    subTitle,
    description,
  } = props;

  const ref = useRipple<HTMLDivElement>({
    disabled: !onChange,
  });

  const handleClick = () => {
    if (!onChange) {
      return;
    }
    onChange(index);
  };
  return direction === 'vertical' ? (
    <VerticalStep {...props} />
  ) : (
    <>
      <StepLayout
        className="sinoui-step"
        $isVertical={labelPlacement === 'vertical'}
        onClick={handleClick}
        $isClickable={!!onChange}
        ref={ref}
      >
        {labelPlacement === 'vertical' && !last && (
          <Connector
            className={classNames('sinoui-step-connector', {
              'sinoui-step-connector--active': status === 'completed',
            })}
          >
            {connector}
          </Connector>
        )}
        <StepContainer
          className={classNames('sinoui-step-container', {
            'sinoui-step-container--vertical': labelPlacement === 'vertical',
          })}
        >
          <StepIcon icon={icon} index={index} isInHorizontal status={status} />
          <StepContent className="sinoui-step-content">
            <Title
              $active={status === 'active' || status === 'completed'}
              $error={status === 'error'}
              className="sinoui-step-title"
            >
              {title}
              {subTitle && (
                <SubTitle
                  className={classNames('sinoui-step-subtitle', {
                    'sinoui-step-subtitle--error': status === 'error',
                  })}
                >
                  {subTitle}
                </SubTitle>
              )}
            </Title>
            {description && (
              <Description
                className={classNames('sinoui-step-description', {
                  'sinoui-step-description--error': status === 'error',
                })}
                $active={status === 'active' || status === 'completed'}
              >
                {description}
              </Description>
            )}
          </StepContent>
        </StepContainer>
      </StepLayout>
      {!last && labelPlacement !== 'vertical' && (
        <Connector
          className={classNames('sinoui-step-connector', {
            'sinoui-step-connector--active': status === 'completed',
          })}
        >
          {connector}
        </Connector>
      )}
    </>
  );
}
