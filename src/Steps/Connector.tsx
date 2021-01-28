import React from 'react';
import styled from 'styled-components';
import Divider from '../Divider';

const ConnectorLayout = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledDivider = styled(Divider)`
  flex: 1;
`;

export default function Connector() {
  return (
    <ConnectorLayout>
      <StyledDivider />
    </ConnectorLayout>
  );
}
