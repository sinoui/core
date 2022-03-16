import { useDrag } from '@use-gesture/react';
import React, { useCallback, useEffect, useRef } from 'react';
import getScrollbarSize from 'dom-helpers/scrollbarSize';
import classnames from 'classnames';
import HorizontalContent from './HorizontalContent';
import HorizontalLayout from './HorizontalLayout';
import Layout from './Layout';
import VerticalContent from './VerticalContent';
import VerticalLayout from './VerticalLayout';
import ScrollbarRect from './ScrollbarRect';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import getInnerHeight from '../utils/getInnerHeight';
import getInnerWidth from '../utils/getInnerWidth';

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
    const scrollContainer = scrollRef.current;
    const scrollbarRect = scrollbarRectRef.current;
    const horizontalTrack = horizontalTrackRef.current;
    const verticalTrack = verticalTrackRef.current;
    if (scrollContainer && horizontalTrack && verticalTrack) {
      scrollbarRect.thumbMinSize = thumbMinSize;
      scrollbarRect.containerWidth = scrollContainer.clientWidth;
      scrollbarRect.containerHeight = scrollContainer.clientHeight;
      scrollbarRect.scrollWidth = scrollContainer.scrollWidth;
      scrollbarRect.scrollHeight = scrollContainer.scrollHeight;
      scrollbarRect.scrollTop = scrollContainer.scrollTop;
      scrollbarRect.scrollLeft = scrollContainer.scrollLeft;
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
  // TODO: 需要 debounce 保护
  const reflow = useCallback(() => {
    calcSize();
    layout();
  }, [calcSize, layout]);

  // 做初始布局
  useEnhancedEffect(() => {
    calcSize();
    layout();
  }, []);

  // 监听内容滚动事件
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', reflow);

      return () => scrollContainer.removeEventListener('scroll', reflow);
    }

    return undefined;
  }, [reflow]);

  // 监听 resize 事件
  useEffect(() => {
    window.addEventListener('resize', reflow);
    return () => window.removeEventListener('resize', reflow);
  }, [reflow]);

  // 监听垂直滚动指示器的拖拽事件
  const verticalBind = useDrag(({ delta }) => {
    const [, offsetY] = delta;
    const rect = scrollbarRectRef.current;
    const container = scrollRef.current;
    rect.plusVerticalThumbPosition(offsetY);
    // TODO: 需要 debounce 保护
    if (container) {
      container.scrollTop = rect.scrollTop;
    }
  });

  // 监听水平滚动指示器的拖拽事件
  const horizontalBind = useDrag(({ delta }) => {
    const [offsetX] = delta;
    const rect = scrollbarRectRef.current;
    const container = scrollRef.current;
    rect.plusHorizontalThumbPosition(offsetX);
    if (container) {
      // TODO: 需要 debounce 保护
      container.scrollLeft = rect.scrollLeft;
    }
  });

  const nativeScrollBarSize = getScrollbarSize();

  return (
    <Layout className={classnames('sinoui-scrollbar', className)} style={style}>
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
      <HorizontalLayout
        className="sinoui-scrollbar__horizontal-track"
        ref={horizontalTrackRef}
      >
        <HorizontalContent
          ref={horizontalBarRef}
          {...horizontalBind()}
          className="sinoui-scrollbar__horizontal-thumb"
        />
      </HorizontalLayout>
      <VerticalLayout
        className="sinoui-scrollbar__vertical-track"
        ref={verticalTrackRef}
      >
        <VerticalContent
          ref={verticalBarRef}
          {...verticalBind()}
          className="sinoui-scrollbar__vertical-thumb"
        />
      </VerticalLayout>
    </Layout>
  );
}
