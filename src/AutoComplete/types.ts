export interface RenderOption {
  options: any[];
  groupTitle: string;
  key: number;
  index: number;
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
  onOptionClick?: (label: string) => void;
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
}
