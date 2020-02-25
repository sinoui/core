import { css } from 'styled-components';
import { getLuminance } from 'polished';
import { Theme } from '@sinoui/theme';

export const COLOR_TYPES = [
  'primary',
  'accent',
  'success',
  'error',
  'info',
  'warning',
  'danger',
  'light',
  'dark',
  'action',
  'contrast',
];

/**
 * 获取颜色相关的属性
 *
 * @param {object} props
 */
export const cloneColorProps = (props: object) => {
  const clone = {};

  Object.keys(props)
    .filter((key) => COLOR_TYPES.indexOf(key) !== -1)
    .forEach((key) => {
      clone[key] = props[key];
    });

  return clone;
};

/**
 * 获取排除掉颜色相关属性的属性对象
 *
 * @param {object} props
 */
export const extraColorProps = (props: object) => {
  const result = { color: 'none' };

  Object.keys(props)
    .filter((key) => COLOR_TYPES.indexOf(key) === -1)
    .forEach((key) => {
      result[key] = props[key];
    });

  return result;
};

/**
 * 获取组件属性中是否包含指定的颜色类型
 *
 * @param {object} props 组件属性
 * @param {string} colorType 颜色类型
 */
function isColorTypeTrue(
  props: { color?: string | boolean },
  colorType: string,
): boolean {
  return props[colorType] || props.color === colorType;
}

/**
 * 获取props中是否不包含颜色类型
 */
export function isEmptyOfColorType(props: {
  color: string | boolean;
  colorType: string;
}): boolean {
  return (
    props.color === false ||
    COLOR_TYPES.every((colorType) => !isColorTypeTrue(props, colorType))
  );
}

/**
 * 获取主题中的颜色
 *
 * @param {*} props
 */
export function getColorFromTheme(
  props: { color?: string; disabled?: boolean; theme?: Theme },
  defaultColor?: string,
) {
  if (props.color === 'none') {
    return undefined;
  }
  if (props.color && COLOR_TYPES.indexOf(props.color) === -1) {
    return props.color;
  }

  // default or primary
  let color = defaultColor || props.theme.palette.primary[500];

  /* eslint prefer-destructuring: 0 */
  if (isColorTypeTrue(props, 'primary')) {
    color = props.theme.palette.primary[500];
  }
  if (isColorTypeTrue(props, 'success')) {
    color = props.theme.palette.success.A700;
  }
  if (isColorTypeTrue(props, 'accent')) {
    color = props.theme.palette.accent.A200;
  }
  if (isColorTypeTrue(props, 'error')) {
    color = props.theme.palette.error[600];
  }
  if (isColorTypeTrue(props, 'info')) {
    color = props.theme.palette.info[500];
  }
  if (isColorTypeTrue(props, 'warning')) {
    color = props.theme.palette.warning[500];
  }
  if (isColorTypeTrue(props, 'danger')) {
    color = props.theme.palette.danger[500];
  }
  if (isColorTypeTrue(props, 'light')) {
    color = props.theme.palette.grey[100];
  }
  if (isColorTypeTrue(props, 'dark')) {
    color = props.theme.palette.black;
  }
  if (isColorTypeTrue(props, 'action')) {
    color = props.theme.palette.action.active;
  }
  if (isColorTypeTrue(props, 'contrast')) {
    color = props.theme.palette.text.primary;
  }
  if (props.disabled) {
    color = props.theme.palette.action.disabled;
  }
  return color;
}

export const colorCss = (
  props: { color?: string },
  defaultColor?: string,
) => css`
  ${props.color !== 'none' &&
    `color: ${getColorFromTheme(props, defaultColor)}`};
`;

/**
 * 获取两个颜色之间的对比度。
 *
 * 公式: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 *
 * @param {string} foreground
 *              - 颜色值，比如: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background
 *              - 颜色值，比如: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} 0 - 21之间的对比度。
 */
export function getContrastRatio(foreground: string, background: string) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
