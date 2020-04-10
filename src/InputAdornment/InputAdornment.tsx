import React from 'react';
import styled, { css } from 'styled-components';
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
  as?: React.ReactType;
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
}

const InputAdornmentLayout = styled.div.attrs(
  ({ $position }: InputAdornmentLayoutProps) => ({
    className: bemClassNames('sinoui-input-adornment', {
      start: $position === 'start',
      end: $position === 'end',
    }),
  }),
)<InputAdornmentLayoutProps>`
  flex-shrink: 0;
  display: flex;
  height: 0.01em;
  align-items: center;
  max-height: 2em;
  white-space: nowrap;
  ${({ $position }) => ($position === 'start' ? startCss : endCss)};
  ${({ $disablePointerEvents }) =>
    $disablePointerEvents &&
    `
      pointer-events: none;
      user-select: none;
  `};
`;

const InputTextAdornment = styled.p((props) => {
  const style = props.theme.typography.body1;
  return {
    ...style,
    color: props.theme.palette.text.secondary,
    margin: 0,
  };
});

/**
 * 输入框装饰器
 */
const InputAdornment = (props: Props) => {
  const { children, disablePointerEvents, position, ...rest } = props;
  const isStringChildren = typeof children === 'string';
  const $disablePointerEvents = disablePointerEvents ?? isStringChildren;

  // TODO: 使用 Typography 代替 InputTextAdornment
  return (
    <InputAdornmentLayout
      {...rest}
      $disablePointerEvents={$disablePointerEvents}
      $position={position}
    >
      {isStringChildren ? (
        <InputTextAdornment>{children}</InputTextAdornment>
      ) : (
        children
      )}
    </InputAdornmentLayout>
  );
};

export default InputAdornment;
