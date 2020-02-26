import { Theme } from '@sinoui/theme';

/**
 * 颜色类型
 */
export const COLOR_TYPES = [
  'primary',
  'secondary',
  'textPrimary',
  'textSecondary',
  'error',
  'warning',
  'success',
  'info',
];

/**
 * 获取组件属性中是否包含指定的颜色类型
 */
function isColorTypeTrue(
  props: { color?: string | boolean },
  colorType: string,
): boolean {
  return props.color === colorType;
}

/**
 * 获取主题中的颜色
 */
export function getColorFromTheme(
  props: { color?: string; theme?: Theme },
  defaultColor?: string,
) {
  if (props.color && COLOR_TYPES.indexOf(props.color) === -1) {
    return defaultColor;
  }

  console.log(props.theme.palette.primary, props.theme.palette.primary.main);

  let color = defaultColor;
  if (props.theme) {
    if (isColorTypeTrue(props, 'primary')) {
      color = props.theme.palette.primary[500];
    }
    if (isColorTypeTrue(props, 'secondary')) {
      color = props.theme.palette.secondary[500];
    }
    if (isColorTypeTrue(props, 'textPrimary')) {
      color = props.theme.palette.text.primary;
    }
    if (isColorTypeTrue(props, 'textSecondary')) {
      color = props.theme.palette.text.secondary;
    }
    if (isColorTypeTrue(props, 'error')) {
      color = props.theme.palette.error[600];
    }
    if (isColorTypeTrue(props, 'warning')) {
      color = props.theme.palette.warning[500];
    }
    if (isColorTypeTrue(props, 'success')) {
      color = props.theme.palette.success.A700;
    }
    if (isColorTypeTrue(props, 'info')) {
      color = props.theme.palette.info[500];
    }
  }
  return color;
}
