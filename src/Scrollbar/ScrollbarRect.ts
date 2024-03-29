/* eslint-disable no-underscore-dangle */
/**
 * 滚动条盒模型
 */
export default class ScrollbarRect {
  /**
   * 水平滚动位置
   */
  private _scrollLeft = 0;

  /**
   * 垂直滚动位置
   */
  private _scrollTop = 0;

  /**
   * 滚动内容的宽度
   */
  public scrollWidth = 0;

  /**
   * 滚动内容的高度
   */
  public scrollHeight = 0;

  /**
   * 滚动容器的宽度
   */
  public containerWidth = 0;

  /**
   * 滚动容器的高度
   */
  public containerHeight = 0;

  /**
   * 滚动指示器最小尺寸
   */
  public thumbMinSize = 0;

  /**
   * 垂直轨道高度
   */
  public verticalTrackHeight = 0;

  /**
   * 水平轨道宽度
   */
  public horizontalTrackWidth = 0;

  /**
   * 判断是否显示水平滚动条
   * @returns 如果容器宽度小于滚动宽度，则返回 true；否则返回 false
   */
  public isHorizontalScrollVisible() {
    return this.containerWidth < this.scrollWidth;
  }

  /**
   * 判断是否显示垂直滚动条
   *
   * @returns 如果容器高度小于滚动高度，则返回 true；否则返回 false
   */
  public isVerticalScrollVisible() {
    return this.containerHeight < this.scrollHeight;
  }

  public get scrollLeft() {
    return this._scrollLeft;
  }

  public set scrollLeft(scrollLeft: number) {
    this._scrollLeft = Math.max(0, Math.min(this.scrollWidth, scrollLeft));
  }

  public get scrollTop() {
    return this._scrollTop;
  }

  public set scrollTop(scrollTop: number) {
    this._scrollTop = Math.max(0, Math.min(this.scrollHeight, scrollTop));
  }

  /**
   * 获取水平滚动指示器的宽度
   */
  public get horizontalThumbWidth() {
    if (this.scrollWidth === 0) {
      return 0;
    }

    const thumbSize = Math.ceil(
      (this.containerWidth / this.scrollWidth) * this.horizontalTrackWidth,
    );

    if (thumbSize === this.horizontalTrackWidth) {
      return 0;
    }

    return Math.max(thumbSize, this.thumbMinSize);
  }

  /**
   * 获取垂直滚动指示器的高度
   */
  public get verticalThumbHeight() {
    if (this.scrollHeight === 0) {
      return 0;
    }

    const thumbSize = Math.ceil(
      (this.containerHeight / this.scrollHeight) * this.verticalTrackHeight,
    );

    if (thumbSize === this.verticalTrackHeight) {
      return 0;
    }

    return Math.max(thumbSize, this.thumbMinSize);
  }

  /**
   * 获取水平滚动指示器的位置
   */
  public get horizontalThumbPosition() {
    const nativeBlankWidth = this.scrollWidth - this.containerWidth;
    if (nativeBlankWidth <= 0) {
      return 0;
    }
    const offset = this.scrollLeft / nativeBlankWidth;
    const blankWidth = this.horizontalTrackWidth - this.horizontalThumbWidth;
    return offset * blankWidth;
  }

  /**
   * 获取垂直滚动指示器的位置
   */
  public get verticalThumbPosition() {
    const nativeBlankHeight = this.scrollHeight - this.containerHeight;
    if (nativeBlankHeight <= 0) {
      return 0;
    }
    const offset = this.scrollTop / nativeBlankHeight;

    const blankHeight = this.verticalTrackHeight - this.verticalThumbHeight;
    return offset * blankHeight;
  }

  /**
   * 增加水平滚动指示器的位置
   * @param delta 增加的值
   */
  public plusHorizontalThumbPosition(delta: number) {
    this.horizontalThumbPosition += delta;
  }

  /**
   * 设置水平滚动指示器的位置
   */
  public set horizontalThumbPosition(thumbPosition: number) {
    const offset =
      thumbPosition / (this.horizontalTrackWidth - this.horizontalThumbWidth);
    const scrollLeft = offset * (this.scrollWidth - this.containerWidth);

    this.scrollLeft = scrollLeft;
  }

  /**
   * 增加垂直滚动指示器的位置
   * @param delta 增加的值
   */
  public plusVerticalThumbPosition(delta: number) {
    this.verticalThumbPosition += delta;
  }

  /**
   * 设置垂直滚动指示器的位置
   */
  public set verticalThumbPosition(thumbPosition: number) {
    const offset =
      thumbPosition / (this.verticalTrackHeight - this.verticalThumbHeight);
    const scrollTop = offset * (this.scrollHeight - this.containerHeight);

    this.scrollTop = scrollTop;
  }
}
