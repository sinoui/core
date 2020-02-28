import { css } from 'styled-components';
import getColorFromTheme from './getColorFromTheme';

interface CompProps {
  /**
   * 颜色关键字或者颜色值
   */
  color?: string;
}

/**
 * 从主题中提取颜色的样式
 *
 * @param cssVariables 应用颜色的一个或者多个css属性名
 * @param defaultColor 默认的颜色值
 */
export default function colorCss(
  cssVariables: string | string[],
  defaultColor?: string,
) {
  const keys = typeof cssVariables === 'string' ? [cssVariables] : cssVariables;
  return css<CompProps>(({ theme, color = defaultColor }) => {
    const colorValue = getColorFromTheme(theme, color);
    return colorValue
      ? keys.reduce((draft, key) => {
          draft[key] = colorValue;
          return draft;
        }, {} as Record<string, string>)
      : null;
  });
}
