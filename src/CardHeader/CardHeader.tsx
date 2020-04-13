import React from 'react';
import styled from 'styled-components';

export interface Props {
  /**
   * 卡片头部头像
   */
  avatar?: React.ReactNode;
  /**
   * 卡片头部操作
   */
  action?: React.ReactNode;
  /**
   * 卡片头部主标题
   */
  title: string;
  /**
   * 卡片头部副标题
   */
  subheader?: string;
}
const CardHeaderWrapper = styled.div`
  display: flex;
  padding: 0 16px;
  height: 72px;
  align-items: center;
  box-sizing: border-box;
  font-size: ${(props) => props.theme.typography.body2.fontSize};
  & .card-header-avatar {
    flex: 0 0 auto;
    margin-right: 16px;
  }

  & .card-header-content {
    flex: 1 1 auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & .card-header-title {
    color: ${(props) => props.theme.palette.text.primary};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & .card-header-subheader {
    color: ${(props) => props.theme.palette.text.secondary};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & .card-header-action {
    flex: 0 0 auto;
  }
`;

/**
 * CardHeader 没有头像和action时使用 props.theme.typography.h6
 */
const CardHeaderTitle = styled.div((props) => props.theme.typography.h6);

/**
 *
 * CardHeader  卡片头部组件
 */
export default function CardHeader({
  avatar,
  action,
  title,
  subheader,
}: Props) {
  return (
    <CardHeaderWrapper>
      {avatar && <div className="card-header-avatar">{avatar}</div>}
      <div className="card-header-content">
        {avatar && action ? (
          <div className="card-header-title">{title}</div>
        ) : (
          <CardHeaderTitle>{title}</CardHeaderTitle>
        )}

        {subheader && <div className="card-header-subheader">{subheader}</div>}
      </div>
      {action && <div className="card-header-action">{action}</div>}
    </CardHeaderWrapper>
  );
}
