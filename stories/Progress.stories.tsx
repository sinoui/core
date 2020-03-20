import React from 'react';
import { LinearDeterminate } from './ProgressDemo';

export default {
  title: 'Progress',
};

export const 线性不定量指示器 = () => <LinearDeterminate linear />;
export const 线性定量指示器 = () => <LinearDeterminate linear determinate />;
export const 线性定量缓冲指示器 = () => (
  <LinearDeterminate linear determinate buffer />
);
export const 圆形不定量指示器 = () => <LinearDeterminate />;
export const 圆形定量指示器 = () => <LinearDeterminate determinate />;
