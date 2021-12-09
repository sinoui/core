/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import '@testing-library/jest-dom';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import ToggleButton from '../ToggleButton';

afterEach(cleanup);

it('正确渲染切换按钮', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <>
        <ToggleButton value="IOS">IOS</ToggleButton>
      </>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('渲染紧凑模式', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <>
        <ToggleButton dense value="IOS">
          IOS
        </ToggleButton>
      </>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('选中状态', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <>
        <ToggleButton selected value="IOS">
          IOS
        </ToggleButton>
        <ToggleButton color="primary" selected value="IOS">
          IOS
        </ToggleButton>
        <ToggleButton selected color="secondary" value="IOS">
          IOS
        </ToggleButton>
      </>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('渲染不同颜色的按钮', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <ToggleButton value="IOS" color="primary">
        IOS
      </ToggleButton>
      <ToggleButton value="IOS" color="success">
        IOS
      </ToggleButton>
      <ToggleButton value="IOS" color="info">
        IOS
      </ToggleButton>
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

describe('className', () => {
  it('基础渲染', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <ToggleButton value="check" data-testid="toggleButton">
          IOS
        </ToggleButton>
      </ThemeProvider>,
    );

    expect(getByTestId('toggleButton')).toHaveClass('sinoui-toggle-button');
  });

  it('选中状态', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <ToggleButton value="check" selected data-testid="toggleButton">
          IOS
        </ToggleButton>
      </ThemeProvider>,
    );

    expect(getByTestId('toggleButton')).toHaveClass(
      'sinoui-toggle-button--selected',
    );
  });

  it('紧凑模式', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <ToggleButton value="check" dense data-testid="toggleButton">
          IOS
        </ToggleButton>
      </ThemeProvider>,
    );

    expect(getByTestId('toggleButton')).toHaveClass(
      'sinoui-toggle-button--dense',
    );
  });

  it('点击按钮时，onchange被调用', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <ToggleButton
          value="check"
          onChange={onChange}
          dense
          data-testid="toggleButton"
        >
          IOS
        </ToggleButton>
      </ThemeProvider>,
    );

    const button = getByTestId('toggleButton');

    act(() => {
      fireEvent.click(button);
    });

    expect(onChange).toHaveBeenCalledWith('check');
  });
});
