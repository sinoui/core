import React from 'react';
import Typography, { Props } from './Typography';

/**
 * 创建字体排版组件
 *
 * @param type 字体排版类型
 * @param displayName 组件显示名称
 */
function createTypography(type: string, displayName: string) {
  const Comp = React.forwardRef<HTMLElement, Omit<Props, 'type'>>(
    (props, ref) => {
      return <Typography {...props} type={type} ref={ref} />;
    },
  );

  if (process.env.NODE_ENV !== 'production') {
    Comp.displayName = displayName;
  }

  return Comp;
}

export default createTypography;
