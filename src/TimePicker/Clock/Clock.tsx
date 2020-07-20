import React, { useRef, useState } from 'react';
import ClockWrapper from './ClockWrapper';
import ClockNumber from './ClockNumber';
import ClockMinute from './ClockMinute';
import ClockPin from './ClockPin';
import ClockPointer from './ClockPointer';
import { CLOCK_PIN_SIZE } from './constants';
import {
  getHourOrMinuteRotateDeg,
  getRotateDegByTimeValue,
  getHourByRotateDeg,
  getMinuteByRotateDeg,
} from './utils';
import parseTime from '../parseTime';

interface Props {
  /**
   * 钟表盘尺寸
   */
  size?: number;
  /**
   * 当前时间 hh:mm
   */
  value?: string;
  /**
   * 指定时间值发生变化的回调函数。
   */
  onChange?: (value?: string) => void;
}
const hours = new Array(12).fill(1).map((_, index) => index + 1);
const minutes = new Array(60).fill(1).map((_, index) => index + 1);

export default function Clock({ value = '', size = 260, onChange }: Props) {
  const clockRef = useRef<HTMLDivElement | null>(null);
  // 开始移动指针
  const isMoveStart = useRef(false);
  // 停止移动指针
  const isMoveEnd = useRef(false);
  const [hour, minute] = parseTime(value);
  // 当前时间 时分指针旋转角度
  const [hourDeg, minuteDeg] = getRotateDegByTimeValue(hour, minute);
  // 时针旋转角度
  const [hourRotateDeg, setHourRotateDeg] = useState(hourDeg);
  // 分针旋转角度
  const [minurteRotateDeg, setMinuteRotateDeg] = useState(minuteDeg);
  const [isHour, setIsHour] = useState(true);
  const rotateDeg = isHour ? hourRotateDeg : minurteRotateDeg;
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
        if (isHour) {
          setHourRotateDeg(currentRotateDeg);
        } else {
          setMinuteRotateDeg(currentRotateDeg);
        }
      }
    }
  };

  // 鼠标抬起 触发onChange
  const onMouseUp = (event: React.MouseEvent) => {
    const { pageX, pageY } = event;
    const currentRotateDeg = getRotateDegToBaseLine(pageX, pageY);
    if (isHour) {
      setHourRotateDeg(currentRotateDeg);
    } else {
      setMinuteRotateDeg(currentRotateDeg);
      const newValue = `${getHourByRotateDeg(
        hourRotateDeg,
      )}:${getMinuteByRotateDeg(currentRotateDeg)}`;
      console.log('newValue', newValue);
      if (onChange) {
        onChange(newValue);
      }
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
        setHourRotateDeg(currentRotateDeg);
      } else {
        setMinuteRotateDeg(currentRotateDeg);
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
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
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
              selectedValue={getMinuteByRotateDeg(minurteRotateDeg)}
            />
          ))}
      <ClockPin />
      <ClockPointer size={size} rotateDeg={rotateDeg} />
    </ClockWrapper>
  );
}
