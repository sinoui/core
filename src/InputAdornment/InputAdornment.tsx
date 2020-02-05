import React from 'react';
import styled, { css } from 'styled-components';

export interface Props {
  /**
   * 装饰器相对于输入框的位置。
   */
  position: 'start' | 'end';
  /**
   * 禁止点击事件。这个属性的作用是：点击装饰器会让输入框获取到焦点。
   */
  disablePointerEvents?: boolean;
  /**
   * 组件的内容。通常是一个 IconButton 或者字符串。
   */
  children: React.ReactNode;
  /**
   * 根元素使用的组件。默认为 `div`。
   */
  component?: React.ReactType;
}

const endCss = css`
  margin-left: 8px;
`;

const startCss = css`
  margin-right: 8px;
`;

const InputAdornmentLayout = styled.div<Props>`
  display: flex;
  height: 0.01em;
  align-items: center;
  max-height: 2em;
  white-space: nowrap;
  ${({ position }) => (position === 'start' ? startCss : endCss)};
`;

/**
 * 输入框装饰器
 */
const InputAdornment = (props: Props) => {
  // TODO: 判断 children 是否为 string
  return <InputAdornmentLayout {...props} />;
};

export default InputAdornment;
