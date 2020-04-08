import { Theme } from '@sinoui/theme';

export { Theme };

/**
 * 色系
 */
export interface ColorSeries {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
  W1?: string;
  W2?: string;
  W3?: string;
  contrastDefaultColor: 'light' | 'dark';
}

/**
 * 调色板设置
 */
export interface PaletteOptions {
  /**
   * 主色调
   */
  primary?: ColorSeries;
  /**
   * 辅助色调
   */
  accent?: ColorSeries;
  /**
   * 错误状态色调
   */
  error?: ColorSeries;
  /**
   * 成功状态色调
   */
  success?: ColorSeries;
  /**
   * 提示色调
   */
  info?: ColorSeries;
  /**
   * 警告状态色调
   */
  warning?: ColorSeries;
  /**
   * 危险状态色调
   */
  danger?: ColorSeries;
  /**
   * 主题类型
   */
  type?: 'light' | 'dark';
  /**
   * 对比度， 0 ~ 21
   */
  contrastThreshold?: number;
}

/**
 * 文本调色板
 */
export interface PaletteText {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
  icon: string;
  divider: string;
  lightDivider: string;
  snackbar: string;
}

/**
 * 输入框调色板
 */
export interface PaletteInput {
  bottomLine: string;
  helperText: string;
  labelText: string;
  inputText: string;
  disabled: string;
}

/**
 * 动作调色板
 */
export interface PaletteAction {
  active: string;
  disabled: string;
  hover: string;
  selected: string;
}

/**
 * 背景调色板
 */
export interface PaletteBackground {
  default: string;
  paper: string;
  appBar: string;
  contentFrame: string;
  divider: string;
  chips: string;
  chipsImg: string;
  chipsBut: string;
  chipsButHover: string;
  tooltip: string;
  transparent: string;
  sendcondaryTransparent: string;
  snackbar: string;
}

/**
 * 主题调色板
 */
export interface PaletteShade {
  text: PaletteText;
  input: PaletteInput;
  action: PaletteAction;
  background: PaletteBackground;
}

/**
 * 主题调色板
 */
export interface PaletteShades {
  light: PaletteShade;
  dark: PaletteShade;
}

/**
 * 调色板
 */
export interface Palette {
  type: 'light' | 'dark';
  shades: PaletteShades;
  text: PaletteText;
  input: PaletteInput;
  action: PaletteAction;
  background: PaletteBackground;
  primary: ColorSeries;
  accent: ColorSeries;
  error: ColorSeries;
  success: ColorSeries;
  info: ColorSeries;
  warning: ColorSeries;
  danger: ColorSeries;
  grey: ColorSeries;
  white: string;
  black: string;
  getContrastText: (color: string) => string;
}

/**
 * 字重
 */
export type FontWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'normal'
  | 'bold'
  | 'bolder'
  | 'light'
  | 'lighter';

/**
 * 文本项
 */
export interface TypographyItem {
  fontSize: number;
  fontWeight: FontWeight;
  fontFamily: string;
  lineHeight: number | 'normal' | 'inherit';
  color: string;
  letterSpacing?: string;
}

/**
 * 字体配置项
 */
export interface TypographyConstants {
  fontFamily?: string;
  fontSize?: number;
  fontWeightLight?: FontWeight;
  fontWeightRegular?: FontWeight;
  fontWeightMedium?: FontWeight;
  button?: TypographyItem;
  caption?: TypographyItem;
  body1?: TypographyItem;
  body2?: TypographyItem;
  subheading?: TypographyItem;
  title?: TypographyItem;
  headline?: TypographyItem;
  display1?: TypographyItem;
  display2?: TypographyItem;
  display3?: TypographyItem;
  display4?: TypographyItem;
}

/**
 * 文本主题
 */
export interface ThemeTypography {
  fontFamily: string;
  fontWeightLight: FontWeight;
  fontWeightRegular: FontWeight;
  fontWeightMedium: FontWeight;
  button: TypographyItem;
  caption: TypographyItem;
  body1: TypographyItem;
  body2: TypographyItem;
  subheading: TypographyItem;
  title: TypographyItem;
  headline: TypographyItem;
  display1: TypographyItem;
  display2: TypographyItem;
  display3: TypographyItem;
  display4: TypographyItem;
}

/**
 * 阴影主题
 */
export interface ThemeShadows {
  [index: number]: string;
}

/**
 * 变换配置项
 */
export interface TransitionOptions {
  duration?: number;
  easing?: string;
  delay?: number;
}

/**
 * 缓动函数
 */
export interface ThemeTransitionsEasing {
  easeInOut: string;
  easeOut: string;
  easeIn: string;
  sharp: string;
}

/**
 * css3变换时长
 */
export interface ThemeTransitionsDuration {
  shortest: number;
  shorter: number;
  short: number;
  standard: number;
  complex: number;
  enteringScreen: number;
  leavingScreen: number;
}

/**
 * css3变换主题
 */
export interface ThemeTransitions {
  easing: ThemeTransitionsEasing;
  duration: ThemeTransitionsDuration;
  create: (props: string | string[], options?: TransitionOptions) => string;
  getAutoHeightDuration: (height: number) => number;
}

/**
 * zIndex主题
 */
export interface ThemeZIndex {
  mobileStepper: number;
  menu: number;
  appBar: number;
  drawerOverlay: number;
  navDrawer: number;
  modal: number;
  dialogOverlay: number;
  dialog: number;
  layer: number;
  popover: number;
  snackbar: number;
  tooltip: number;
}

/**
 * 留白主题
 */
export interface ThemeSpacing {
  unit: number;
}

/**
 * 主题配置项
 */
export interface ThemeOptions {
  palette?: Palette;
  typography?: ThemeTypography;
  shadows?: ThemeShadows;
}

/**
 * 颜色属性。可以是：
 *
 * * 主题色名称；primary, accent, success, info, error, warning, danger, light, dark, action, contrast, none
 * * 也可以是css color属性值，如currentColor, initial, inherit, unset, #aaa, rgba(0, 0, 0, 0.87), red
 */
export type ColorProp =
  | 'primary'
  | 'accent'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark'
  | 'action'
  | 'contrast'
  | 'initial'
  | 'inherit'
  | 'unset'
  | 'currentColor'
  | 'none'
  | string;
