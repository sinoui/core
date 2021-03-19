import React from 'react';
import styled from 'styled-components';
import Typography from '@sinoui/core/Typography';
import Link from '@sinoui/core/Link';

const TypographyWrapper = styled(Typography)`
  > a:not(:first-child) {
    margin-left: 10px;
  }
`;

function LinkDemo() {
  return (
    <TypographyWrapper>
      <Link href="/docs/components/bottomSheet">BottomSheet</Link>
      <Link href="/docs/components/paper">Paper</Link>
      <Link href="/docs/components/bottomNavigation">bottomNavigation</Link>
    </TypographyWrapper>
  );
}

export default LinkDemo;
