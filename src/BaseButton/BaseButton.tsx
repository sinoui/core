import React from 'react';

/**
 * 基础按钮组件
 */
const BaseButton: React.SFC = ({ children }) => {
  return <button type="button">{children}</button>;
};

export default BaseButton;
