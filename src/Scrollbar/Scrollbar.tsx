import { useDrag } from '@use-gesture/react';
import React, { useCallback, useEffect, useRef } from 'react';
import getScrollbarSize from 'dom-helpers/scrollbarSize';
import classnames from 'classnames';
import HorizontalContent from './HorizontalContent';
import HorizontalLayout from './HorizontalLayout';
import Layout from './Layout';
import VerticalContent from './VerticalContent';
import VerticalLayout from './VerticalLayout';

export interface Props {
  children: React.ReactNode;
  /**
   * 自定义class名称
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

export default function Scrollbar({ children, className, style }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const verticalBarRef = useRef<HTMLDivElement | null>(null);
  const horizontalBarRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (verticalBarRef.current) {
      verticalBarRef.current.style.transform = `translateY(${scrollRef.current?.scrollTop}px)`;
    }
    if (horizontalBarRef.current) {
      horizontalBarRef.current.style.transform = `translateX(${scrollRef.current?.scrollLeft}px)`;
    }
  }, []);

  const handleResize = () => {
    if (
      scrollRef.current &&
      verticalBarRef.current &&
      horizontalBarRef.current
    ) {
      const { clientHeight, scrollHeight, clientWidth, scrollWidth } =
        scrollRef.current;
      if (scrollHeight > clientHeight) {
        verticalBarRef.current.style.display = 'block';
      } else {
        verticalBarRef.current.style.display = 'none';
      }

      if (scrollWidth > clientWidth) {
        horizontalBarRef.current.style.display = 'block';
      } else {
        horizontalBarRef.current.style.display = 'none';
      }
    }
  };

  useEffect(() => {
    handleResize();
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);

      return () =>
        scrollRef.current?.removeEventListener('scroll', handleScroll);
    }

    return () => undefined;
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const verticalBind = useDrag(({ movement, initial }) => {
    const [, offsetY] = movement;
    const [initialX, initialY] = initial;
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: initialX, top: initialY + offsetY });
    }
  });

  const horizontalBind = useDrag(({ movement }) => {
    const [offsetX] = movement;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = offsetX;
    }
  });

  const scrollbarWidth = getScrollbarSize();

  return (
    <Layout className={classnames('sinoui-scrollbar', className)} style={style}>
      <div
        style={{
          inset: 0,
          marginRight: -scrollbarWidth,
          marginBottom: -scrollbarWidth,
          overflow: 'scroll',
          height: `calc(100% + ${scrollbarWidth}px)`,
          width: `calc(100% + ${scrollbarWidth}px)`,
        }}
        ref={scrollRef}
        className="sinoui-scrollbar__content"
      >
        {children}
      </div>
      <HorizontalLayout className="sinoui-scrollbar__horizontal-track">
        <HorizontalContent
          ref={horizontalBarRef}
          {...horizontalBind()}
          className="sinoui-scrollbar__horizontal-thumb"
        />
      </HorizontalLayout>
      <VerticalLayout className="sinoui-scrollbar__vertical-track">
        <VerticalContent
          ref={verticalBarRef}
          {...verticalBind()}
          className="sinoui-scrollbar__vertical-thumb"
        />
      </VerticalLayout>
    </Layout>
  );
}
