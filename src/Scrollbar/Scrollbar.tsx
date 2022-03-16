import { useDrag } from '@use-gesture/react';
import React, { useCallback, useEffect, useRef } from 'react';
import getScrollbarSize from 'dom-helpers/scrollbarSize';
import classnames from 'classnames';
import ScrollbarContainner from './ScrollbarContainner';
import ScrollbarRect from './ScrollbarRect';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import getInnerHeight from '../utils/getInnerHeight';
import getInnerWidth from '../utils/getInnerWidth';
import useElementResize from '../utils/useElementResize';
import useChildrenChange from '../utils/useChildrenChange';
import useRafCallback from '../utils/useRafCallback';
import Track from './Track';
import Thumb from './Thumb';

export interface Props {
  children: React.ReactNode;
  /**
   * 自定义class名称
   */
  className?: string;
  /*
   * 最小滚动指示器的尺寸。默认为 20 px。
   */
  thumbMinSize?: number;
  /**
   * 给滚动容器添加的样式
   */
  style?: React.CSSProperties;
}

/**
 * 带有自定义滚动条的滚动容器。与 `<div style={{ overflow: 'auto' }} />` 效果是一致的。
 *
 * 示例：
 *
 * ```tsx
 * <Scrollbar style={{ height: 100 }}>这是一大段内容</Scrollbar>
 * ```
 *
 * 使用注意事项：
 *
 * * 如果不给 Scrollbar 限定高度（任何方式限定高度均可），则不会产生垂直滚动条
 */
export default function Scrollbar({
  children,
  thumbMinSize = 20,
  style,
  className,
}: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollbarRectRef = useRef<ScrollbarRect>(new ScrollbarRect());
  const verticalBarRef = useRef<HTMLDivElement | null>(null);
  const horizontalBarRef = useRef<HTMLDivElement | null>(null);
  const verticalTrackRef = useRef<HTMLDivElement | null>(null);
  const horizontalTrackRef = useRef<HTMLDivElement | null>(null);

  /**
   * 计算滚动容器尺寸
   */
  const calcSize = useCallback(() => {
    const scrollContent = scrollRef.current;
    const scrollbarRect = scrollbarRectRef.current;
    const horizontalTrack = horizontalTrackRef.current;
    const verticalTrack = verticalTrackRef.current;
    if (scrollContent && horizontalTrack && verticalTrack) {
      scrollbarRect.thumbMinSize = thumbMinSize;
      scrollbarRect.containerWidth = scrollContent.clientWidth;
      scrollbarRect.containerHeight = scrollContent.clientHeight;
      scrollbarRect.scrollWidth = scrollContent.scrollWidth;
      scrollbarRect.scrollHeight = scrollContent.scrollHeight;
      scrollbarRect.scrollTop = scrollContent.scrollTop;
      scrollbarRect.scrollLeft = scrollContent.scrollLeft;
      scrollbarRect.horizontalTrackWidth = getInnerWidth(horizontalTrack);
      scrollbarRect.verticalTrackHeight = getInnerHeight(verticalTrack);
    }
  }, [thumbMinSize]);

  /**
   * 布局滚动指示器
   */
  const layout = useCallback(() => {
    const rect = scrollbarRectRef.current;
    const verticalThumb = verticalBarRef.current;
    const horizontalThumb = horizontalBarRef.current;

    if (verticalThumb) {
      verticalThumb.style.display = rect.isVerticalScrollVisible()
        ? 'block'
        : 'none';
      verticalThumb.style.height = `${rect.verticalThumbHeight}px`;
      verticalThumb.style.transform = `translateY(${rect.verticalThumbPosition}px)`;
    }

    if (horizontalThumb) {
      horizontalThumb.style.display = rect.isHorizontalScrollVisible()
        ? 'block'
        : 'none';

      horizontalThumb.style.width = `${rect.horizontalThumbWidth}px`;
      horizontalThumb.style.transform = `translateX(${rect.horizontalThumbPosition}px)`;
    }
  }, []);

  /**
   * 重新排列滚动容器
   */
  const reflow = useCallback(() => {
    calcSize();
    layout();
  }, [calcSize, layout]);

  // 做初始布局
  useEnhancedEffect(reflow, [reflow]);

  // 监听 resize 事件
  useElementResize(scrollRef, reflow);

  // 监听内容变更
  useChildrenChange(scrollRef, reflow);

  // 监听内容滚动事件
  useEffect(() => {
    const scrollContent = scrollRef.current;
    if (scrollContent) {
      scrollContent.addEventListener('scroll', reflow);

      return () => scrollContent.removeEventListener('scroll', reflow);
    }

    return undefined;
  }, [reflow]);

  const handleVerticalDrag = useRafCallback((offsetY: number) => {
    const rect = scrollbarRectRef.current;
    const container = scrollRef.current;
    rect.plusVerticalThumbPosition(offsetY);
    if (container) {
      container.scrollTop = rect.scrollTop;
    }
  });
  // 监听垂直滚动指示器的拖拽事件
  const verticalBind = useDrag(({ delta }) => {
    const [, offsetY] = delta;
    handleVerticalDrag(offsetY);
  });

  const handleHorizontalDrag = useRafCallback((offsetX: number) => {
    const rect = scrollbarRectRef.current;
    const container = scrollRef.current;
    rect.plusHorizontalThumbPosition(offsetX);
    if (container) {
      container.scrollLeft = rect.scrollLeft;
    }
  });
  // 监听水平滚动指示器的拖拽事件
  const horizontalBind = useDrag(({ delta }) => {
    const [offsetX] = delta;
    handleHorizontalDrag(offsetX);
  });

  const nativeScrollBarSize = getScrollbarSize();

  return (
    <ScrollbarContainner
      className={classnames('sinoui-scrollbar', className)}
      style={style}
    >
      <div
        style={{
          inset: 0,
          marginRight: -nativeScrollBarSize,
          marginBottom: -nativeScrollBarSize,
          overflow: 'scroll',
          height: `calc(100% + ${nativeScrollBarSize}px)`,
          width: `calc(100% + ${nativeScrollBarSize}px)`,
        }}
        ref={scrollRef}
        className="sinoui-scrollbar__content"
      >
        {children}
      </div>
      <Track
        variant="horizontal"
        className="sinoui-scrollbar__horizontal-track"
        ref={horizontalTrackRef}
      >
        <Thumb
          variant="horizontal"
          ref={horizontalBarRef}
          {...horizontalBind()}
          className="sinoui-scrollbar__horizontal-thumb"
        />
      </Track>
      <Track
        variant="vertical"
        className="sinoui-scrollbar__vertical-track"
        ref={verticalTrackRef}
      >
        <Thumb
          variant="vertical"
          ref={verticalBarRef}
          {...verticalBind()}
          className="sinoui-scrollbar__vertical-thumb"
        />
      </Track>
    </ScrollbarContainner>
  );
}
