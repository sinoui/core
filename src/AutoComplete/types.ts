export interface Option {
  [name: string]: any;
}

export interface RenderOption {
  options: Option[];
  groupTitle: string;
  key: string;
}

export interface Props {
  /**
   * 可展示的数据
   */
  options: RenderOption[];
  /**
   * 处理选项渲染，没有指定renderOption时，使用此渲染方式
   */
  getOptionLabel: (option: Option) => string;
  /**
   * 分组依据
   */
  groupBy?: (option: Option) => string;
  /**
   * 自定义选项渲染方式
   */
  renderOption?: (option: Option) => React.ReactNode;
  /**
   * 自定义分组数据的渲染
   */
  renderGroup?: (option: Option) => React.ReactNode;
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
}
