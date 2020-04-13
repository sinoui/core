import React from 'react';
import { BottomAppBarDemo, BottomAppBarDemoNoFab } from './appBarDemos';

export default {
  title: 'BottomAppBar',
};

export const 默认居中 = () => <BottomAppBarDemo />;

export const 没有浮动操作按钮 = () => <BottomAppBarDemoNoFab />;

export const 居右 = () => <BottomAppBarDemo endFab />;

export const 居中嵌入 = () => <BottomAppBarDemo insertFab />;
