import type { SvgIconProps } from '@sinoui/core/SvgIcon';
import SvgIcon from '@sinoui/core/SvgIcon';

/**
 * 日期选择图标
 *
 * @param props 组件属性
 */
const DatePickerIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  </SvgIcon>
);

export default DatePickerIcon;
