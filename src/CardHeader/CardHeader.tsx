import React from 'react';
import styled from 'styled-components';

export interface Props {
  avatar: React.ReactNode;
  action?: React.ReactNode;
  title: string;
  subheader?: string;
}
const CardHeaderWrapper = styled.div`
  display: flex;
  padding: 16px;
  align-items: center;
  font-size: ${(props) => props.theme.typography.body2.fontSize};
  & .card-header-avatar {
    flex: 0 0 auto;
    margin-right: 16px;
  }

  & .card-header-content {
    flex: 1 1 auto;
  }

  & .card-header-title {
    color: ${(props) => props.theme.palette.text.primary};
  }

  & .card-header-subheader {
    color: ${(props) => props.theme.palette.text.secondary};
  }

  & .card-header-action {
    flex: 0 0 auto;
  }
`;

export default function CardHeader({
  avatar,
  action,
  title,
  subheader,
}: Props) {
  return (
    <CardHeaderWrapper>
      <div className="card-header-avatar">{avatar}</div>
      <div className="card-header-content">
        <div className="card-header-title">{title}</div>
        <div className="card-header-subheader">{subheader}</div>
      </div>
      <div className="card-header-action">{action}</div>
    </CardHeaderWrapper>
  );
}
