import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import AppBarTitle from '@sinoui/core/AppBarTitle';
import AppBarActions from '@sinoui/core/AppBarActions';
import NavigationIcon from '@sinoui/core/NavigationIcon';
import createFoundation from './utils/createFoundation';
import useMultiRefs from '../utils/useMultiRefs';
import isRefObject from '../utils/isRefObject';
import { AppBarProps, AppBarStatusTypes } from './types';
/**
 * AppBar 顶部应用栏容器
 */

/**
 * 常规 appBar
 */
const regularCss = css<AppBarStatusTypes>`
  height: 64px;
  padding: 8px 12px;
  align-items: center;
  box-sizing: border-box;

  & + * {
    padding-top: ${({ fixed }) => fixed && '64px'};
  }

  @media (max-width: 599px) {
    height: 56px;
    padding: 4px;

    & + * {
      padding-top: ${({ fixed }) => fixed && '56px'};
    }
  }
`;

/**
 * 突出 appBar
 */
const prominentCss = css<AppBarStatusTypes>`
  height: 128px;
  align-items: flex-start;
  padding: 8px 12px;
  box-sizing: border-box;

  & + * {
    padding-top: ${({ fixed }) => fixed && '128px'};
  }

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
const denseCss = css<AppBarStatusTypes>`
  height: ${({ prominent }) => (prominent ? '96px' : '48px')};
  padding: 0 ${({ prominent }) => (prominent ? '12px' : '4px')};

  & ${AppBarTitle} {
    padding-bottom: ${({ prominent }) => (prominent ? '9px' : 0)};
  }

  & + * {
    padding-top: ${({ prominent, fixed }) =>
      fixed && (prominent ? '96px' : '48px')};
  }
`;

/** *
 * 可收缩状态appbar
 */

const shortCss = css`
  height: 56px;
  padding: 4px;
`;
/**
 * 收缩状态的appbar
 */

const shortCollapsedCss = css`
  position: fixed;
  top: 0;
  width: 112px;
  height: 56px;
  padding: 4px;
  border-radius: 0 0 24px 0;

  & + * {
    padding-top: 56px;
  }

  && ${AppBarTitle} {
    display: none;
  }

  && ${NavigationIcon} {
    margin-right: 0;
  }

  && ${AppBarActions} {
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
  top: 0;
`;

const StyledAppBar = styled.div.attrs(() => ({
  className: 'sinoui-app-bar',
}))<AppBarStatusTypes>`
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
  ${({ shortCollapsed }) => shortCollapsed && shortCollapsedCss}
  transition: width .25s cubic-bezier(.4,0,.2,1), height .25s cubic-bezier(.4,0,.2,1);
  &  ${AppBarTitle} {
    display: flex;
    flex: 1;
    margin-left: 20px;
  }

  &.sinoui-top-app-bar--fixed-scrolled {
    box-shadow: ${({ theme }) => theme.shadows[8]};
  }

  &.sinoui-top-app-bar--short-scrolled {
    ${shortCollapsedCss}
  }

  &.sinoui-top-app-bar--prominent-scrolled {
    ${regularCss}
  
   & > ${AppBarTitle} {
    align-self: center;
    }
  }
`;

const AppBar = React.forwardRef<HTMLDivElement, AppBarProps>((props, ref) => {
  const { navigationIcon, title, actionItems, targetScroll, ...rest } = props;
  const { fixed, short, prominent, shortCollapsed } = rest;
  const topAppBarRef = useRef<HTMLDivElement>(null);
  const containerRef = useMultiRefs(topAppBarRef, ref);
  useEffect(() => {
    const foundation = createFoundation(
      {
        fixed,
        short,
        prominent,
        shortCollapsed,
      },
      isRefObject(targetScroll) && targetScroll.current
        ? targetScroll.current
        : window,
      topAppBarRef.current as HTMLDivElement,
    );

    return () => foundation && foundation.destory();
  }, [fixed, short, prominent, targetScroll, shortCollapsed]);

  return (
    <StyledAppBar ref={containerRef} {...rest}>
      <NavigationIcon>{navigationIcon}</NavigationIcon>
      <AppBarTitle>{title}</AppBarTitle>
      <AppBarActions>{actionItems}</AppBarActions>
    </StyledAppBar>
  );
});

export default AppBar;