import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import colorCss from '@sinoui/core/utils/colorCss';
import MyContext from './MyContext';

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

  .sinoui-fab {
    position: absolute;
    top: 16px;
    left: 8px;
    margin-bottom: 8px;
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
      ...rest
    } = props;

    return (
      <MyContext.Provider
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
        >
          {children}
        </NavigationRailWrapper>
      </MyContext.Provider>
    );
  },
);

export default NavigationRail;
