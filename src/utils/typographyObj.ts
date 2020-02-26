import styled from 'styled-components';
import { getColorFromTheme } from './color';

/**
 * 文本对齐方式
 */
const textAlignWrapper = (props: TextProps) => {
  let hand;
  if (props.align === 'right') {
    hand = 'right';
  } else if (props.align === 'center') {
    hand = 'center';
  } else {
    hand = 'left';
  }
  return hand;
};

/**
 * 下边距
 */
const marginBottomWrapper = (props: TextProps) => {
  let bot;
  if (props.gutterBottom) {
    bot = '0.35rem';
  } else if (props.paragraph) {
    bot = '1rem';
  }
  return bot;
};

/**
 * 文字排版组件
 */
export const Text = styled.div.attrs((props: TextProps) => ({
  as: props.as || 'div',
}))<TextProps>((props) => ({
  ...props.theme.typography[props.as],
  textAlign: textAlignWrapper(props),
  whiteSpace: props.noWrap && 'nowrap',
  marginBottom: marginBottomWrapper(props),
  color: getColorFromTheme(props, props.theme.palette.text.primary),
}));

/**
 * 文字排版组件类型
 */
export interface TextProps {
  /**
   * 子元素
   */
  children: React.ReactNode;
  /**
   * 变更DOM元素
   */
  as?: any;
  /**
   * 指定额外的样式。
   */
  className?: string;
  /**
   * 指定样式
   */
  style?: React.CSSProperties;
  /**
   * 文本对齐方式，默认左对齐
   */
  align?: string;
  /**
   * 是否换行
   */
  noWrap?: boolean;
  /**
   * 是否在底部添加间隙，H1~H6、Subtitle1、Subtitle2
   */
  gutterBottom?: boolean;
  /**
   * 是否为段落，Body1、Body2
   */
  paragraph?: boolean;
  /**
   * 颜色，primary secondary textPrimary textSecondary error warning success info
   */
  color?: string;
  /**
   * 引用元素
   */
  ref?: React.RefObject<HTMLInputElement>;
  /**
   * 命名className
   */
  type?: string;
}
