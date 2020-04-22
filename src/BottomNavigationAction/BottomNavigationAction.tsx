import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
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

const colorWrapper = (theme: Theme, color?: string, selected?: boolean) => {
  let newColor;
  if (selected && color) {
    newColor = theme.palette.common.white;
  } else if (selected) {
    newColor = theme.palette.primary.main;
  } else if (!selected && color) {
    newColor = opacify(-0.24, theme.palette.common.white);
  } else {
    newColor = theme.palette.text.secondary;
  }
  return newColor;
};

const BaseButtonWrapper = styled(BaseButton)<{
  color?: string;
  selected?: boolean;
  showLabel?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  color: ${({ theme, color, selected }) =>
    colorWrapper(theme, color, selected)};
  max-width: 168px;
  min-width: 80px;
  padding: ${({ showLabel }) => (showLabel ? '8px 12px 12px' : '16px 12px')};
  transition: ${({
    theme: {
      transitions: { create, easing, duration },
    },
  }) =>
    create(['fill'], {
      duration: duration.shorter,
      easing: easing.easeInOut,
    })};

  > .sinoui-typography--body2 {
    color: currentColor;
    transition: font-size 0.2s, opacity 0.2s;
  }

  &:foucs {
    color: opacify(-0.24, '#fff');
  }
`;

const BodyWrapper = styled(Body2)`
  transition: opacity 200ms;
`;

export interface BottomNavActionProps {
  /**
   * 标签名称
   */
  label?: string;
  /**
   * 图标
   */
  icon: React.ReactNode;
  /**
   * 是否显示标签
   */
  showLabel?: boolean;
  /**
   * value值
   */
  value?: string;
  /**
   * 是否选中
   */
  selected?: boolean;
}

/**
 * 底部导航栏
 *
 * @param {Props} props
 * @returns
 */
function BottomNavigationAction(props: BottomNavActionProps) {
  const { label, showLabel, icon, selected, ...rest } = props;
  return (
    <BaseButtonWrapper
      selected={selected}
      showLabel={showLabel}
      {...rest}
      className={classNames('sinoui-bottom-navigation', {
        'sinoui-bottom-navigation--selected': selected,
      })}
    >
      <IconWrapper>{icon}</IconWrapper>
      {showLabel && <BodyWrapper as="span">{label}</BodyWrapper>}
    </BaseButtonWrapper>
  );
}

export default BottomNavigationAction;
