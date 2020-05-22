import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import colorCss from '@sinoui/core/utils/colorCss';
import NavigationRailContext from './MyContext';

const alignFun = (align: string) => {
  if (align === 'start') {
    return 'flex-start';
  }
  if (align === 'center') {
    return 'center';
  }
  return 'flex-end';
};

const NavigationRailWrapper = styled.div<{
  align?: 'start' | 'center' | 'end';
  $fab?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ align = 'start' }) => alignFun(align)};
  width: 72px;
  height: 100%;
  ${({ theme }) =>
    colorCss('background-color', theme.palette.background.paper)};
  box-shadow: ${({ theme }) => theme.shadows[0]};
  border-right: 1px solid ${(props) => props.theme.palette.divider};
  padding-top: ${({ $fab }) => ($fab ? 88 : 0)}px;
  position: relative;

  .sinoui-fab {
    position: absolute;
    top: 16px;
    left: 8px;
  }
`;

export interface Props {
  /**
   * 是否显示所有标签
   */
  showLabels?: boolean;
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 添加自定义类名
   */
  className?: string;
  /**
   * 值变化时的回调函数
   */
  onChange?: (e: React.FormEvent<HTMLDivElement>, value: string) => void;
  /**
   * value值
   */
  value?: string;
  /**
   * 布局显示
   */
  align?: 'start' | 'center' | 'end';
  /**
   * fab是否显示
   */
  fab?: React.ReactNode;
}

/**
 * 垂直导航栏
 *
 * @param {Props} props
 * @returns
 */
const NavigationRail = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLInputElement>) => {
    const {
      showLabels = true,
      children,
      className,
      onChange,
      value,
      align,
      fab,
      ...rest
    } = props;

    return (
      <NavigationRailContext.Provider
        value={{
          showLabels,
          onChange,
          selectedValue: value,
        }}
      >
        <NavigationRailWrapper
          className={classNames('sinoui-navigation-rail', className)}
          {...rest}
          ref={ref}
          align={align}
          $fab={!!fab}
        >
          {fab}
          {children}
        </NavigationRailWrapper>
      </NavigationRailContext.Provider>
    );
  },
);

export default NavigationRail;
