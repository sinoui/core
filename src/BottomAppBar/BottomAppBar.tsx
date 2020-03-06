import React from 'react';
import styled, { css } from 'styled-components';
import AppBarActions from '@sinoui/core/AppBarActions';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';
import NavigationIcon from '@sinoui/core/NavigationIcon';
import Fab from '../../stories/appBarDemos/Fab';
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

  & ${Fab} {
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
  ${(props) => props.endFab && endFabCss}

  & ${AppBarActions} {
    flex: 1;
    justify-content: flex-end;
  }

  background-color: ${({ color = 'primary', theme }: Props) =>
    getColorFromTheme(theme, color)};
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
    background-color: ${({ color = 'primary', theme }) =>
      getColorFromTheme(theme, color)};
  }
`;

const BottomAppBar = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { insertFab, children, style } = props;
  return !insertFab ? (
    <StyledBottomAppBar ref={ref} {...props} />
  ) : (
    <InsetBottomAppBar style={style}>
      {children}
      <InsetBottomAppBarLayer>
        <div className="sinoui-bottom-app-bar--layer" />
        <InSetCircle />
        <div className="sinoui-bottom-app-bar--layer" />
      </InsetBottomAppBarLayer>
    </InsetBottomAppBar>
  );
});

export default BottomAppBar;
