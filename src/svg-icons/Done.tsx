import type { SvgIconProps } from '@sinoui/core/SvgIcon';
import SvgIcon from '@sinoui/core/SvgIcon';

/**
 * 完成图标组件
 *
 * @param props 组件属性
 */
const Done: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
  </SvgIcon>
);

export default Done;
