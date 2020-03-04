import React from 'react';
import styled, { css } from 'styled-components';
import AppBarActions from '@sinoui/core/AppBarActions';
import Fab from '../../stories/appBarDemos/Fab';
import Circle from './Circle';

export interface Props {
  /**
   * 浮动操作按钮为居中且嵌入显示
   */
  insertFab?: boolean;
  /**
   * 浮动操作按钮为居右显示 可操作区域要放在左侧显示。
   */
  endFab?: boolean;
}

const endFabCss = css<Props>`
  & ${AppBarActions} {
    justify-content: ${(props) => props.endFab && 'flex-start'};
  }

  & ${Fab} {
    right: 16px;
  }
`;

const StyledAppBar = styled.div<Props>`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  height: 56px;
  width: 100%;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  box-shadow: ${({ theme }) => theme.shadows[8]};
  background-color: ${({ theme }) => theme.palette.primary.main};

  & ${AppBarActions} {
    flex: 1;
    justify-content: flex-end;
  }

  ${(props) => props.endFab && endFabCss}
`;

const InsetBottomAppBar = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  height: 56px;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  box-shadow: ${({ theme }) => theme.shadows[8]};
  background-color: transparent;

  .sino-bottom-left-bar {
    flex: 1;
    height: 100%;
    background: ${(props) => props.theme.palette.primary.main};
  }
  .sino-bottom-right-bar {
    flex: 1;
    height: 100%;
    background: ${(props) => props.theme.palette.primary.main};
  }

  .sino-bottom-cut {
    width: 72px;
    height: 72px;
    border-radius: 36px;
  }
`;
const BottomAppBar = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { insertFab, children } = props;
  console.log(children);
  return !insertFab ? (
    <StyledAppBar ref={ref} {...props} />
  ) : (
    <InsetBottomAppBar>
      <div className="sino-bottom-left-bar">left</div>
      <Circle />
      <div className="sino-bottom-right-bar">right</div>
    </InsetBottomAppBar>
  );
});

export default BottomAppBar;
