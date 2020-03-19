import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import colorCss from '@sinoui/core/utils/colorCss';

export interface BadgeProps {
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 添加自定义类名
   */
  className?: string;
  /**
   * 指定颜色
   */
  color?: string;
  /**
   * 设置为圆点形式
   */
  dot?: boolean;
  /**
   * 	指定数字
   */
  count?: number;
  /**
   * 	指定封顶数值
   */
  overflowCount?: number;
  /**
   * 	设置数字为0时显示
   */
  showZero?: boolean;
  /**
   * 	设置自定义badge的内容
   */
  badgeContent?: React.ReactNode;
  /**
   * 	设置鼠标悬浮时显示的文字
   */
  title?: string;
  /**
   * 	设置徽标的显示位置
   */
  anchorOrigin?: { horizontal: 'left' | 'right'; vertical: 'bottom' | 'top' };
}

const BadgeWrapper = styled.span`
  display: inline-flex;
  position: relative;
  flex-shrink: 0;
  vertical-align: middle;
`;

const dotCss = css`
  min-width: 8px;
  height: 8px;
`;

const overflowCountCss = css`
  border-radius: 10px;
  padding: 0px 6px;
`;

const anchorOriginCss = css<BadgeProps>`
  ${(props) => props.anchorOrigin && `${props.anchorOrigin.vertical}: 0`};
  ${(props) => props.anchorOrigin && `${props.anchorOrigin.horizontal}: 0`};
  ${(props) =>
    props.anchorOrigin &&
    `transform: scale(1) translate(${
      props.anchorOrigin.horizontal === 'right' ? '50%' : '-50%'
    }, ${props.anchorOrigin.vertical === 'top' ? '-50%' : '50%'})`};
  ${(props) =>
    props.anchorOrigin &&
    `transform-origin: ${
      props.anchorOrigin.horizontal === 'right' ? '100%' : '0%'
    } ${props.anchorOrigin.vertical === 'top' ? '0%' : '100%'}`}
`;

const BadgeCircle = styled.span<BadgeProps>`
  position: absolute;
  ${anchorOriginCss};
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
  ${colorCss('background-color')};
  color: #fff;
  font-size: ${(props) => props.theme.typography.caption};
  display: flex;
  justify-content: center;
  text-align: center;
  ${(props) => props.dot && dotCss};
  ${(props) => props.overflowCount && overflowCountCss};
`;

/**
 * 徽章 组件
 *
 * @param {BadgeProps} props
 * @returns
 */
function Badge(props: BadgeProps) {
  const {
    children,
    className,
    dot,
    count = 0,
    color = 'primary',
    showZero,
    title,
    badgeContent,
    overflowCount,
    anchorOrigin = { vertical: 'top', horizontal: 'right' },
    ...rest
  } = props;

  const content = badgeContent || count;
  const num =
    overflowCount && content > overflowCount ? `${overflowCount}+` : content;
  return (
    <BadgeWrapper
      className={classNames('sinoui-badge', className, {
        'sinoui-badge--dot': dot,
      })}
      data-testid="badge"
    >
      {(count > 0 || showZero) && (
        <BadgeCircle
          color={color}
          dot={dot}
          title={title}
          overflowCount={overflowCount}
          anchorOrigin={anchorOrigin}
          {...rest}
        >
          {!dot ? num : null}
        </BadgeCircle>
      )}
      {children}
    </BadgeWrapper>
  );
}

export default Badge;
