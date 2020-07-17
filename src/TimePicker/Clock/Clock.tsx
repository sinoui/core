import React, { useRef, useState } from 'react';
import ClockWrapper from './ClockWrapper';
import ClockNumber from './ClockNumber';
import ClockPin from './ClockPin';
import ClockPointer from './ClockPointer';
import { CLOCK_PIN_SIZE } from './constants';

const hours = new Array(12).fill(1).map((_, index) => index + 1);
export default function Clock({ size = 260 }: { size: number }) {
  const clockRef = useRef<HTMLDivElement | null>(null);
  // 开始移动指针
  const isMoveStart = useRef(false);
  // 停止移动指针
  const isMoveEnd = useRef(false);
  // 指针旋转角度
  const [rotateDeg, setRotateDeg] = useState(0);

  /**
   * 获取基于12点基线的旋转角度
   * @param pageX
   * @param pageY
   */
  const getRotateDegToBaseLine = (pageX: number, pageY: number) => {
    const { left, top } = clockRef?.current?.getBoundingClientRect() as any;
    const x = pageX - (left + size / 2 + CLOCK_PIN_SIZE / 2);
    const y = pageY - (top + size / 2 + CLOCK_PIN_SIZE / 2);
    const xyDeg = (Math.atan(Math.abs(x / y)) / (2 * Math.PI)) * 360;
    // 12点 - 3点
    let deg = Math.floor(xyDeg);
    // 3点 - 6点
    if (x > 0 && y > 0) {
      deg = 180 - xyDeg;
    } else if (x < 0 && y > 0) {
      // 6点 - 9点
      deg = 180 + xyDeg;
    } else if (x < 0 && y < 0) {
      // 9点 - 12点
      deg = 360 - xyDeg;
    }
    // 旋转角度超过 两个时间相夹的一半角度时 选中下一个时间
    return deg;
    // if (deg - rotateDeg > 30 / 2) {
    //   console.log(rotateDeg);
    //   return rotateDeg + 30;
    // }

    // if (rotateDeg - deg > 30 / 2) {
    //   console.log(rotateDeg);
    //   return rotateDeg - 30;
    // }
    // console.log(rotateDeg);
    // return rotateDeg;
  };

  // 鼠标按下 开始移动
  const onMouseDown = (_event: React.MouseEvent) => {
    isMoveStart.current = true;
    isMoveEnd.current = false;
  };

  const onMouseMove = (event: React.MouseEvent) => {
    const { pageX, pageY } = event;
    // 鼠标按下 且 没抬起时移动指针
    if (isMoveStart.current && !isMoveEnd.current) {
      const currentRotateDeg = getRotateDegToBaseLine(pageX, pageY);
      if (currentRotateDeg !== rotateDeg) {
        setRotateDeg(currentRotateDeg);
      }
    }
  };

  // 鼠标抬起
  const onMouseUp = (event: React.MouseEvent) => {
    const { pageX, pageY } = event;
    const currentRotateDeg = getRotateDegToBaseLine(pageX, pageY);
    if (currentRotateDeg !== rotateDeg) {
      setRotateDeg(currentRotateDeg);
    }
    isMoveStart.current = false;
    isMoveEnd.current = true;
  };

  const onTouchMove = (event: React.TouchEvent) => {
    const currentRotateDeg = getRotateDegToBaseLine(
      event.nativeEvent.touches[0].pageX,
      event.nativeEvent.touches[0].pageY,
    );
    if (currentRotateDeg !== rotateDeg) {
      setRotateDeg(currentRotateDeg);
    }

    isMoveStart.current = false;
    isMoveEnd.current = true;
  };

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <ClockWrapper
      $size={size}
      ref={clockRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {hours.map((hour) => (
        <ClockNumber key={hour} $number={hour} $size={size} />
      ))}
      <ClockPin />
      <ClockPointer size={size} rotateDeg={rotateDeg} />
    </ClockWrapper>
  );
}
