import React from 'react';
import styled, { css } from 'styled-components';
import AppBarTitle from '@sinoui/core/AppBarTitle';
import AppBarActions from '@sinoui/core/AppBarActions';
import NavigationIcon from '@sinoui/core/NavigationIcon';

/**
 * AppBar 顶部应用栏容器
 */
export interface Props {
  /**
   * 突出模式
   */
  prominent?: boolean;
  /**
   * 密集模式
   */
  dense?: boolean;
  /**
   * 固定模式
   */
  fixed?: boolean;
  /**
   * 收缩模式
   */
  short?: boolean;
  /**
   * 一直收缩的模式
   */
  shortCollapsed?: boolean;
}

/**
 * 常规 appBar
 */
const regularCss = css`
  height: 64px;
  padding: 8px 12px;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 599px) {
    height: 56px;
    padding: 4px;
  }
`;

/**
 * 突出 appBar
 */
const prominentCss = css`
  height: 128px;
  align-items: flex-start;
  padding: 8px 12px;
  box-sizing: border-box;

  & ${AppBarTitle} {
    align-self: flex-end;
    padding-bottom: 2px;
  }

  @media (max-width: 599px) {
    padding: 4px;
    & ${AppBarTitle} {
      padding-bottom: 6px;
    }
  }
`;

/**
 * dense 紧凑appbar
 */
const denseCss = css<Props>`
  height: ${({ prominent }) => (prominent ? '96px' : '48px')};
  padding: 0 ${({ prominent }) => (prominent ? '12px' : '4px')};

  & ${AppBarTitle} {
    padding-bottom: ${({ prominent }) => (prominent ? '9px' : 0)};
  }
`;

/**
 * 收缩状态的appbar
 */

const shortCss = css`
  width: 112px;
  height: 56px;
  padding: 4px;
  border-radius: 0 0 24px 0;
  & ${AppBarTitle} {
    display: none;
  }

  & ${NavigationIcon} {
    margin-right: 0;
  }

  & ${AppBarActions} {
    margin-left: 0;
    & > *:not(:last-child) {
      display: none;
    }
  }
`;

/**
 * fixed 为true 固定样式
 */
const fixedCss = css`
  position: fixed;
`;

const StyledAppBar = styled.div.attrs(() => ({
  className: 'sinoui-app-bar',
}))<Props>`
  position: relative;
  display: flex;
  width: 100%;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  box-shadow: ${({ theme }) => theme.shadows[4]};
  background-color: ${({ theme }) => theme.palette.primary.main};
  ${({ prominent }) => (prominent ? prominentCss : regularCss)}
  ${({ dense }) => dense && denseCss}
  ${({ fixed }) => fixed && fixedCss}
  ${({ short }) => short && shortCss}
  & > ${AppBarTitle} {
    display: flex;
    flex: 1;
    margin-left: 20px;
  }
  
`;

const AppBar = React.forwardRef<
  HTMLDivElement,
  Props & {
    /**
     * 应用栏左侧图标
     */
    navigationIcon?: React.ReactNode;
    /**
     * 应用栏标题
     */
    title: React.ReactNode;
    /**
     * 应用栏可操作元素
     */
    actionItems?: React.ReactNode;
  }
>((props, ref) => {
  const { navigationIcon, title, actionItems, ...rest } = props;
  return (
    <StyledAppBar ref={ref} {...rest}>
      <NavigationIcon>{navigationIcon}</NavigationIcon>
      <AppBarTitle>{title}</AppBarTitle>
      <AppBarActions>{actionItems}</AppBarActions>
    </StyledAppBar>
  );
});

export default AppBar;
