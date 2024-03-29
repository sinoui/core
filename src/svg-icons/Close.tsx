import type { SvgIconProps } from '@sinoui/core/SvgIcon';
import SvgIcon from '@sinoui/core/SvgIcon';

/**
 * 关闭图标组件
 *
 * @param props 组件属性
 */
const Close: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </SvgIcon>
);

export default Close;
