import React from 'react';
import {
  ListOneLine,
  ListTwoLine,
  ListOneLineIcon,
  ListOneLineIconButton,
  ListClicked,
} from './listDemo';

export default {
  title: 'List',
};

export const 单行文本 = () => <ListOneLine />;
export const 单行含图标 = () => <ListOneLineIcon />;
export const 单行含IconButton = () => <ListOneLineIconButton />;
export const 双行文本list = () => <ListTwoLine />;
export const 单击 = () => <ListClicked />;
