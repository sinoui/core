import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createTheme } from '@sinoui/theme';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';

describe('getColorFromTheme 单元测试', () => {
  afterEach(cleanup);

  test('测试获取关键字对应的颜色', async () => {
    const theme = createTheme();
    const primaryColor = getColorFromTheme(theme, 'primary');
    expect(primaryColor).toBe(theme.palette.primary.main);

    const secondaryColor = getColorFromTheme(theme, 'secondary');
    expect(secondaryColor).toBe(theme.palette.secondary.main);

    const textPrimaryColor = getColorFromTheme(theme, 'textPrimary');
    expect(textPrimaryColor).toBe(theme.palette.text.primary);

    const textSecondaryColor = getColorFromTheme(theme, 'textSecondary');
    expect(textSecondaryColor).toBe(theme.palette.text.secondary);

    const actionActiveColor = getColorFromTheme(theme, 'actionActive');
    expect(actionActiveColor).toBe(theme.palette.action.active);

    const actionHoverColor = getColorFromTheme(theme, 'actionHover');
    expect(actionHoverColor).toBe(theme.palette.action.hover);
  });
});
