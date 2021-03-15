import React from 'react';
import styled, { css } from 'styled-components';
import Body1 from '@sinoui/core/Body1';
import bemClassNames from '../utils/bemClassNames';

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
  as?: React.ElementType;
  /**
   * 自定义样式类名称
   */
  className?: string;
}

const endCss = css`
  margin-left: 8px;
`;

const startCss = css`
  margin-right: 8px;
`;

interface InputAdornmentLayoutProps {
  /**
   * 装饰器相对于输入框的位置。
   */
  $position: 'start' | 'end';
  /**
   * 禁止点击事件。这个属性的作用是：点击装饰器会让输入框获取到焦点。
   */
  $disablePointerEvents?: boolean;
  $isText?: boolean;
}

const InputAdornmentLayout = styled.div<InputAdornmentLayoutProps>`
  flex-shrink: 0;
  display: flex;
  height: 0.01em;
  align-items: center;
  max-height: 2em;
  white-space: nowrap;
  color: ${({ theme }) => theme.palette.text.secondary};
  [disabled] > & {
    color: ${({ theme }) => theme.palette.text.disabled};
  }

  ${({ $position, $isText }) =>
    !$isText && ($position === 'start' ? startCss : endCss)};
  ${({ $disablePointerEvents }) =>
    $disablePointerEvents &&
    `
      pointer-events: none;
      user-select: none;
  `};
`;

/**
 * 输入框装饰器
 */
const InputAdornment = (props: Props) => {
  const {
    children,
    disablePointerEvents,
    position,
    className,
    ...rest
  } = props;
  const isTextChildren = typeof children === 'string';
  const $disablePointerEvents = disablePointerEvents ?? isTextChildren;

  return (
    <InputAdornmentLayout
      {...rest}
      $disablePointerEvents={$disablePointerEvents}
      $position={position}
      $isText={isTextChildren}
      className={bemClassNames(
        'sinoui-input-adornment',
        {
          start: position === 'start',
          end: position === 'end',
          text: isTextChildren,
        },
        className,
      )}
    >
      {isTextChildren ? <Body1 color="inherit">{children}</Body1> : children}
    </InputAdornmentLayout>
  );
};

export default InputAdornment;
