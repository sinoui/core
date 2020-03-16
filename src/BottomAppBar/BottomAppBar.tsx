import React from 'react';
import styled, { css } from 'styled-components';
import AppBarActions from '@sinoui/core/AppBarActions';
import NavigationIcon from '@sinoui/core/NavigationIcon';
import InSetCircle from './InSetCircle';

/**
 * 底部应用栏容器
 */
export interface Props {
  /**
   * 浮动操作按钮为居中且嵌入显示
   */
  insertFab?: boolean;
  /**
   * 浮动操作按钮为居右显示 可操作区域要放在左侧显示。
   */
  endFab?: boolean;
  style?: React.CSSProperties;
}

const endFabCss = css<Props>`
  && ${AppBarActions} {
    justify-content: ${(props) => props.endFab && 'flex-start'};
  }

  && > .sinoui-bottom-app-bar--fab {
    right: 16px;
  }
`;

/**
 * 非嵌入模式底部应用 容器
 */
const StyledBottomAppBar = styled.div<Props>`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  height: 56px;
  width: 100%;
  align-items: center;
  padding: 4px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  box-shadow: ${({ theme }) => theme.shadows[8]};
  background-color: ${(props) => props.theme.palette.primary.dark};
  ${(props) => props.endFab && endFabCss}

  & ${AppBarActions} {
    flex: 1;
    justify-content: flex-end;
  }

  & > .sinoui-bottom-app-bar--fab {
    position: absolute;
    right: calc(50% - 28px);
    top: -50%;
  }
`;

/**
 * 嵌入模式底部应用 容器
 */

const InsetBottomAppBar = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  height: 56px;
  padding: 4px;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  box-shadow: ${({ theme }) => theme.shadows[8]};
  background-color: transparent;

  & ${AppBarActions} {
    flex: 1;
    justify-content: flex-end;
    z-index: 1;
  }

  & ${NavigationIcon} {
    z-index: 1;
  }

  & > .sinoui-bottom-app-bar--fab {
    position: absolute;
    right: calc(50% - 28px);
    top: -50%;
  }
`;

const InsetBottomAppBarLayer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 56px;
  top: 0;
  left: 0;
  .sinoui-bottom-app-bar--layer {
    flex: 1;
    height: 100%;
    background-color: ${(props) => props.theme.palette.primary.main};
  }
`;

const BottomAppBar = React.forwardRef<
  HTMLDivElement,
  Props & {
    /**
     * 应用栏左侧图标
     */
    navigationIcon: React.ReactNode;
    /**
     * 浮动操作按钮
     */
    fab?: React.ReactNode;
    /**
     * 应用栏可操作元素
     */
    actionItems?: React.ReactNode;
  }
>((props, ref) => {
  const { navigationIcon, actionItems, fab, insertFab, style, ...rest } = props;
  return !insertFab ? (
    <StyledBottomAppBar ref={ref} style={style} {...rest}>
      <NavigationIcon>{navigationIcon}</NavigationIcon>
      <div className="sinoui-bottom-app-bar--fab">{fab}</div>
      <AppBarActions>{actionItems}</AppBarActions>
    </StyledBottomAppBar>
  ) : (
    <InsetBottomAppBar style={style}>
      <NavigationIcon>{navigationIcon}</NavigationIcon>
      <div className="sinoui-bottom-app-bar--fab">{fab}</div>
      <AppBarActions>{actionItems}</AppBarActions>
      <InsetBottomAppBarLayer>
        <div className="sinoui-bottom-app-bar--layer" />
        <InSetCircle />
        <div className="sinoui-bottom-app-bar--layer" />
      </InsetBottomAppBarLayer>
    </InsetBottomAppBar>
  );
});

export default BottomAppBar;
