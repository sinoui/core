import React from 'react';
import styled from 'styled-components';
import Subtitle1 from '@sinoui/core/Subtitle1';

const TimeInputViewWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  padding-left: 16px;
`;
const TimeInputTitle = styled(Subtitle1)`
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
`;
export default function TimeInputView() {
  return (
    <TimeInputViewWrapper>
      <TimeInputTitle>请输入时间</TimeInputTitle>
    </TimeInputViewWrapper>
  );
}
