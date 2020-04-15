import styled, { css } from 'styled-components';
import classNames from 'classnames';
import { transitions } from '@sinoui/theme';

export interface PaperProps {
  /**
   * 阴影高度
   */
  elevation?: number;
  /**
   * 是否显示圆角
   */
  square?: boolean;
  /**
   * 添加自定义类名
   */
  className?: string;
  /**
   * 轮廓模式
   */
  outlined?: boolean;
}

const normalCss = css<{ elevation?: number }>`
  box-shadow: ${({ theme, elevation = 1 }) => theme.shadows[elevation]};
`;

const outlinedCss = css`
  border: 1px solid ${({ theme }) => theme.palette.divider};
`;

const roundCss = css`
  border-radius: 4px;
`;

/**
 * 纸张
 */
const Paper = styled.div.attrs({
  className: classNames('sinoui-paper'),
})<PaperProps>`
  box-sizing: border-box;
  ${({ square }) => !square && roundCss};
  background-color: ${({ theme }) => theme.palette.background.paper};
  ${({ outlined }) => (outlined ? outlinedCss : normalCss)};
  transition: ${({
    theme: {
      transitions: { create, easing, duration },
    },
  }) =>
    create(['box-shadow'], {
      duration: duration.shorter,
      easing: easing.easeInOut,
    })};
`;

export default Paper;
