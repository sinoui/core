import React from 'react';
import styled from 'styled-components';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';
import classNames from 'classnames';
import Typography from '@sinoui/core/Typography';

const LinkWrapper = styled(Typography).attrs(({ component }: Props) => ({
  as: component,
}))`
  text-decoration: none;
  color: ${(props) =>
    props.color
      ? getColorFromTheme(props.theme, props.color)
      : props.theme.palette.text.primary};
`;

interface Props {
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 添加自定义类名
   */
  className?: string;
  /**
   * 指定颜色
   */
  color?: string;
  /**
   * 指定根元素
   */
  component?: React.ReactType;
  /**
   * 指定href
   */
  href?: string;
}

const Link = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLInputElement>) => {
    const {
      className,
      children,
      color,
      component: Component = 'a',
      ...rest
    } = props;

    return (
      <LinkWrapper
        className={classNames('sinoui-link', className)}
        ref={ref}
        color={color}
        component={Component}
        {...rest}
      >
        {children}
      </LinkWrapper>
    );
  },
);

export default Link;
