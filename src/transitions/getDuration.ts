import { transitions } from '@sinoui/theme';
import type BaseTransitionProps from './BaseTransitionProps';

export type TransitionTimeout = BaseTransitionProps['timeout'] | 'auto';

/**
 * 获取过渡时长
 *
 * @param timeout 时长
 * @param node 节点
 * @param mode 模式
 */
const getDuration = (
  timeout: TransitionTimeout,
  status: 'enter' | 'exit',
  node?: HTMLElement | null,
) => {
  if (!timeout) {
    return 0;
  }
  if (timeout === 'auto') {
    return node ? transitions.getAutoHeightDuration(node.clientHeight) : 0;
  }
  if (typeof timeout === 'number') {
    return timeout;
  }
  return timeout[status] ?? 0;
};

export default getDuration;
