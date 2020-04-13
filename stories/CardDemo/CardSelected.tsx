import React, { useState } from 'react';
import { useRipple } from '@sinoui/ripple';
import { MdCheckCircle } from 'react-icons/md';
import Button from '@sinoui/core/Button';
import StyledCard from './Components/StyledCard';
import StyledDivider from './Components/StyledDivider';

export default function Demo() {
  const [selected, setSelected] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const ref = useRipple<HTMLDivElement>();

  // 选中卡片
  const setCardSelected = () => {
    setSelected(true);
  };

  // 取消卡片选中
  const cancelCardSelected = (e: React.MouseEvent) => {
    setSelected(false);
    e.stopPropagation();
  };

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <Button raised onClick={() => setDisabled(!disabled)}>
          设置禁用
        </Button>
      </div>
      <StyledCard onClick={setCardSelected} ref={ref} disabled={disabled}>
        {selected && <MdCheckCircle onClick={cancelCardSelected} />}
        <h1>Call</h1>
        <h1>Jennifer</h1>
        <StyledDivider />
        <div>October 07,2020</div>
      </StyledCard>
    </>
  );
}
