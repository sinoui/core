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
  let color = defaultColor || props.theme?.palette.primary[500];

  /* eslint prefer-destructuring: 0 */
  if (props.color === 'primary') {
    color = props.theme?.palette.primary[500];
  }
  if (props.color === 'success') {
    color = props.theme?.palette.success.A700;
  }
  if (props.color === 'accent') {
    color = props.theme?.palette.accent.A200;
  }
  if (props.color === 'error') {
    color = props.theme?.palette.error[600];
  }
  if (props.color === 'info') {
    color = props.theme?.palette.info[500];
  }
  if (props.color === 'warning') {
    color = props.theme?.palette.warning[500];
  }
  if (props.color === 'danger') {
    color = props.theme?.palette.danger[500];
  }
  if (props.color === 'light') {
    color = props.theme?.palette.grey[100];
  }
  if (props.color === 'dark') {
    color = props.theme?.palette.black;
  }
  if (props.color === 'action') {
    color = props.theme?.palette.action.active;
  }
  if (props.color === 'contrast') {
    color = props.theme?.palette.text.primary;
  }
  if (props.disabled) {
    color = props.theme?.palette.action.disabled;
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
