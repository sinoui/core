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
}
/**
 * 常规 appBar
 */
const regularCss = css`
  height: 56px;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
`;

/**
 * 突出 appBar
 */
const prominentCss = css`
  height: 128px;
  align-items: flex-start;
  padding: 16px;
  box-sizing: border-box;

  & ${AppBarTitle} {
    align-self: flex-end;
  }
`;

/**
 * dense 紧凑appbar
 */
const denseCss = css<Props>`
  height: ${({ prominent }) => (prominent ? '116px' : '48px')};
  padding: 0 4px;

  & ${AppBarTitle} {
    padding-bottom: ${({ prominent }) => (prominent ? '8px' : 0)};
  }
`;

/**
 * 收缩状态的appbar
 */

const shortCss = css`
  width: 124px;
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

const StyledAppBar = styled.div<Props>`
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
  > ${AppBarTitle} {
    flex: 1;
   
  }
  
`;
export default StyledAppBar;
