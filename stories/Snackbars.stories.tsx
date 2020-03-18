import React from 'react';
import { BaseDemo, ActionDemo, FabDemo } from './SnackbarsDemo';

export default {
  title: 'Snackbars',
};

export const 默认单行纯文本 = () => <BaseDemo message="单行文本消息条" />;
export const 多行提示信息 = () => (
  <BaseDemo message="多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本消息条" />
);
export const 宽屏居左显示 = () => (
  <BaseDemo
    message="多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本消息条"
    leading
  />
);
export const 带有操作按钮 = () => (
  <ActionDemo message="多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本消息条" />
);
export const 操作按钮换行 = () => (
  <ActionDemo
    message="多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本消息条"
    stacked
  />
);
export const 显示在浮动操作按钮之上 = () => <FabDemo />;
