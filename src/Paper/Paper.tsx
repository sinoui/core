import styled from 'styled-components';
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
   * 是否全屏显示
   */
  fullWidth?: boolean;
  /**
   * 添加自定义类名
   */
  className?: string;
}

/**
 * 纸张
 */
const Paper = styled.div.attrs(({ className }) => ({
  className: classNames('sinoui-paper', className),
}))<PaperProps>`
  padding: 0;
  box-sizing: border-box;
  display: ${(props) => (props.fullWidth ? 'block' : 'inline-block')};
  box-shadow: ${({ theme, elevation }) => theme.shadows[elevation || 2]};
  border-radius: ${(props) => (props.square ? '0px' : '2px')};
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

export default Paper;
