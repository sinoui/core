import React, { useRef } from 'react';
import styled from 'styled-components';
import ClockHour from './ClockHour';
import ClockMinute from './ClockMinute';
import ClockPin from './ClockPin';
import ClockPointer from './ClockPointer';
import { CLOCK_PIN_SIZE, CLOCK_SIZE } from './constants';
import {
  getHourOrMinuteRotateDeg,
  getHourByRotateDeg,
  getMinuteByRotateDeg,
} from './utils';

const ClockWrapper = styled.div`
  position: relative;
  width: ${CLOCK_SIZE}px;
  height: ${CLOCK_SIZE}px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.07);
`;
interface Props {
  /**
   * 当前设置是否为小时
   */
  isHourView: boolean;
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
  /**
   * 时分视图切换时的回调函数
   */
  onChangeHourOrMinuteView: (isHourView: boolean) => void;
}
const hours = new Array(12).fill(1).map((_, index) => index + 1);
const minutes = new Array(60).fill(1).map((_, index) => index + 1);

export default function Clock({
  isHourView,
  hourRotateDeg,
  minuteRotateDeg,
  onChangeHourRotateDeg,
  onChangeMinuteRotateDeg,
  onChangeHourOrMinuteView,
}: Props) {
  const clockRef = useRef<HTMLDivElement | null>(null);
  // 开始移动指针
  const isMoveStart = useRef(false);
  // 停止移动指针
  const isMoveEnd = useRef(false);
  // 是否已经触发touch事件监听
  const isTouchedEvent = useRef(false);
  const rotateDeg = isHourView ? hourRotateDeg : minuteRotateDeg;
  /**
   * 获取基于12点基线的旋转角度
   * @param pageX
   * @param pageY
   */
  const getRotateDegToBaseLine = (pageX: number, pageY: number) => {
    const { left, top } = clockRef?.current?.getBoundingClientRect() as any;
    const x = pageX - (left + CLOCK_SIZE / 2 + CLOCK_PIN_SIZE / 2);
    const y = pageY - (top + CLOCK_SIZE / 2 + CLOCK_PIN_SIZE / 2);
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
    return getHourOrMinuteRotateDeg(deg, isHourView);
  };

  /**
   * 移动端事件
   */
  const onTouchStart = () => {
    isMoveStart.current = true;
    isMoveEnd.current = false;
    isTouchedEvent.current = true;
  };

  /**
   * PC端事件
   */
  const onMouseDown = () => {
    // 已经触发touch事件 就不再触发mouse事件处理函数
    if (!isTouchedEvent.current) {
      isMoveStart.current = true;
      isMoveEnd.current = false;
    }
  };

  /**
   * 改变时分指针位置 更新旋转角度
   */
  const onChangeHourMinuteValue = (pageX: number, pageY: number) => {
    if (isMoveStart.current && !isMoveEnd.current) {
      const currentRotateDeg = getRotateDegToBaseLine(pageX, pageY);
      // 最新旋转角度和之前旋转角度不一致时  更新旋转角度
      if (currentRotateDeg !== rotateDeg) {
        if (isHourView) {
          onChangeHourRotateDeg(currentRotateDeg);
        } else {
          // value 为空时取当前时间的分钟对应的旋转角度
          onChangeMinuteRotateDeg(currentRotateDeg);
        }
      }
    }
  };

  /**
   * 移动端事件
   */
  const onTouchEnd = (event: React.TouchEvent) => {
    const { pageX, pageY } = event.nativeEvent.changedTouches[0];
    onChangeHourMinuteValue(pageX, pageY);
    if (isHourView) {
      onChangeHourOrMinuteView(!isHourView);
    }
    isMoveStart.current = false;
    isMoveEnd.current = true;
  };

  /**
   * PC端事件
   */
  const onMouseUp = (event: React.MouseEvent) => {
    const { pageX, pageY } = event;
    onChangeHourMinuteValue(pageX, pageY);
    if (isHourView) {
      onChangeHourOrMinuteView(!isHourView);
    }
    isMoveStart.current = false;
    isMoveEnd.current = true;
  };

  /**
   * 移动端事件
   */
  const onTouchMove = (event: React.TouchEvent) => {
    onChangeHourMinuteValue(
      event.nativeEvent.touches[0].pageX,
      event.nativeEvent.touches[0].pageY,
    );
  };

  /**
   * PC端事件
   */
  const onMouseMove = (event: React.MouseEvent) => {
    const { pageX, pageY } = event;
    onChangeHourMinuteValue(pageX, pageY);
  };

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <ClockWrapper
      ref={clockRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className="sinoui-time-picker-mobile-view__clock"
    >
      {isHourView
        ? hours.map((item) => (
            <ClockHour
              key={item}
              number={item}
              selectedValue={getHourByRotateDeg(rotateDeg)}
            />
          ))
        : minutes.map((item) => (
            <ClockMinute
              key={item}
              number={item}
              selectedValue={getMinuteByRotateDeg(minuteRotateDeg)}
            />
          ))}
      <ClockPin />
      <ClockPointer rotateDeg={rotateDeg} />
    </ClockWrapper>
  );
}
