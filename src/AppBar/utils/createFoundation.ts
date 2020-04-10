import createDOMAdapter from './createDOMAdapter';
import {
  TopAppBarFoundation,
  FixedFoundation,
  ShortFoundation,
  FixedProminentFoundation,
} from '../foundation';
import { AppBarStatusTypes } from '../types';

/**
 * 创建不同类型的滚动
 * @param appBarProps 应用栏各种状态属性
 * @param scrollTarget 滚动目标
 * @param appBar 应用栏本栏
 */
export default function createFoundation(
  appBarProps: AppBarStatusTypes,
  scrollTarget: Window | HTMLElement,
  appBar: HTMLElement,
) {
  const { fixed, short, prominent, shortCollapsed } = appBarProps;
  const adapter = createDOMAdapter(scrollTarget, appBar);
  if (fixed && !short && !prominent) {
    return new FixedFoundation(adapter, scrollTarget);
  }
  if (short && !shortCollapsed) {
    return new ShortFoundation(adapter, scrollTarget);
  }

  if (prominent) {
    return new FixedProminentFoundation(adapter, scrollTarget);
  }

  return new TopAppBarFoundation(adapter, scrollTarget);
}
