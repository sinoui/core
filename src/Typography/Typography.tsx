import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { getColorFromTheme } from '../utils/color';

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
 * 文字排版组件
 */
export const TypographyWrapper = styled.div.attrs((props: Props) => ({
  as: props.as || 'p',
}))<Props>((props) => ({
  margin: 0,
  padding: 0,
  ...props.theme.typography[props.type || 'body2'],
  textAlign: textAlignWrapper(props),
  whiteSpace: props.noWrap && 'nowrap',
  overflow: props.noWrap && 'hidden',
  textOverflow: props.noWrap && 'ellipsis',
  marginBottom: marginBottomWrapper(props),
  color: getColorFromTheme(props, props.theme.palette.text.primary),
}));

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
  as?: any;
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
   * 指定颜色，primary secondary textPrimary textSecondary error warning success info
   */
  color?: string;
  /**
   * 引用元素
   */
  ref?: React.RefObject<HTMLInputElement>;
  /**
   * 文本样式类型
   */
  type?: string;
}

const asElementTypes = {
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

const Typography = React.forwardRef((props: Props, ref) => {
  const {
    type = 'body2',
    as = asElementTypes[props.type],
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
          'sinoui-typography--gutter-bottom':
            (type === 'h1' ||
              type === 'h2' ||
              type === 'h3' ||
              type === 'h4' ||
              type === 'h5' ||
              type === 'h6' ||
              type === 'subtitle1' ||
              type === 'subtitle2') &&
            gutterBottom,
          'sinoui-typography--paragraph':
            (type === 'body1' || type === 'body2') && paragraph,
        },
      )}
      style={style}
      align={align}
      noWrap={noWrap}
      gutterBottom={
        (type === 'h1' ||
          type === 'h2' ||
          type === 'h3' ||
          type === 'h4' ||
          type === 'h5' ||
          type === 'h6' ||
          type === 'subtitle1' ||
          type === 'subtitle2') &&
        gutterBottom
      }
      paragraph={(type === 'body1' || type === 'body2') && paragraph}
      color={color}
      type={type}
    >
      {children}
    </TypographyWrapper>
  );
});

export default Typography;
