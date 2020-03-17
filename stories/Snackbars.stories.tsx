import React from 'react';
import {
  BaseDemo,
  ActionDemo,
  MessageTwoLineDemo,
  FabDemo,
} from './SnackbarsDemo';

export default {
  title: 'Snackbars',
};

export const 默认单行纯文本 = () => <BaseDemo />;
export const 多行提示信息 = () => <MessageTwoLineDemo />;
export const 带有操作按钮 = () => <ActionDemo />;
export const 宽屏居左显示 = () => <BaseDemo leading />;
export const 操作按钮换行 = () => <MessageTwoLineDemo stacked />;
export const 显示在浮动操作按钮之上 = () => <FabDemo />;
