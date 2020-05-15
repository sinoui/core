import React, { useContext } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import BaseButton from '@sinoui/core/BaseButton';
import Body2 from '@sinoui/core/Body2';
import { opacify } from 'polished';
import { Theme } from '@sinoui/theme';
import { MyContext } from '@sinoui/core/NavigationRail';

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
  align-items: center;
  color: ${({ theme, color, selected }) =>
    colorWrapper(theme, color, selected)};
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
   * 指定颜色
   */
  color?: string;
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
function NavigationRailAction(props: BottomNavActionProps) {
  const { label, icon, value, color, ...rest } = props;

  const { showLabels, selectedValue, onChange } = useContext(MyContext);

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
      onClick={(e) => onClick(e)}
      color={color}
      value={value}
      showLabel={showLabel}
    >
      <IconWrapper>{icon}</IconWrapper>
      {showLabel && <BodyWrapper as="span">{label}</BodyWrapper>}
    </BaseButtonWrapper>
  );
}

export default NavigationRailAction;
