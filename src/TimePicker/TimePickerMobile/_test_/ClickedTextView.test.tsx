import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import { defaultTheme } from '@sinoui/theme';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import ClickedTextView from '../ClickedTextView';

afterEach(cleanup);

it('点击', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <ClickedTextView
        selected={false}
        onChange={onChange}
        data-testid="clicked-text"
      >
        12
      </ClickedTextView>
    </ThemeProvider>,
  );

  const clickedText = getByTestId('clicked-text');

  act(() => {
    fireEvent.click(clickedText);
  });
  expect(onChange).toBeCalled();
});

it('高亮显示样式', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <ClickedTextView selected onChange={onChange} data-testid="clicked-text">
        12
      </ClickedTextView>
    </ThemeProvider>,
  );

  const clickedText = getByTestId('clicked-text');

  expect(clickedText).toHaveStyle('opacity:1');
});

it('非高亮显示样式', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <ClickedTextView
        selected={false}
        onChange={onChange}
        data-testid="clicked-text"
      >
        12
      </ClickedTextView>
    </ThemeProvider>,
  );

  const clickedText = getByTestId('clicked-text');

  expect(clickedText).toHaveStyle('opacity:0.7');
});

describe('快照测试', () => {
  const onChange = jest.fn();
  it('未选中', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <ClickedTextView selected={false} onChange={onChange}>
            12
          </ClickedTextView>
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('未选中', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <ClickedTextView selected onChange={onChange}>
            12
          </ClickedTextView>
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
