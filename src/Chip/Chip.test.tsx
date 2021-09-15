/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import Chip from './Chip';
import Cancel from '../svg-icons/Cancel';
import Avatar from '../Avatar';
import SvgIcon from '../SvgIcon';

describe('镜像测试', () => {
  it('基本渲染', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <>
            <Chip label="文本" />
            <Chip label="文本" variant="outlined" />
          </>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('带删除图标', () => {
    const onDelete = jest.fn();
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <>
            <Chip label="文本" onDelete={onDelete} />
            <Chip label="文本" variant="outlined" onDelete={onDelete} />
          </>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('不可用', () => {
    const onDelete = jest.fn();
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <>
            <Chip label="文本" onDelete={onDelete} disabled />
            <Chip
              label="文本"
              variant="outlined"
              onDelete={onDelete}
              disabled
            />
          </>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('可点击的标签', () => {
    const onDelete = jest.fn();
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <>
            <Chip label="文本" clickable />
            <Chip label="文本" clickable variant="outlined" />
            <Chip label="文本" onDelete={onDelete} clickable />
            <Chip
              label="文本"
              variant="outlined"
              onDelete={onDelete}
              clickable
            />
          </>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('密集模式', () => {
    const onDelete = jest.fn();
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <>
            <Chip label="文本" dense />
            <Chip label="文本" dense variant="outlined" />
            <Chip label="文本" onDelete={onDelete} dense />
          </>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('自定义颜色', () => {
    const onDelete = jest.fn();
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <>
            <div>
              <Chip label="Default" />
              <Chip color="primary" label="Primary" />
              <Chip color="secondary" label="Secondary" />
              <Chip color="success" label="Success" />
              <Chip color="warning" label="Warning" />
              <Chip color="info" label="Info" />
              <Chip color="error" label="Error" />
              <Chip disabled label="Disabled" />
              <Chip color="primary" label="Primary" onDelete={onDelete} />
              <Chip
                disabled
                label="Disabled"
                color="primary"
                onDelete={onDelete}
              />
            </div>
            <div>
              <Chip label="Default" variant="outlined" />
              <Chip color="primary" label="Primary" variant="outlined" />
              <Chip color="secondary" label="Secondary" variant="outlined" />
              <Chip color="success" label="Success" variant="outlined" />
              <Chip color="warning" label="Warning" variant="outlined" />
              <Chip color="info" label="Info" variant="outlined" />
              <Chip color="error" label="Error" variant="outlined" />
              <Chip disabled label="Disabled" variant="outlined" />
              <Chip
                color="primary"
                label="Primary"
                variant="outlined"
                onDelete={onDelete}
              />
              <Chip
                disabled
                label="Disabled"
                color="primary"
                variant="outlined"
                onDelete={onDelete}
              />
            </div>
          </>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('前缀图标', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <>
            <Chip label="文本" icon={<Cancel />} />
            <Chip label="文本" variant="outlined" icon={<Cancel />} />
            <Chip label="文本" icon={<Cancel />} color="primary" />
            <Chip
              label="文本"
              variant="outlined"
              icon={<Cancel />}
              color="primary"
            />
          </>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('前缀头像', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <>
            <Chip
              label="文本"
              avatar={
                <Avatar>
                  <div>123</div>
                </Avatar>
              }
            />
            <Chip
              label="文本"
              variant="outlined"
              avatar={
                <Avatar>
                  <div>123</div>
                </Avatar>
              }
            />
            <Chip
              label="文本"
              avatar={
                <Avatar>
                  <div>123</div>
                </Avatar>
              }
              color="primary"
            />
            <Chip
              label="文本"
              variant="outlined"
              avatar={
                <Avatar>
                  <div>123</div>
                </Avatar>
              }
              color="primary"
            />
          </>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('选中状态', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <>
            <Chip label="文本" icon={<Cancel />} selected />
            <Chip label="文本" selected />
            <Chip label="文本" variant="outlined" icon={<Cancel />} selected />
            <Chip label="文本" variant="outlined" selected />
            <Chip label="文本" icon={<Cancel />} color="primary" selected />
            <Chip
              label="文本"
              variant="outlined"
              icon={<Cancel />}
              color="primary"
              selected
            />
          </>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('验收测试', () => {
  afterEach(cleanup);

  it('点击删除按钮，onDelete被调用', () => {
    const onDelete = jest.fn();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Chip label="文本" onDelete={onDelete} />
      </ThemeProvider>,
    );

    const clearButton = container.querySelector(
      '.sinoui-chip__delete',
    ) as HTMLElement;

    fireEvent.click(clearButton);

    expect(onDelete).toHaveBeenCalled();
  });

  it('禁用时，点击清除按钮没有作用', () => {
    const onDelete = jest.fn();
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Chip label="文本" onDelete={onDelete} disabled />
      </ThemeProvider>,
    );

    const clearButton = container.querySelector(
      '.sinoui-chip__delete',
    ) as HTMLElement;

    fireEvent.click(clearButton);

    expect(onDelete).not.toHaveBeenCalled();
  });

  it('variant=outlined', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Chip label="文本" variant="outlined" data-testid="chip" />
      </ThemeProvider>,
    );

    expect(getByTestId('chip')).toHaveClass('sinoui-chip--outlined');
  });

  it('指向根元素的属性', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Chip
          label="文本"
          variant="outlined"
          data-testid="chip"
          id="chip"
          className="custom-chip"
        />
      </ThemeProvider>,
    );

    expect(getByTestId('chip')).toHaveClass('custom-chip');
    expect(getByTestId('chip')).toHaveAttribute('id', 'chip');
  });

  it('ref 指向根元素', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Chip label="文本" data-testid="chip" ref={ref} />
      </ThemeProvider>,
    );

    expect(ref.current).toBe(getByTestId('chip'));
  });
});

it('密集模式', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Chip label="文本" dense data-testid="chip" />
    </ThemeProvider>,
  );
  expect(getByTestId('chip')).toHaveStyleRule('height', '24px');
});

it('文本不换行显示', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Chip
        label="文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本"
        style={{ width: 40 }}
        data-testid="chip"
      />
    </ThemeProvider>,
  );
  expect(
    getByTestId('chip').querySelector('.sinoui-chip__content')!,
  ).toHaveStyleRule('white-space', 'nowrap');
});

it('avatar和icon同时存在时，渲染avatar', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Chip
        label="文本"
        data-testid="chip"
        icon={<SvgIcon>M</SvgIcon>}
        avatar={<Avatar>M</Avatar>}
      />
    </ThemeProvider>,
  );

  const avatar = getByTestId('chip').querySelector('.sinoui-avatar');
  const icons = getByTestId('chip').querySelectorAll('.sinoui-svg-icon');
  expect(avatar).toBeInTheDocument();
  expect(icons).toHaveLength(0);
});

it('选中状态', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <Chip
        label="文本"
        data-testid="chip"
        selected
        icon={<SvgIcon>M</SvgIcon>}
        avatar={<Avatar>M</Avatar>}
      />
    </ThemeProvider>,
  );

  const selectedIcon = getByTestId('chip').querySelector(
    '.sinoui-chip--selected__icon',
  );

  expect(selectedIcon).toBeInTheDocument();
});
