import React from 'react';
import styled from 'styled-components';
import HelperLine from '@sinoui/core/HelperLine';
import HelperText from '@sinoui/core/HelperText';
import FormLabel from '@sinoui/core/FormLabel';

/**
 * 水平布局表单项组件
 */
interface HorizontalFormItemProps {
  /**
   * 标签
   */
  label: React.ReactNode;
  /**
   * 帮助性文本
   */
  helperText?: React.ReactNode;
  /**
   * 单项校验错误
   */
  error?: React.ReactNode;
  children?: React.ReactNode;
}

const Wrapper = styled.div.attrs(() => ({
  className: 'sinoui-form-item--horizontal',
}))`
  display: flex;

  & > .sinoui-form-item__content {
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
  }

  & > .sinoui-form-label {
    display: flex;
    justify-content: flex-end;
    align-self: flex-start;
    margin: 0;
    min-height: 40px;
    width: 160px;
    padding-top: 8px;
    padding-right: 8px;
    box-sizing: border-box;
  }
`;

export default function HorizontalFormItemProps({
  label,
  children,
  helperText,
  error,
}: HorizontalFormItemProps) {
  return (
    <Wrapper>
      <FormLabel layout="standard">{label}</FormLabel>
      <div className="sinoui-form-item__content">
        {children}
        <HelperLine>
          {helperText && !error && <HelperText>{helperText}</HelperText>}
          {error && <HelperText error>{helperText}</HelperText>}
        </HelperLine>
      </div>
    </Wrapper>
  );
}
