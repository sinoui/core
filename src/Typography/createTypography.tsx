import React from 'react';
import Typography, { Props } from './Typography';

type FontType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

/**
 * 创建字体排版组件
 *
 * @param type 字体排版类型
 * @param displayName 组件显示名称
 */
function createTypography(type: FontType, displayName: string) {
  const Comp = React.forwardRef<HTMLElement, Omit<Props, 'type'>>(
    (props, ref) => <Typography {...props} type={type} ref={ref} />,
  );

  if (process.env.NODE_ENV !== 'production') {
    Comp.displayName = displayName;
  }

  return Comp;
}

export default createTypography;
