import React, { useCallback, useRef, useImperativeHandle } from 'react';
import { FixedSizeList as List } from 'react-window';
import getScrollbarSize from 'dom-helpers/scrollbarSize';
import useEventCallback from '@sinoui/core/utils/useEventCallback';
import TimeListWrapper from './TimeListWrapper';
import TimeItem from './TimeItem';
import {
  TIME_ITEM_WIDTH,
  TIME_LIST_HEIGHT,
  TIME_ITEM_COUNT,
  TIME_ITEM_HEIGHT,
} from '../constants';

export interface Props {
  /**
   * 开始数字
   */
  start: number;
  /**
   * 结束数字
   */
  end: number;
  /**
   * 选中的数字
   */
  selected: number;
  /**
   * 间隔
   */
  step?: number;
  /**
   * 值变更的回调函数。
   */
  onChange?: (value: number) => void;
  /**
   * 设置自定义的css类名
   */
  className?: string;
  /**
   * 设置自定义的css样式
   */
  style?: React.CSSProperties;
}

export interface TimeListRef {
  focus: () => void;
}

/**
 * 时间选项列表
 */
export default React.forwardRef<TimeListRef, Props>(function TimeList(
  props,
  ref,
) {
  const { start, end, selected, step = 1, onChange, ...rest } = props;
  const listRef = useRef<List>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const count = (end + 1 - start) / step;
  const selectedItemIndex = useRef(
    Math.ceil(
      TIME_ITEM_COUNT / 2 -
        ((TIME_ITEM_COUNT / 2) % count) +
        Math.ceil((selected - start) / step),
    ),
  );

  const indexToValue = useCallback(
    (index: number) => start + (index % count) * step,
    [count, step, start],
  );

  /**
   * 聚焦时间选项
   */
  const focusTimeItem = useEventCallback((index: number) => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      const timeItem = wrapper.querySelector(
        `[data-index="${index}"]`,
      ) as HTMLElement | null;
      if (timeItem) {
        timeItem.focus();
      }
    }
  });

  useImperativeHandle(ref, () => ({
    focus: () => {
      focusTimeItem(selectedItemIndex.current);
    },
  }));

  /**
   * 选择时间选项
   */
  const selectTimeItem = useEventCallback((newIndex: number) => {
    if (onChange) {
      onChange(indexToValue(newIndex));
    }
    selectedItemIndex.current = newIndex;
    const list = listRef.current;
    if (!list) {
      return;
    }
    list.scrollToItem(newIndex, 'auto');

    focusTimeItem(newIndex);
  });

  /**
   * 处理方向键导航
   */
  const handleKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    const { key } = event;
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      event.preventDefault();
      const delta = key === 'ArrowDown' ? 1 : -1;
      selectTimeItem(selectedItemIndex.current + delta);
    }
  });

  /**
   * 准备选项数据的函数
   */
  const itemData = useCallback(
    (index: number) => {
      const timeValue = indexToValue(index);
      return {
        selected: selected === timeValue,
        timeValue,
        onClick: selectTimeItem,
      };
    },
    [indexToValue, selected, selectTimeItem],
  );

  return (
    <TimeListWrapper
      className="sinoui-time-list"
      {...rest}
      ref={wrapperRef}
      onKeyDown={handleKeyDown}
    >
      <List
        width={getScrollbarSize() + TIME_ITEM_WIDTH}
        height={TIME_LIST_HEIGHT}
        itemCount={TIME_ITEM_COUNT}
        itemSize={TIME_ITEM_HEIGHT}
        initialScrollOffset={selectedItemIndex.current * TIME_ITEM_HEIGHT}
        itemData={itemData}
        ref={listRef}
      >
        {TimeItem}
      </List>
    </TimeListWrapper>
  );
});
