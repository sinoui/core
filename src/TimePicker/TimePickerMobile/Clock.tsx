import React, { useRef, useState } from 'react';
import ClockWrapper from './ClockWrapper';
import ClockNumber from './ClockNumber';
import ClockMinute from './ClockMinute';
import ClockPin from './ClockPin';
import ClockPointer from './ClockPointer';
import { CLOCK_PIN_SIZE } from './constants';
import {
  getHourOrMinuteRotateDeg,
  getHourByRotateDeg,
  getMinuteByRotateDeg,
} from './utils';

interface Props {
  /**
   * 钟表盘尺寸
   */
  size?: number;
  /**
   * 时针旋转角度
   */
  hourRotateDeg: number;
  /**
   * 分钟选择角度
   */
  minuteRotateDeg: number;
  /**
   * 时针旋转角度改变的回调函数
   */
  onChangeHourRotateDeg: (hour: number) => void;
  /**
   * 分针旋转角度改变的回调函数
   */
  onChangeMinuteRotateDeg: (hour: number) => void;
}
const hours = new Array(12).fill(1).map((_, index) => index + 1);
const minutes = new Array(60).fill(1).map((_, index) => index + 1);

export default function Clock({
  size = 260,
  hourRotateDeg,
  minuteRotateDeg,
  onChangeHourRotateDeg,
  onChangeMinuteRotateDeg,
}: Props) {
  const clockRef = useRef<HTMLDivElement | null>(null);
  // 开始移动指针
  const isMoveStart = useRef(false);
  // 停止移动指针
  const isMoveEnd = useRef(false);

  const [isHour, setIsHour] = useState(true);
  const rotateDeg = isHour ? hourRotateDeg : minuteRotateDeg;
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
    // 基于12点 右上方 1/4表盘
    let deg = Math.floor(xyDeg);
    if (x > 0 && y > 0) {
      // 基于12点 右下方 1/4表盘
      deg = 180 - xyDeg;
    } else if (x < 0 && y > 0) {
      // 基于12点 左下方 1/4表盘
      deg = 180 + xyDeg;
    } else if (x < 0 && y < 0) {
      // 基于12点 左上方 1/4表盘
      deg = 360 - xyDeg;
    }
    return getHourOrMinuteRotateDeg(deg, isHour);
  };

  const onTouchStart = () => {
    isMoveStart.current = true;
    isMoveEnd.current = false;
  };

  const onTouchEnd = (event: any) => {
    const { pageX, pageY } = event.nativeEvent.changedTouches[0];
    const currentRotateDeg = getRotateDegToBaseLine(pageX, pageY);
    if (isHour) {
      onChangeHourRotateDeg(currentRotateDeg);
    } else {
      onChangeMinuteRotateDeg(currentRotateDeg);
    }

    isMoveStart.current = false;
    isMoveEnd.current = true;

    if (isHour) {
      setIsHour(!isHour);
    }
  };

  const onTouchMove = (event: React.TouchEvent) => {
    const currentRotateDeg = getRotateDegToBaseLine(
      event.nativeEvent.touches[0].pageX,
      event.nativeEvent.touches[0].pageY,
    );
    if (currentRotateDeg !== rotateDeg) {
      if (isHour) {
        onChangeHourRotateDeg(currentRotateDeg);
      } else {
        onChangeMinuteRotateDeg(currentRotateDeg);
      }
    }

    isMoveStart.current = false;
    isMoveEnd.current = true;
  };

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <ClockWrapper
      $size={size}
      ref={clockRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    >
      {isHour
        ? hours.map((item) => (
            <ClockNumber
              key={item}
              number={item}
              size={size}
              selectedValue={getHourByRotateDeg(rotateDeg)}
            />
          ))
        : minutes.map((item) => (
            <ClockMinute
              key={item}
              number={item}
              size={size}
              selectedValue={getMinuteByRotateDeg(minuteRotateDeg)}
            />
          ))}
      <ClockPin />
      <ClockPointer size={size} rotateDeg={rotateDeg} />
    </ClockWrapper>
  );
}
