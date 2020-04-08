import React from 'react';
import styled from 'styled-components';
import BaseButton from '@sinoui/core/BaseButton';
import Body2 from '@sinoui/core/Body2';
import { opacify } from 'polished';
import { Theme } from '@sinoui/theme';

const IconWrapper = styled.span`
  width: 24px;
  height: 24px;
  font-size: 24px;
  margin: 0 auto;
`;

const colorWrapper = (theme: Theme, color?: string, checked?: boolean) => {
  let newColor;
  if (checked && color) {
    newColor = theme.palette.common.white;
  } else if (checked) {
    newColor = theme.palette.primary.main;
  } else if (!checked && color) {
    newColor = opacify(-0.24, theme.palette.common.white);
  } else {
    newColor = theme.palette.text.secondary;
  }
  return newColor;
};

const BaseButtonWrapper = styled(BaseButton)<{
  color?: string;
  checked: boolean;
  showLabel?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  vertical-align: middle;
  color: ${({ theme, color, checked }) => colorWrapper(theme, color, checked)};
  transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  max-width: 168px;
  min-width: 80px;
  padding: ${({ showLabel }) => (showLabel ? '8px 12px 12px' : '16px 12px')};

  > .sinoui-typography--body2 {
    color: ${({ theme, color, checked }) =>
      colorWrapper(theme, color, checked)};
    transition: font-size 0.2s, opacity 0.2s;
  }

  &:foucs {
    color: opacify(-0.24, '#fff');
  }
`;

export interface BottomNavActionProps {
  /**
   * 标签
   */
  label?: string;
  /**
   * 图标
   */
  icon?: React.ReactNode;
  /**
   * 是否显示标签
   */
  showLabel?: boolean;
  /**
   * value值
   */
  value: string;
  /**
   * 是否选中
   */
  checked?: boolean;
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
function BottomNavigationAction(props: BottomNavActionProps) {
  const {
    label,
    showLabel = true,
    icon,
    color,
    checked = false,
    ...rest
  } = props;
  return (
    <BaseButtonWrapper
      color={color}
      checked={checked}
      showLabel={showLabel}
      {...rest}
    >
      <IconWrapper>{icon}</IconWrapper>
      {showLabel && <Body2 as="span">{label}</Body2>}
    </BaseButtonWrapper>
  );
}

export default BottomNavigationAction;
