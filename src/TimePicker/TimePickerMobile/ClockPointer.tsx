import { useEffect, useRef } from 'react';
import styled from 'styled-components';

/**
 * 包装组件的属性
 */
interface WrapperProps {
  /**
   * 旋转角度（单位为 deg）
   */
  $rotateDeg: number;
  /**
   * 是否启用 css 过度动画
   */
  $isTransition: boolean;
}

const Wrapper = styled.div<WrapperProps>`
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

/**
 * 分钟点组件属性
 */
interface MinuteDotProps {
  /**
   * 是否选中
   */
  $selected?: boolean;
}

const MinuteDot = styled.div<MinuteDotProps>`
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

/**
 * 时钟点组件的属性
 */
export interface ClockPointerProps {
  /**
   * 旋转角度。单位为 deg。
   */
  rotateDeg: number;
  /**
   * 是否是小时视图
   */
  isHourView: boolean;
  /**
   * 是否启用 css 过渡动画
   */
  isTransition: boolean;
  /**
   * 切换 cs 过渡动画的回调函数
   */
  onTransitionChange: (transitionValue: boolean) => void;
}

/**
 * 时钟点组件
 *
 * @param props 组件属性
 * @param props.rotateDeg 旋转角度。单位为 deg。
 * @param props.isHourView 是否是小时视图
 * @param props.isTransition 是否启用 css 过渡动画
 * @param props.onTransitionChange 切换 cs 过渡动画的回调函数
 */
const ClockPointer: React.FC<ClockPointerProps> = ({
  rotateDeg,
  isHourView,
  isTransition,
  onTransitionChange,
  ...rest
}) => {
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
};

export default ClockPointer;
