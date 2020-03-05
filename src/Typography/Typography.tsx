import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import getColorFromTheme from '../utils/getColorFromTheme';

/**
 * 文本对齐方式
 */
const textAlignWrapper = (props: Props) => {
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
const marginBottomWrapper = (props: Props) => {
  let bot;
  if (props.gutterBottom) {
    bot = '0.35em';
  } else if (props.paragraph) {
    bot = '1rem';
  }
  return bot;
};

/**
 * 不换行处理
 */
const noWrapStyle = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TypographyStyle = css<Props>`
  margin: 0;
  padding: 0;
  ${(props) => ({ ...props.theme.typography[props.type || 'body2'] })};
  text-align: ${(props) => textAlignWrapper(props)};
  margin-bottom: ${(props) => marginBottomWrapper(props)};
  color: ${({ theme, color }) => getColorFromTheme(theme, color) as string};
`;

/**
 * 文字排版组件
 */
export const TypographyWrapper = styled.div<Props>`
  ${TypographyStyle};
  ${(props) => props.noWrap && noWrapStyle};
`;

/**
 * 文字排版组件类型
 */
export interface Props {
  /**
   * 子元素
   */
  children: React.ReactNode;
  /**
   * 变更DOM元素
   */
  as?: React.ReactType;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 指定样式
   */
  style?: React.CSSProperties;
  /**
   * 文本对齐方式，默认左对齐
   */
  align?: 'center' | 'left' | 'right';
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
   * 指定颜色，primary secondary textPrimary textSecondary error warning success info
   */
  color?: string;
  /**
   * 文本样式类型
   */
  type?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline';
}

const asElementTypes: { [name: string]: React.ReactType } = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'p',
  overline: 'p',
};

const Typography = React.forwardRef<HTMLElement, Props>((props, ref) => {
  const {
    type = 'body2',
    as = asElementTypes[type],
    children,
    className,
    style,
    align,
    noWrap,
    gutterBottom,
    paragraph,
    color = 'textPrimary',
    ...rest
  } = props;

  const isGutterBottom =
    (type === 'h1' ||
      type === 'h2' ||
      type === 'h3' ||
      type === 'h4' ||
      type === 'h5' ||
      type === 'h6' ||
      type === 'subtitle1' ||
      type === 'subtitle2') &&
    gutterBottom;

  const isParagraph = (type === 'body1' || type === 'body2') && paragraph;

  return (
    <TypographyWrapper
      {...rest}
      ref={ref}
      as={as}
      className={classNames(
        'sinoui-typography',
        `sinoui-typography--${type}`,
        className,
        {
          'sinoui-typography--gutter-bottom': isGutterBottom,
          'sinoui-typography--paragraph': isParagraph,
        },
      )}
      style={style}
      align={align}
      noWrap={noWrap}
      gutterBottom={isGutterBottom}
      paragraph={isParagraph}
      color={color}
      type={type}
    >
      {children}
    </TypographyWrapper>
  );
});

export default Typography;
