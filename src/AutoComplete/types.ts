export interface Option {
  [name: string]: any;
}

export interface RenderOption {
  options: Option[];
  groupTitle: string;
  key: string;
}

export interface Props {
  options: RenderOption[];
  getOptionLabel: (option: Option) => string;
  groupBy?: (option: Option) => string;
  renderOption?: (option: Option) => React.ReactNode;
  renderGroup?: (option: Option) => React.ReactNode;
  ListboxComponent?: React.ReactType;
}
