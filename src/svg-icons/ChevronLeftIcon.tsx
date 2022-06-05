import type { SvgIconProps } from '@sinoui/core/SvgIcon';
import SvgIcon from '@sinoui/core/SvgIcon';

/**
 * ChevronLeft 图标组件
 *
 * @param props 组件属性
 */
export default function ChevronLeftIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </SvgIcon>
  );
}
