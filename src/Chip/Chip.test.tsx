import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import 'jest-styled-components';
import Chip from './Chip';

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
      <Chip
        label="文本"
        dense
        data-testid="chip"
        onDelete={() => console.log('123')}
      />
    </ThemeProvider>,
  );
  expect(getByTestId('chip')).toHaveStyleRule('height', '24px');
});
