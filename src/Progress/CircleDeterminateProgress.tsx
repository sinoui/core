import React, { useRef, useEffect, useContext, useCallback } from 'react';
import { ThemeContext } from 'styled-components';
import classNames from 'classnames';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';
import type { ProgressPropsType } from './types';

/**
 * 环形定量进度指示器
 * @param props
 */
export default function CircleDeterminateProgress(props: ProgressPropsType) {
  const {
    size = 40,
    thickness = 3.6,
    color = 'primary',
    value = 0,
    className,
    style,
  } = props;
  const theme = useContext(ThemeContext);
  const canvas = useRef<HTMLCanvasElement>(null);
  const canvasCtx = useRef<CanvasRenderingContext2D | null>();
  const rafId = useRef<number>();
  const end = useRef(-90);
  const start = -90;

  const drawCanvas = useCallback(() => {
    const ctx = canvasCtx.current as CanvasRenderingContext2D;
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, size, size); // 清除画布已有内容
    end.current = start + (360 * value) / 100;
    // 绘制圆弧
    ctx.beginPath(); // 开始绘制路径
    ctx.arc(
      size / 2,
      size / 2,
      size / 2 - thickness,
      (start * Math.PI) / 180,
      (end.current * Math.PI) / 180,
    ); // 绘制一个弧线
    ctx.strokeStyle = getColorFromTheme(theme, color);
    ctx.lineWidth = thickness;
    ctx.stroke();
  }, [color, size, start, theme, thickness, value]);

  const draw = useCallback(() => {
    if (!rafId) {
      return;
    }
    rafId.current = requestAnimationFrame(() => {
      drawCanvas();
      draw();
    });
  }, [drawCanvas]);

  useEffect(() => {
    if (canvas.current && end.current < 270) {
      if (!canvasCtx.current) {
        canvasCtx.current = canvas.current.getContext('2d');
      }

      canvas.current.width = size;
      canvas.current.height = size;
      draw();
    }
    return () => cancelAnimationFrame(rafId.current as number);
  }, [color, draw, size, start, theme, thickness, value]);

  return (
    <div
      className={classNames(
        'sinoui-progress',
        'sinoui-progress--circle',
        'sinoui-progress--circle--determinate',
        className,
      )}
      style={style}
    >
      <canvas ref={canvas} />
    </div>
  );
}
