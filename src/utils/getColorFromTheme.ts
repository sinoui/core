import { Theme } from '@sinoui/theme';

/**
 *
 * 从对象中通过对象路径获取到属性值
 *
 * @export
 * @param {object} palette 主题theme.palette对象
 * @param {string[]} path 对象路径数组
 * @returns
 */
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

/**
 * 获取对象路径
 *
 * @param {string} key 颜色关键字
 * @returns
 */
const camelToObjectPath = (key: string) => {
  return key.replace(/[A-Z]/g, (word) => `.${word.toLowerCase()}`).split('.');
};

/**
 *
 * 获取关键字对应的颜色
 *
 * @export
 * @param {Theme} theme 主题
 * @param {string} colorKey 颜色关键字
 * @returns
 */
export default function getColorFromTheme(theme: Theme, colorKey?: string) {
  if (!colorKey) {
    return undefined;
  }
  const colorValueFromTheme = get(theme.palette, camelToObjectPath(colorKey));
  return colorValueFromTheme || colorKey;
}
