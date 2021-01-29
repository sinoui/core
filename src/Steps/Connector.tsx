import React from 'react';
import styled from 'styled-components';
import Divider from '../Divider';

export interface Props {
  complete?: boolean;
}

const ConnectorLayout = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledDivider = styled(Divider)<{ complete?: boolean }>`
  flex: 1;
  background: ${({ complete, theme }) =>
    complete ? theme.palette.primary.main : theme.palette.text.disabled};
`;

export default function Connector(props: Props) {
  const { complete } = props;
  return (
    <ConnectorLayout>
      <StyledDivider complete={complete} />
    </ConnectorLayout>
  );
}
