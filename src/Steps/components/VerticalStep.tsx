/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { useRipple } from '@sinoui/ripple';
import classNames from 'classnames';
import Connector from './Connector';
import StepIcon from './StepIcon';
import Title from './Title';
import SubTitle from './SubTitle';
import StepContent from './StepContent';

const StepLayout = styled.div<{
  $isClickable?: boolean;
}>`
  padding: 0 16px;
  box-sizing: border-box;
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
`;

const Description = styled.div<{ $active?: boolean }>`
  color: ${({ theme, $active }) =>
    $active ? theme.palette.text.secondary : theme.palette.text.disabled};
  padding-bottom: 16px;
`;

const StepContainer = styled.div`
  display: grid;
  display: -ms-grid;
  -ms-grid-columns: 48px auto;
  -ms-grid-rows: auto auto;
  grid-template-columns: 48px auto;
  grid-template-rows: auto auto;

  .sinoui-step-icon {
    -ms-grid-column: 1;
    -ms-grid-row: 1;
  }

  .sinoui-step-content {
    -ms-grid-column: 2;
    -ms-grid-row: 1;
  }

  .sinoui-step-connector {
    -ms-grid-column: 1;
    -ms-grid-row: 2;
  }

  .sinoui-step-description {
    -ms-grid-column: 2;
    -ms-grid-row: 2;
  }

  hr {
    height: calc(100% - 8px);
  }
`;

export interface VerticalStepProps {
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
   * 点击时的回调函数
   */
  onChange?: (current: number) => void;
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
 * 垂直方向步进器
 * @param props
 */
export default function VerticalStep(props: VerticalStepProps) {
  const {
    title,
    index = 0,
    last,
    connector,
    icon,
    onChange,
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
  return (
    <>
      <StepLayout
        className="sinoui-step"
        onClick={handleClick}
        $isClickable={!!onChange}
        ref={ref}
      >
        <StepContainer className="sinoui-step-container">
          <StepIcon status={status} icon={icon} index={index} />
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
          </StepContent>
          {!last ? (
            <Connector
              className={classNames('sinoui-step-connector', {
                'sinoui-step-connector--active': status === 'completed',
              })}
            >
              {connector}
            </Connector>
          ) : (
            <div className="sinoui-step-connector" />
          )}
          <Description
            className={classNames('sinoui-step-description', {
              'sinoui-step-description--error': status === 'error',
            })}
            $active={status === 'active' || status === 'completed'}
          >
            {description}
          </Description>
        </StepContainer>
      </StepLayout>
    </>
  );
}
