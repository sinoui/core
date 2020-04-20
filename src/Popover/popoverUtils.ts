/**
 * 获取顶部偏移量
 *
 * @param {ClientRect} rect 偏移量的参照物
 * @param {number | 'top' | 'right' | 'bottom'} vertical 垂直位置
 *
 * @returns {number} 返回顶部偏移量
 */
export function getOffsetTop(
  rect: { width: number; height: number },
  vertical: number | 'top' | 'center' | 'bottom',
): number {
  let offset = 0;

  if (typeof vertical === 'number') {
    offset = vertical;
  } else if (vertical === 'center') {
    offset = rect.height / 2;
  } else if (vertical === 'bottom') {
    offset = rect.height;
  }

  return offset;
}

/**
 * 获取左侧偏移量
 *
 * @param {ClientRect} rect 偏移量的参照物
 * @param {number | 'left' | 'center' | 'right'} horizontal 水平位置
 */
export function getOffsetLeft(
  rect: { width: number; height: number },
  horizontal: number | 'left' | 'center' | 'right',
) {
  let offset = 0;

  if (typeof horizontal === 'number') {
    offset = horizontal;
  } else if (horizontal === 'center') {
    offset = rect.width / 2;
  } else if (horizontal === 'right') {
    offset = rect.width;
  }

  return offset;
}
