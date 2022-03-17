import { useDrag } from '@use-gesture/react';
import React, { useCallback, useEffect, useRef } from 'react';
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
import useMultiRefs from '../utils/useMultiRefs';
import ScrollContent from './ScrollContent';

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
  /**
   * 内容滚动时的回调函数
   */
  onScroll?: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
}

const preventEvent = (event: React.UIEvent) => {
  event.stopPropagation();
  event.preventDefault();
};

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
const Scrollbar = React.forwardRef<HTMLDivElement, Props>(
  ({ children, thumbMinSize = 20, style, className, onScroll }, ref) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useMultiRefs(scrollRef, ref);
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

    /**
     * 同步垂直滚动条位置
     */
    const syncScrollTop = useRafCallback(() => {
      const rect = scrollbarRectRef.current;
      const container = scrollRef.current;
      if (container) {
        container.scrollTop = rect.scrollTop;
      }
    });

    /**
     * 同步水平滚动条位置
     */
    const syncScrollLeft = useRafCallback(() => {
      const rect = scrollbarRectRef.current;
      const container = scrollRef.current;
      if (container) {
        container.scrollLeft = rect.scrollLeft;
      }
    });

    // 监听垂直滚动指示器的拖拽事件
    const verticalBind = useDrag(({ movement, first, memo }) => {
      const rect = scrollbarRectRef.current;
      if (first) {
        return rect.verticalThumbPosition;
      }
      const [, offsetY] = movement;
      rect.verticalThumbPosition = memo + offsetY;
      syncScrollTop();
      return memo;
    });

    // 监听水平滚动指示器的拖拽事件
    const horizontalBind = useDrag(({ movement, first, memo }) => {
      const rect = scrollbarRectRef.current;
      if (first) {
        return rect.horizontalThumbPosition;
      }
      const [offsetX] = movement;
      rect.horizontalThumbPosition = memo + offsetX;
      syncScrollLeft();
      return memo;
    });

    /**
     * 处理水平轨道点击事件
     * @param event 点击事件
     */
    const handleHorizontalTrackClick = (
      event: React.MouseEvent<HTMLDivElement>,
    ) => {
      const { left } = (event.target as HTMLElement).getBoundingClientRect();
      const positionX = event.clientX;
      const rect = scrollbarRectRef.current;
      const container = scrollRef.current;
      rect.horizontalThumbPosition =
        positionX - left - rect.horizontalThumbWidth / 2;
      if (container) {
        container.scrollLeft = rect.scrollLeft;
      }
    };

    /**
     * 处理垂直轨道点击事件
     * @param event 点击事件
     */
    const handleVerticalTrackClick = (
      event: React.MouseEvent<HTMLDivElement>,
    ) => {
      const { top } = (event.target as HTMLElement).getBoundingClientRect();
      const positionY = event.clientY;
      const rect = scrollbarRectRef.current;
      const container = scrollRef.current;
      rect.verticalThumbPosition =
        positionY - top - rect.verticalThumbHeight / 2;
      if (container) {
        container.scrollTop = rect.scrollTop;
      }
    };

    return (
      <ScrollbarContainner
        className={classnames('sinoui-scrollbar', className)}
        style={style}
      >
        <ScrollContent
          ref={contentRef}
          onScroll={onScroll}
          className="sinoui-scrollbar__content"
        >
          {children}
        </ScrollContent>
        <Track
          variant="horizontal"
          className="sinoui-scrollbar__horizontal-track"
          ref={horizontalTrackRef}
          onClick={handleHorizontalTrackClick}
        >
          <Thumb
            variant="horizontal"
            ref={horizontalBarRef}
            {...horizontalBind()}
            className="sinoui-scrollbar__horizontal-thumb"
            onClick={preventEvent}
          />
        </Track>
        <Track
          variant="vertical"
          className="sinoui-scrollbar__vertical-track"
          ref={verticalTrackRef}
          onClick={handleVerticalTrackClick}
        >
          <Thumb
            variant="vertical"
            ref={verticalBarRef}
            {...verticalBind()}
            className="sinoui-scrollbar__vertical-thumb"
            onClick={preventEvent}
          />
        </Track>
      </ScrollbarContainner>
    );
  },
);

export default Scrollbar;
