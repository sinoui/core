import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import SvgIcon from '@sinoui/core/SvgIcon';
import { MdEmail } from 'react-icons/md';
import Badge from '@sinoui/core/Badge';

/**
 * Badge组件 单元测试
 */

describe('Badge组件 单元测试', () => {
  afterEach(cleanup);

  it('设置为圆点形式', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Badge count={1} dot>
          <SvgIcon as={MdEmail} />
        </Badge>
      </ThemeProvider>,
    );

    const text = container.querySelector('.sinoui-badge');
    expect(text).toHaveClass('sinoui-badge--dot');
  });

  it('指定数字', () => {
    const { getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <Badge count={1}>
          <SvgIcon as={MdEmail} />
        </Badge>
      </ThemeProvider>,
    );

    expect(getByText('1')).toBeInTheDOM();
  });

  it('指定封顶数值', () => {
    const { getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <Badge count={100} overflowCount={99}>
          <SvgIcon as={MdEmail} />
        </Badge>
      </ThemeProvider>,
    );

    expect(getByText('99+')).toBeInTheDOM();
  });

  it('设置徽标的显示位置', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Badge count={8} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
          <SvgIcon as={MdEmail} />
        </Badge>
      </ThemeProvider>,
    );

    const text = container.querySelector('.sinoui-badge');
    expect(text?.firstChild).toHaveStyle('top:0;left:0');
  });
});

describe('Badge组件 快照测试', () => {
  it('基本使用', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Badge>
            <SvgIcon as={MdEmail} />
          </Badge>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('指定数字', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Badge count={8}>
            <SvgIcon as={MdEmail} />
          </Badge>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置数字为0时显示', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Badge count={0} showZero>
            <SvgIcon as={MdEmail} />
          </Badge>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('设置为圆点形式', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Badge count={1} dot>
            <SvgIcon as={MdEmail} />
          </Badge>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('设置鼠标悬浮时显示的文字', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Badge count={1} title="文字">
            <SvgIcon as={MdEmail} />
          </Badge>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('设置自定义badge的内容', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Badge count={1} badgeContent={4}>
            <SvgIcon as={MdEmail} />
          </Badge>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('指定封顶数值', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Badge count={99} overflowCount={99}>
            <SvgIcon as={MdEmail} />
          </Badge>
          <Badge count={100} overflowCount={99}>
            <SvgIcon as={MdEmail} />
          </Badge>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('设置徽标的显示位置', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Badge
            count={8}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <SvgIcon as={MdEmail} />
          </Badge>
          <Badge
            count={8}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <SvgIcon as={MdEmail} />
          </Badge>
          <Badge
            count={8}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <SvgIcon as={MdEmail} />
          </Badge>
          <Badge
            count={8}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <SvgIcon as={MdEmail} />
          </Badge>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('指定颜色', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Badge count={99} color="primary">
            <SvgIcon as={MdEmail} />
          </Badge>
          <Badge count={99} color="secondary">
            <SvgIcon as={MdEmail} />
          </Badge>
          <Badge count={99} color="warning">
            <SvgIcon as={MdEmail} />
          </Badge>
          <Badge count={99} color="success">
            <SvgIcon as={MdEmail} />
          </Badge>
          <Badge count={99} color="error">
            <SvgIcon as={MdEmail} />
          </Badge>
          <Badge count={99} color="info">
            <SvgIcon as={MdEmail} />
          </Badge>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
