import React from 'react';
import {
  ListOneLine,
  ListTwoLine,
  ListOneLineIcon,
  ListOneLineIconButton,
  ListClicked,
  ListCheckboxPrimary,
  ListCheckboxSecondary,
  ListDisabled,
  ListInsert,
  ListTwoLineIcon,
  ListAvatarText,
} from './listDemo';

export default {
  title: 'List',
};

export const 单行文本 = () => <ListOneLine />;

export const 单行含图标 = () => <ListOneLineIcon />;

export const 单行含IconButton = () => <ListOneLineIconButton />;

export const 双行文本 = () => <ListTwoLine />;

export const 双行含图标 = () => <ListTwoLineIcon />;

export const 多行文本含头像 = () => <ListAvatarText />;

export const 单击 = () => <ListClicked />;

export const 主要操作区域的行为与ListItem的单击行为保持一致 = () => (
  <ListCheckboxPrimary />
);
export const 辅助操作区行为 = () => <ListCheckboxSecondary />;

export const 列表项禁用 = () => <ListDisabled />;

export const 嵌套列表 = () => <ListInsert />;
