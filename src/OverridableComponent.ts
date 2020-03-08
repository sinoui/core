import { ElementType, ComponentPropsWithRef, CSSProperties } from 'react';

/**
 * 可以设置替换根组件的组件
 */
export default interface OverridableComponent<
  Props,
  DefaultComponent extends ElementType
> {
  <C extends ElementType>(
    props: { as: C } & OverrideProps<Props, C>,
  ): JSX.Element | null;

  (props: OverrideProps<Props, DefaultComponent>): JSX.Element | null;
}

/**
 * 替换组件属性类型
 *
 * 特别注意：需要将 className 和 style 从 ComponentPropsWithRef<C> 中剔除，然后再补充上，才能让类型生效。
 */
export type OverrideProps<Props, C extends ElementType> = Omit<Props, 'as'> &
  Omit<ComponentPropsWithRef<C>, 'className' | 'style'> & {
    className?: string;
    style?: CSSProperties;
  };
