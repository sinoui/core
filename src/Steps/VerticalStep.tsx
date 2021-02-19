/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { useRipple } from '@sinoui/ripple';
import classNames from 'classnames';
import CheckCircle from './CheckCircleIcon';
import Error from './ErrorIcon';
import Connector from './Connector';

const StepLayout = styled.div<{
  $isVertical?: boolean;
  $isClickable?: boolean;
}>`
  padding: 0 16px;
  box-sizing: border-box;
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
`;

const Title = styled.span<{ $active?: boolean; $error?: boolean }>`
  color: ${({ theme, $active, $error }) =>
    $active
      ? theme.palette.text.primary
      : $error
      ? theme.palette.error.main
      : theme.palette.text.disabled};
  font-size: 14px;
  line-height: 24px;
  font-weight: ${({ theme, $active }) =>
    $active
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular};
`;

const Description = styled.div<{ $active?: boolean }>`
  color: ${({ theme, $active }) =>
    $active ? theme.palette.text.secondary : theme.palette.text.disabled};
  padding-bottom: 16px;
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
  font-size: 12px;
  color: ${({ theme }) => theme.palette.common.white};
  background: ${({ theme, $active }) =>
    $active ? theme.palette.primary.main : theme.palette.text.disabled};
`;

const IconWrapper = styled.span<{ $active?: boolean; $error?: boolean }>`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${({ theme, $active }) =>
    $active ? theme.palette.primary.main : theme.palette.text.disabled};
  ${({ theme, $error }) => $error && `color:${theme.palette.error.main}`};
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

const SubTitle = styled.div`
  display: inline;
  margin-left: 8px;
  color: ${({ theme }) => theme.palette.text.disabled};
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
      <IconWrapper className="sinoui-step-icon">
        <NumberIcon $active={status === 'active'} className="sinoui-step-icon">
          {index + 1}
        </NumberIcon>
      </IconWrapper>
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
        onClick={handleClick}
        $isClickable={!!onChange}
        ref={ref}
      >
        <StepContainer className="sinoui-step-container">
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
          {description && (
            <Description
              className="sinoui-step-description"
              $active={status === 'active' || status === 'completed'}
            >
              {description}
            </Description>
          )}
        </StepContainer>
      </StepLayout>
    </>
  );
}
