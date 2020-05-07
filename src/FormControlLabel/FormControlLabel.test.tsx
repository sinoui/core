import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { render, cleanup } from '@testing-library/react';
import FormControlLabel from './FormControlLabel';
import Button from '../Button';

afterEach(cleanup);

it('正确渲染FormControLabel', () => {
  const tree = renderer.create(
    <ThemeProvider theme={defaultTheme}>
      <FormControlLabel label="复选框" control={<Button />} />
    </ThemeProvider>,
  );

  expect(tree).toMatchSnapshot();
});

it('传递 className 属性', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormControlLabel
        control={<Button />}
        className="test-class"
        data-testid="formcontrol"
        label="标签"
      />
    </ThemeProvider>,
  );

  expect(getByTestId('formcontrol')).toHaveClass('test-class');
});

it('ref', () => {
  const ref = React.createRef<HTMLLabelElement>();
  const { getByTestId } = render(
    <ThemeProvider theme={defaultTheme}>
      <FormControlLabel
        control={<Button />}
        data-testid="formcontrol"
        label="标签"
        ref={ref}
      />
    </ThemeProvider>,
  );

  expect(getByTestId('formcontrol')).toBe(ref.current);
});
