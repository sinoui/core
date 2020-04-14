import React from 'react';
import styled from 'styled-components';

// interface HorizontalFormItemProps {
//   /**
//    * 标签
//    */
//   label: React.ReactNode;
//   /**
//    * 表单控件
//    */
//   control?: React.ReactNode;
//   /**
//    * 帮助性文本
//    */
//   helperText?: React.ReactNode;
//   /**
//    * 单项校验错误
//    */
//   error?: React.ReactNode;
// }

const Wrapper = styled.div.attrs(() => ({
  className: 'sinoui-form-item--horizontal',
}))`
  display: flex;
`;
export default function FormItem() {
  return <Wrapper />;
}
