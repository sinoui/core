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

const isColor = (props: { theme?: Theme }, colorType: string) => {
  const { main } = props.theme && props.theme.palette[colorType];
  return main;
};

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

  let color = defaultColor;
  if (props.theme) {
    if (isColorTypeTrue(props, 'primary')) {
      color = isColor(props, 'primary');
    }
    if (isColorTypeTrue(props, 'secondary')) {
      color = isColor(props, 'secondary');
    }
    if (isColorTypeTrue(props, 'textPrimary')) {
      color = props.theme.palette.text.primary;
    }
    if (isColorTypeTrue(props, 'textSecondary')) {
      color = props.theme.palette.text.secondary;
    }
    if (isColorTypeTrue(props, 'error')) {
      color = isColor(props, 'error');
    }
    if (isColorTypeTrue(props, 'warning')) {
      color = isColor(props, 'warning');
    }
    if (isColorTypeTrue(props, 'success')) {
      color = isColor(props, 'success');
    }
    if (isColorTypeTrue(props, 'info')) {
      color = isColor(props, 'info');
    }
  }
  return color;
}
