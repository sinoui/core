import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import SwitchLabel from '../SwitchLabel';

describe('SwitchLabel 镜像测试', () => {
  it('渲染SwitchLabel', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <SwitchLabel />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('不可用状态', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <SwitchLabel disabled />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('选中状态', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <SwitchLabel checked color="info" />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('验收测试', () => {
  afterEach(cleanup);

  it('focused下的样式类', () => {
    const { container, getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <SwitchLabel checked />
      </ThemeProvider>,
    );

    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.focus(input);

    expect(getByTestId('switchLabel')).toHaveClass('sinoui-switch--focused');

    fireEvent.blur(input);
    expect(getByTestId('switchLabel')).not.toHaveClass(
      'sinoui-switch--focused',
    );
  });
});
