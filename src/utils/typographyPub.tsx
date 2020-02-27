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
    name,
    ...rest
  } = props;
  return (
    <Text
      {...rest}
      ref={ref}
      as={as}
      className={classNames(`sinoui-typography-${name}`, className, {
        'sinoui-typography--gutterBottom':
          (name === 'h1' ||
            name === 'h2' ||
            name === 'h3' ||
            name === 'h4' ||
            name === 'h5' ||
            name === 'h6' ||
            name === 'subtitle1' ||
            name === 'subtitle2') &&
          gutterBottom,
        'sinoui-typography--paragraph':
          (name === 'body1' || name === 'body2') && paragraph,
      })}
      style={style}
      align={align}
      noWrap={noWrap}
      gutterBottom={
        (name === 'h1' ||
          name === 'h2' ||
          name === 'h3' ||
          name === 'h4' ||
          name === 'h5' ||
          name === 'h6' ||
          name === 'subtitle1' ||
          name === 'subtitle2') &&
        gutterBottom
      }
      paragraph={(name === 'body1' || name === 'body2') && paragraph}
      color={color}
      name={name}
    >
      {children}
    </Text>
  );
});

export function typographyPub(label: string, name: string) {
  return (Text: any) => {
    const wrapper: any = React.forwardRef((props, ref) => {
      return <Text as={label} name={name} ref={ref} {...props} />;
    });
    return wrapper;
  };
}
