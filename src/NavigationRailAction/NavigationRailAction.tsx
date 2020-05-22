import React, { useContext } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import BaseButton from '@sinoui/core/BaseButton';
import Body2 from '@sinoui/core/Body2';
import { Theme } from '@sinoui/theme';
import { NavigationRailContext } from '@sinoui/core/NavigationRail';

const IconWrapper = styled.span`
  width: 24px;
  height: 24px;
  font-size: 24px;
  margin: 0 auto;
`;

const colorWrapper = (theme: Theme, selected?: boolean) => {
  let newColor;
  if (selected) {
    newColor = theme.palette.primary.main;
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
  align-items: center;
  color: ${({ theme, selected }) => colorWrapper(theme, selected)};
  padding: ${({ showLabel }) => (showLabel ? '14px 0px 16px' : '24px 0px')};
  width: 100%;
  min-height: 72px;
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

export interface NavigationRailActionProps {
  /**
   * 标签名称
   */
  label?: string;
  /**
   * 图标
   */
  icon: React.ReactNode;
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
 * 垂直导航栏
 *
 * @param {Props} props
 * @returns
 */
function NavigationRailAction(props: NavigationRailActionProps) {
  const { label, icon, value, ...rest } = props;

  const { showLabels, selectedValue, onChange } = useContext(
    NavigationRailContext,
  );

  const onClick = (e: any) => {
    if (onChange && value) {
      onChange(e, value);
    }
  };

  const showLabel =
    (showLabels === false && value === selectedValue) || showLabels;

  return (
    <BaseButtonWrapper
      selected={value === selectedValue}
      {...rest}
      className={classNames('sinoui-navigation-rail', {
        'sinoui-navigation-rail--selected': value === selectedValue,
      })}
      onClick={onClick}
      value={value}
      showLabel={showLabel}
    >
      <IconWrapper>{icon}</IconWrapper>
      {showLabel && <BodyWrapper as="span">{label}</BodyWrapper>}
    </BaseButtonWrapper>
  );
}

export default NavigationRailAction;
