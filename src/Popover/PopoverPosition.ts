import {
  RelativePosition,
  getTargetPosition,
  getTransformOrigin,
  Rect,
  suitBorder,
} from './PopoverPositionUtils';
/**
 * 计算Popover位置的几何模型实现
 */
export default class PopoverPosition {
  /**
   * 创建计算popover位置的PopoverPosition对象。
   *
   * @param {*} anchorPosition 定位的相对位置
   * @param {*} transformPosition 偏移的相对位置（由css3的transform-origin实现）
   * @param {*} marginThreshold 与容器的边距
   */
  constructor(
    anchorPosition: RelativePosition,
    transformPosition: RelativePosition,
    marginThreshold: number,
  ) {
    this.anchorPosition = anchorPosition;
    this.transformPosition = transformPosition;
    this.marginThreshold = marginThreshold;
  }

  /**
   * 定位的相对位置
   */
  public anchorPosition: RelativePosition;

  /**
   * 偏移的相对位置（由css3的transform-origin实现）
   */
  public transformPosition: RelativePosition;

  /**
   * 与容器的边距
   */
  public marginThreshold: number;

  /**
   * 获取popover的位置
   *
   * @param {*} containerRect 容器尺寸
   * @param {*} anchorRect 相对定位的锚点
   * @param {*} targetRect 需要定位的目标
   * @param {number} targetAnchorOffset 目标定位的偏移量
   */
  public getPosition(
    containerRect: { width: number; height: number },
    anchorRect: ClientRect,
    targetRect: ClientRect,
    targetAnchorOffset: number,
  ): {
    left: number;
    right?: number;
    transformOrigin: {
      vertical: number;
      horizontal: number;
    };
    top: number;
  } {
    const targetPosition = getTargetPosition(anchorRect, this.anchorPosition);
    const targetOffset = getTransformOrigin(
      targetRect,
      targetAnchorOffset,
      this.transformPosition,
    );

    // 如果有指定的AnchorOffset，就相当于将指定的定位元素放置在anchor元素的中间位置
    if (targetAnchorOffset > 0) {
      targetOffset.vertical -= anchorRect.height / 2;
    }

    return suitBorder(
      new Rect(
        targetRect.width,
        targetRect.height,
        targetPosition.left - targetOffset.horizontal,
        targetPosition.top - targetOffset.vertical,
      ),
      targetOffset,
      containerRect,
      this.marginThreshold,
    );
  }
}
