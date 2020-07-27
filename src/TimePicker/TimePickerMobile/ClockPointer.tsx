import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{
  $rotateDeg: number;
  $isTransition: boolean;
}>`
  position: absolute;
  left: calc((100% - 2px) / 2);
  width: 2px;
  height: 40%;
  bottom: 50%;
  background-color: ${({ theme }) => theme.palette.primary.main};
  ${(props) =>
    props.$isTransition &&
    `transition: ${props.theme.transitions.create('transform')}`};
  transform: ${({ $rotateDeg = 0 }) => `rotate3d(0,0,1,${$rotateDeg}deg)`};
  transform-origin: center bottom 0;
`;

const MinuteDot = styled.div<{
  $selected?: boolean;
}>`
  top: -21px;
  left: -15px;
  width: 4px;
  border: 14px solid ${({ theme }) => theme.palette.primary.main};
  height: 4px;
  position: absolute;
  box-sizing: content-box;
  border-radius: 100%;
  background-color: ${({ theme, $selected }) =>
    $selected ? '#fff' : theme.palette.primary.main};
`;

export default function ClockPointer({
  rotateDeg,
  isHourView,
  isTransition,
  onTransitionChange,
  ...rest
}: {
  rotateDeg: number;
  isHourView: boolean;
  isTransition: boolean;
  onTransitionChange: (transitionValue: boolean) => void;
}) {
  const hourViewRef = useRef(isHourView);

  useEffect(() => {
    // 时分视图切换时 增加指针旋转动画
    if (hourViewRef.current !== isHourView) {
      onTransitionChange(true);
    }
    hourViewRef.current = isHourView;
  }, [isHourView, onTransitionChange]);

  return (
    <Wrapper $rotateDeg={rotateDeg} $isTransition={isTransition} {...rest}>
      <MinuteDot
        className="sinoui-clock__pointer-minute-dot"
        $selected={!isHourView && rotateDeg % 5 !== 0}
      />
    </Wrapper>
  );
}
