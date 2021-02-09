/* eslint-disable no-nested-ternary */
import React from 'react';
import styled, { css } from 'styled-components';
import CheckCircle from '@sinoui/icons/CheckCircle';
import Error from '@sinoui/icons/Error';
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

const Title = styled.span<{ $active?: boolean; $error?: boolean }>`
  color: ${({ theme, $active, $error }) =>
    $active
      ? theme.palette.text.primary
      : $error
      ? theme.palette.error.main
      : theme.palette.text.disabled};
  font-size: 14px;
  font-weight: ${({ theme, $active }) =>
    $active
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular};
`;

const Description = styled.div<{ $active?: boolean }>`
  color: ${({ theme, $active }) =>
    $active ? theme.palette.text.primary : theme.palette.text.disabled};
`;

const StepContent = styled.div<{ $isVertical?: boolean }>`
  display: inline-block;
  vertical-align: top;
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
  line-height: 24px;
  color: ${({ theme }) => theme.palette.common.white};
  background: ${({ theme, $active }) =>
    $active ? theme.palette.primary.main : theme.palette.text.disabled};
`;

const IconWrapper = styled.span<{ $active?: boolean; $error?: boolean }>`
  margin-right: 8px;
  color: ${({ theme, $active }) =>
    $active ? theme.palette.primary.main : theme.palette.text.disabled};
  ${({ theme, $error }) => $error && `color:${theme.palette.error.main}`};
`;

const StepContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const SubTitle = styled.div`
  display: inline;
  margin-left: 8px;
  color: ${({ theme }) => theme.palette.text.disabled};
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

  const ref = onChange ? useRipple<HTMLDivElement>() : null;

  const renderIcon = () => {
    if (icon) {
      if (typeof icon === 'function') {
        return icon(status);
      }
      return (
        <IconWrapper
          $active={status === 'active' || status === 'completed'}
          $error={status === 'error'}
          className="sinoui-step-icon"
        >
          {icon}
        </IconWrapper>
      );
    }
    if (status === 'completed') {
      return (
        <IconWrapper $active className="sinoui-step-icon">
          <CheckCircle />
        </IconWrapper>
      );
    }
    if (status === 'error') {
      return (
        <IconWrapper className="sinoui-step-icon" $error>
          <Error />
        </IconWrapper>
      );
    }

    return (
      <NumberIcon $active={status === 'active'} className="sinoui-step-icon">
        {index + 1}
      </NumberIcon>
    );
  };

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
          {renderIcon()}
          <StepContent className="sinoui-step-content">
            <Title
              $active={status === 'active' || status === 'completed'}
              $error={status === 'error'}
              className="sinoui-step-title"
            >
              {title}
              {subTitle && (
                <SubTitle className="sinoui-step-subtitle">{subTitle}</SubTitle>
              )}
            </Title>
            {description && (
              <Description
                className="sinoui-step-description"
                $active={status === 'active' || status === 'completed'}
              >
                {description}
              </Description>
            )}
          </StepContent>
        </StepContainer>
      </StepLayout>
      {!last &&
        (labelPlacement !== 'vertical' ||
          (labelPlacement === 'vertical' && direction === 'vertical')) && (
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
