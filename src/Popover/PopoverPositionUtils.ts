import { getOffsetLeft, getOffsetTop } from './popoverUtils';

export interface RelativePosition {
  vertical: number | 'top' | 'center' | 'bottom';
  horizontal: number | 'left' | 'center' | 'right';
}

/**
 * @private
 *
 * 获取偏移位置
 *
 * @param {*} elemRect
 * @param {*} contentAnchorOffset
 */
export function getTransformOrigin(
  elemRect: { width: number; height: number },
  contentAnchorOffset = 0,
  transformOrigin: RelativePosition,
) {
  return {
    vertical:
      contentAnchorOffset > 0
        ? contentAnchorOffset
        : getOffsetTop(elemRect, transformOrigin.vertical),
    horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal),
  };
}

/**
 * @private
 * 获取popover目标元素的位置
 *
 * @param {*} anchorRect
 * @param {*} anchorOrigin
 */
export function getTargetPosition(
  anchorRect: Rect,
  anchorOrigin: RelativePosition,
): { left: number; top: number } {
  return {
    top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
    left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal),
  };
}

/**
 * @private
 *
 * 适应边界： 调整指定元素的位置，以让元素完全显示在容器的边界内部。
 *
 * @param {*} elementRect
 * @param {*} containerRect
 * @param {*} marginThreshold
 */
export function suitBorder(
  elementRect: Rect,
  elementOffset: { vertical: number; horizontal: number },
  containerRect: { width: number; height: number },
  marginThreshold: number,
  anchorRect: ClientRect,
) {
  let { left, top } = elementRect;
  const { height: anchorRectHeight } = anchorRect;
  const { bottom, right, height } = elementRect;
  const heightThreshold = containerRect.height - marginThreshold;
  const widthThreshold = containerRect.width - marginThreshold;
  const transformOrigin = { ...elementOffset };

  // Check if the vertical axis needs shifting
  if (top < marginThreshold) {
    const diff = top - marginThreshold;
    top -= diff;
    transformOrigin.vertical += diff;
  } else if (bottom > heightThreshold) {
    top -= anchorRectHeight + height - 6; // 这里的6是为了解决outline模式下的样式
    transformOrigin.vertical += anchorRectHeight + height;
  }

  // Check if the horizontal axis needs shifting
  if (left < marginThreshold) {
    const diff = left - marginThreshold;
    left -= diff;
    transformOrigin.horizontal += diff;
  } else if (right > widthThreshold) {
    const diff = right - widthThreshold;
    left -= diff;
    transformOrigin.horizontal += diff;
  }

  return {
    top,
    left,
    transformOrigin,
  };
}

export class Rect {
  constructor(width: number, height: number, left: number, top: number) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.right = left + width;
    this.top = top;
    this.bottom = top + height;
  }

  public width: number;

  public height: number;

  public left: number;

  public right: number;

  public top: number;

  public bottom: number;
}
