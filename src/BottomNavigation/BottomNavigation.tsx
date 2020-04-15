import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { removeUndefinedProperties } from '@sinoui/core/utils/objects';
import type { BottomNavActionProps } from '@sinoui/core/BottomNavigationAction';
import colorCss from '@sinoui/core/utils/colorCss';

const BottomNavigationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 56px;
  ${({ theme }) =>
    colorCss('background-color', theme.palette.background.paper)};
  box-shadow: ${({ theme }) => theme.shadows[8]};
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
   * 指定背景颜色
   */
  color?: string;
}

/**
 * 底部导航栏
 *
 * @param {Props} props
 * @returns
 */
const BottomNavigation = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLInputElement>) => {
    const {
      showLabels = true,
      children,
      className,
      onChange,
      value,
      color,
      ...rest
    } = props;

    const child = React.Children.map(
      children as any,
      (item: React.ReactElement<BottomNavActionProps>, index: number) => {
        if (React.isValidElement(item)) {
          const selected =
            value === item.props.value || value === index.toString();
          const type = removeUndefinedProperties({
            showLabel: (showLabels === false && selected) || showLabels,
            value: item.props.value,
            onClick: (e: React.FormEvent<HTMLDivElement>) => {
              if (onChange) {
                onChange(e, item.props.value || index.toString());
              }
            },
            selected,
            color,
          });
          return React.cloneElement(item, type);
        }
        return item;
      },
    );

    return (
      <BottomNavigationWrapper
        className={classNames('sinoui-bottom-navigation', className)}
        {...rest}
        color={color}
        ref={ref}
      >
        {child}
      </BottomNavigationWrapper>
    );
  },
);

export default BottomNavigation;
