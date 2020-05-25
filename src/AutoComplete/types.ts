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
  renderOption?: (option: Option) => string;
  renderGroup?: (option: Option) => string;
}
