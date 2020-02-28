import { Theme } from '@sinoui/theme';

const get = <T>(palette: any, path: string[]): T | undefined => {
  if (typeof palette !== 'object') {
    return undefined;
  }

  const [key, ...rest] = path;
  const value = palette[key];

  if (rest.length > 0) {
    return get(value, rest);
  }

  if (typeof value === 'object') {
    return value.main;
  }
  return value;
};

const camelToObjectPath = (key: string) => {
  return key.replace(/[A-Z]/g, (word) => `.${word.toLowerCase()}`).split('.');
};

/**
 *
 * 获取关键字对应的颜色
 *
 * @export
 * @param {Theme} theme
 * @param {string} colorKey
 * @returns
 */
export default function getColorFromTheme(theme: Theme, colorKey: string) {
  if (!colorKey) {
    return undefined;
  }
  const colorValueFromTheme = get(theme.palette, camelToObjectPath(colorKey));
  return colorValueFromTheme || colorKey;
}
