import styled, { css } from 'styled-components';
import classNames from 'classnames';

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

/**
 * 纸张
 */
const Paper = styled.div.attrs({
  className: classNames('sinoui-paper'),
})<PaperProps>`
  box-sizing: border-box;
  ${(props) => !props.square && 'border-radius:4px'};
  background-color: ${({ theme }) => theme.palette.background.paper};
  ${({ outlined }) => (outlined ? outlinedCss : normalCss)};
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

export default Paper;
