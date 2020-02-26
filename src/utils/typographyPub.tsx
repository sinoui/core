import React from 'react';
import classNames from 'classnames';
import { Text, TextProps } from './typographyObj';

export const TextContent = React.forwardRef((props: TextProps, ref) => {
  const {
    as = 'h1',
    children,
    className,
    style,
    align,
    noWrap,
    gutterBottom,
    paragraph,
    color = 'textPrimary',
    type,
    ...rest
  } = props;
  return (
    <Text
      {...rest}
      ref={ref}
      as={as}
      className={classNames(`sinoui-typography-${type}`, className, {
        'sinoui-typography--gutterBottom':
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
      })}
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
    >
      {children}
    </Text>
  );
});

export function typographyPub(label: string, type: string) {
  return (Text: any) => {
    const wrapper = ({ ...props }) => {
      return <Text as={label} type={type} ref={props.ref} {...props} />;
    };
    return wrapper;
  };
}
