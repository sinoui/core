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
});
