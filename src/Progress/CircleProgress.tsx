import React, { useRef, useEffect, useContext, useCallback } from 'react';
import { ThemeContext } from 'styled-components';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';
import DivCanvas from './DivCanvas';
import type { ProgressPropsType } from './types';
import NODE_ENV from '../utils/env';

const PROGRESS_MAX_WIDTH = 1.9; // 弧度
const PROGRESS_WIDTH_DELTA = 0.05;

/**
 * 环形不定量进度指示器
 * @param props
 */
export default function CircleProgress(props: ProgressPropsType) {
  const { size = 40, thickness = 3.6, color = 'primary' } = props;
  const theme = useContext(ThemeContext);
  const canvas = useRef<HTMLCanvasElement>(null);
  const canvasCtx = useRef<CanvasRenderingContext2D | null>();
  const rafId = useRef<number>();
  const progressState = useRef<'expand' | 'collapse'>('expand');
  const progressWidth = useRef(0);

  const drawCanvas = useCallback(() => {
    const ctx = canvasCtx.current;
    if (!ctx) return;
    if (progressState.current === 'expand') {
      progressWidth.current += PROGRESS_WIDTH_DELTA;
      if (progressWidth.current > PROGRESS_MAX_WIDTH) {
        progressState.current = 'collapse';
        progressWidth.current -= PROGRESS_WIDTH_DELTA;
      }
    } else {
      progressWidth.current -= PROGRESS_WIDTH_DELTA;
      if (progressWidth.current < 0) {
        progressState.current = 'expand';
        progressWidth.current = PROGRESS_WIDTH_DELTA;
      }
    }

    const centerPoint = { x: size / 2, y: size / 2 };

    ctx.clearRect(0, 0, size, size);
    ctx.beginPath();

    if (progressState.current === 'expand') {
      ctx.arc(
        centerPoint.x,
        centerPoint.y,
        size / 2 - thickness,
        Math.PI * 0,
        Math.PI * progressWidth.current,
      );
    } else {
      ctx.arc(
        centerPoint.x,
        centerPoint.y,
        size / 2 - thickness,
        Math.PI * (PROGRESS_MAX_WIDTH - progressWidth.current),
        Math.PI * PROGRESS_MAX_WIDTH,
      );
    }
    ctx.stroke();
  }, [size, thickness]);

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
    if (canvas.current && !canvasCtx.current) {
      canvasCtx.current =
        NODE_ENV === 'test' ? null : canvas.current.getContext('2d');
      canvas.current.width = size;
      canvas.current.height = size;
      if (canvasCtx.current) {
        canvasCtx.current.strokeStyle = getColorFromTheme(theme, color);
        canvasCtx.current.lineWidth = thickness;
        draw();
      }
    }
    return () => cancelAnimationFrame(rafId.current as number);
  }, [color, draw, drawCanvas, rafId, size, theme, thickness]);

  return (
    <DivCanvas {...props} size={size}>
      <canvas ref={canvas} />
    </DivCanvas>
  );
}
