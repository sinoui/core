export interface RenderOption {
  options: any[];
  groupTitle: string;
  key: number;
  index: number;
}

/**
 * 自动完成组件关闭弹窗原因
 */
export enum AutoCompleteCloseReason {
  selectOption = 'select-option',
  blur = 'blur',
  escape = 'escape',
  popperIndicatorClick = 'popper-indicator-click',
}

export interface Props {
  /**
   * 可展示的数据
   */
  options: any[];
  /**
   * 处理选项渲染，没有指定renderOption时，使用此渲染方式
   */
  getOptionLabel: (option: any) => string;
  /**
   * 分组依据
   */
  groupBy?: (option: any) => string;
  /**
   * 自定义选项渲染方式
   */
  renderOption?: (option: any) => React.ReactNode;
  /**
   * 自定义分组数据的渲染
   */
  renderGroup?: (option: any) => React.ReactNode;
  /**
   * 指定渲染选项列表的容器组件
   */
  ListboxComponent?: React.ReactType;
  /**
   * 选中项
   */
  selectedOptions?: string[];
  /**
   * 点击选项时的回调函数
   */
  onOptionClick?: (option: any) => void;
  /**
   * 如果设置为`true`，则显示加载中图标
   */
  loading?: boolean;
  /**
   * 不可用的选项
   */
  disabledOptions?: string[];
  /**
   * 当前聚焦选项
   */
  focusedOption?: string;
  /**
   * 如果设置为`true`，则为freeSolo模式。默认为`false`
   */
  freeSolo?: boolean;
}

export interface TagProps {
  onDelete: (event: React.MouseEvent) => void;
  onClick: (event: React.MouseEvent) => void;
  label: string;
  variant?: 'outlined' | 'standard';
}

export interface RenderTagsProps {
  tags: string[];
  getTagProps: (index: number) => TagProps;
}
