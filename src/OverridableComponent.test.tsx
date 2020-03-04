import React from 'react';
import OverridableComponent, { OverrideProps } from './OverridableComponent';

/*
 * 注意：本测试是用来验证 OverridableComponent 类型是否正确。如果出现 ts 错误，则表示测试未通过。
 */

describe('测试 as 属性', () => {
  interface DefaultProps {
    /**
     * 测试字段
     */
    x: boolean;
  }

  interface BarProps {
    /**
     * 测试字段2
     */
    y: boolean;
    /**
     * 指定根元素
     */
    as?: React.ReactType;
  }

  type DefaultComp = React.SFC<DefaultProps>;

  const Bar: OverridableComponent<BarProps, DefaultComp> = (
    _props: BarProps,
  ) => {
    return <div>123</div>;
  };

  it('不指定 as 属性，则使用默认的组件类型', () => {
    const bar = <Bar x y={false} />;
    console.log(bar);
  });

  it('指定 as 属性时，同时可指定 as 组件的属性', () => {
    interface CustomProps {
      /**
       * 测试字段3
       */
      z: boolean;
    }

    const Custom = (_props: CustomProps) => <div>123</div>;

    const bar = <Bar as={Custom} y z />;
    console.log(bar);
  });
});

describe('测试属性声明覆盖', () => {
  it('组件属性中声明 className', () => {
    interface Props {
      /**
       * 在组件中声明的className
       */
      className?: string;
    }
    const Foo: OverridableComponent<Props, 'button'> = (_props: Props) => {
      return <div>123</div>;
    };

    const foo = <Foo className="foo" />;
    const asFoo = <Foo as="a" className="link" />;

    console.log(foo, asFoo);
  });

  it('组件属性中声明 style', () => {
    interface Props {
      /**
       * 在组件中声明的style
       */
      style?: React.CSSProperties;
    }
    const Foo: OverridableComponent<Props, 'button'> = (_props: Props) => {
      return <div>123</div>;
    };

    const foo = (
      <Foo
        style={{
          background: 'red',
        }}
      />
    );
    const asFoo = (
      <Foo
        as="a"
        style={{
          background: 'red',
        }}
      />
    );

    console.log(foo, asFoo);
  });
  it('children 属性', () => {
    interface Props {
      children: string;
    }
    const Foo: OverridableComponent<Props, 'button'> = (_props: Props) => {
      return <div>123</div>;
    };

    const foo = <Foo>123</Foo>;
    const asFoo = <Foo as="a">123</Foo>;
    console.log(foo, asFoo);
  });
});

it('扩展组件类型', () => {
  interface Props {
    href?: string;
  }
  type FooType = ((
    props: { href: string } & OverrideProps<Props, 'a'>,
  ) => JSX.Element) &
    OverridableComponent<Props, 'button'>;

  const Foo: FooType = (_props: Props) => {
    return <div>123</div>;
  };

  const hrefFoo = <Foo href="123" target="_blank" />;
  const foo = <Foo />;
  const asFoo = <Foo as="a" href="123" target="_blank" />;
  const linkFoo = <Foo as="a" />;
  const asAnotherFoo = <Foo as="div" id="123" />;
  console.log(hrefFoo, foo, asFoo, linkFoo, asAnotherFoo);
});
