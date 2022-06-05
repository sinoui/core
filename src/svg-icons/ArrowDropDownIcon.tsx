import type { SvgIconProps } from '@sinoui/core/SvgIcon';
import SvgIcon from '@sinoui/core/SvgIcon';

/**
 * 向下指示箭头图标组件
 *
 * @param props 组件属性
 */
const ArrowDropDownIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path d="M7 10l5 5 5-5z" />
  </SvgIcon>
);

export default ArrowDropDownIcon;
