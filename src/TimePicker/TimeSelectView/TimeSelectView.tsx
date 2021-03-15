import React, { useRef, useImperativeHandle } from 'react';
import useEventCallback from '@sinoui/core/utils/useEventCallback';
import useEnhancedEffect from '@sinoui/core/utils/useEnhancedEffect';
import TimeSelectViewWrapper from './TimeSelectViewWrapper';
import TimeList from '../TimeList';
import { TimeListRef } from '../TimeList/TimeList';

export interface Props {
  /**
   * 选中的小时数。默认为当前时间的小时数。
   */
  hour?: number;
  /**
   * 选中的分钟。默认为当前时间的分钟数。
   */
  minute?: number;
  /**
   * 最小小时数。默认为`0`。
   */
  minHour?: number;
  /**
   * 最大小时数。默认为`23`。
   */
  maxHour?: number;
  /**
   * 最小分钟数。默认为`0`。
   */
  minMinute?: number;
  /**
   * 最大分钟数。默认为`59`。
   */
  maxMinute?: number;
  /**
   * 值变更
   */
  onChange?: (hour: number, minute: number) => void;
  /**
   * 添加失去焦点事件的回调函数
   */
  onBlur?: () => void;
  /**
   * 小时间隔
   */
  hourStep?: number;
  /**
   * 分钟间隔
   */
  minuteStep?: number;
  /**
   * 是否自动聚焦
   */
  autoFocus?: boolean;
  /**
   * 指定自定义样式类名
   */
  className?: string;
  /**
   * 指定自定义样式
   */
  style?: React.CSSProperties;
}

export interface TimeSelectViewRef {
  focus(): void;
}

/**
 * 时间视图
 */
const TimeSelectView = React.forwardRef<TimeSelectViewRef, Props>(
  function TimeSelectView(props, ref) {
    const now = new Date();
    const {
      hourStep = 1,
      minuteStep = 1,
      hour = now.getHours() - (now.getHours() % hourStep),
      minute = now.getMinutes() - (now.getMinutes() % minuteStep),
      minHour = 0,
      maxHour = 23,
      minMinute = 0,
      maxMinute = 59,
      onChange,
      autoFocus,
      onBlur,
      ...rest
    } = props;
    const hourRef = useRef<TimeListRef>(null);
    const minuteRef = useRef<TimeListRef>(null);
    const focusedListRef = useRef(hourRef);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        focus() {
          const list = focusedListRef.current.current;

          if (list) {
            list.focus();
          }
        },
      }),
      [],
    );

    useEnhancedEffect(() => {
      const hourList = hourRef.current;
      if (hourList && autoFocus) {
        hourList.focus();
      }
    }, [autoFocus]);

    /**
     * 处理小时变更事件
     */
    const handleHourChange = useEventCallback((newHour: number) => {
      if (onChange) {
        onChange(newHour, minute);
      }
    });

    /**
     * 处理分钟变更事件
     */
    const handleMinuteChange = useEventCallback((newMinute: number) => {
      if (onChange) {
        onChange(hour, newMinute);
      }
    });

    /**
     * 处理键盘事件
     *
     * @param event 键盘事件
     */
    const handleKeyDown = (event: React.KeyboardEvent) => {
      const { key } = event;

      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        event.preventDefault();
        if (key === 'ArrowLeft') {
          focusedListRef.current = hourRef;
        } else if (key === 'ArrowRight') {
          focusedListRef.current = minuteRef;
        }
        const list = focusedListRef.current.current;
        if (list) {
          list.focus();
        }
      }
    };

    /**
     * 处理失去焦点事件
     *
     * @param event 失去焦点事件
     */
    const handleBlur = (event: React.FocusEvent) => {
      event.stopPropagation();

      setTimeout(() => {
        const wrapper = wrapperRef.current;
        if (wrapper && !wrapper.contains(document.activeElement)) {
          if (onBlur) {
            onBlur();
          }
        }
      });
    };

    return (
      <TimeSelectViewWrapper
        className="sinoui-time-select-view"
        {...rest}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        ref={wrapperRef}
      >
        <TimeList
          className="sinoui-time-select-view__hour-list"
          start={minHour}
          end={maxHour}
          selected={hour}
          onChange={handleHourChange}
          step={hourStep}
          ref={hourRef}
        />
        <TimeList
          className="sinoui-time-select-view__minute-list"
          start={minMinute}
          end={maxMinute}
          selected={minute}
          onChange={handleMinuteChange}
          step={minuteStep}
          ref={minuteRef}
        />
      </TimeSelectViewWrapper>
    );
  },
);

export default TimeSelectView;
