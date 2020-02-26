import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Text, TextProps } from '../utils/typographyObj';

export interface Props extends TextProps {
  /**
   * 文本样式类型
   */
  type?:
    | 'dispay4'
    | 'display3'
    | 'display2'
    | 'display1'
    | 'subheading'
    | 'title'
    | 'headline'
    | 'body2'
    | 'body1'
    | 'caption'
    | 'button';
}

const TextWrapper = styled(Text).attrs((props: Props) => ({
  type: props.type,
}))``;

const Typography = React.forwardRef((props: Props, ref) => {
  const {
    as = 'div',
    type = 'body2',
    children,
    className,
    style,
    align,
    noWrap,
    color = 'textPrimary',
    ...rest
  } = props;
  return (
    <TextWrapper
      {...rest}
      type={type}
      ref={ref}
      as={as}
      className={classNames('sinoui-typography', className)}
      style={style}
      align={align}
      noWrap={noWrap}
      color={color}
      data-testid="typography"
    >
      {children}
    </TextWrapper>
  );
});

export default Typography;
