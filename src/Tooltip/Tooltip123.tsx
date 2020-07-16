import React, { useRef, useState, useEffect, useMemo } from 'react';
import type { Placement } from '@popperjs/core';
import classNames from 'classnames';
import Popper from '@sinoui/core/Popper';
import Grow from '@sinoui/core/Grow';
import TooltipContent from './TooltipContent';
import Arrow from './Arrow';

interface ToolTipProps {
  /**
   * 是否显示箭头 不传该属性时 移动端不显示箭头  pc端显示
   */
  arrow?: boolean;
  /**
   * 提示文字
   */
  title: string;
  /**
   * 触发事件
   */
  trigger?: 'hover' | 'focus' | 'click';
  /**
   * 提示框位置
   */
  placement?: Placement;
  /**
   * 子元素
   */
  children: React.ReactElement;
  /**
   * 过渡动画
   */
  transitionComponent?: React.ReactType;
  /**
   * 是否是移动端
   */
  isMobile?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const modifiers = [
  {
    name: 'arrow',
    enable: true,
    options: {
      padding: 5, // 5px from the edges of the popper
    },
  },
  {
    name: 'offset',
    options: {
      offset: [0, 10],
    },
  },
];

/**
 *
 * 信息提示组件
 */
export default function Tooltip({
  title,
  children,
  trigger = 'click',
  arrow,
  isMobile,
  transitionComponent = Grow,
  className,
  style,
  ...rest
}: ToolTipProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const documentClick = () => {
      setOpen(false);
    };
    if (trigger === 'click' && !isMobile) {
      document.addEventListener('click', documentClick, false);
      return () => {
        document.removeEventListener('click', documentClick, false);
      };
    }

    if (trigger === 'click' && isMobile) {
      document.addEventListener('touchstart', documentClick, false);
      return () => {
        document.removeEventListener('touchstart', documentClick, false);
      };
    }
    return undefined;
  }, [isMobile, trigger]);

  const onTriggerClick = (event: any) => {
    setOpen(true);
    event.nativeEvent.stopImmediatePropagation();
  };

  const onTrigger = () => {
    switch (trigger) {
      case 'hover':
        return {
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
        };
      case 'click':
        if (isMobile) {
          return {
            onTouchStart: (e: MouseEvent) => onTriggerClick(e),
          };
        }
        return {
          onClick: (e: MouseEvent) => onTriggerClick(e),
        };
      case 'focus':
        return {
          onFocus: () => setOpen(true),
          onBlur: () => setOpen(false),
        };
      default:
        return {};
    }
  };

  /**
   * 如果arrow属性为undefined 时 ,pc端显示箭头 移动端不显示
   */
  const isShowArrow = useMemo(
    () => arrow === true || (arrow === undefined && !isMobile),
    [arrow, isMobile],
  );

  const TransitionComp = transitionComponent;
  return (
    <>
      {React.cloneElement(React.Children.only(children), {
        ...onTrigger(),
        ref: triggerRef,
      })}
      <Popper
        open={open}
        referenceElement={triggerRef}
        modifiers={modifiers}
        {...rest}
      >
        <TransitionComp in={open}>
          <TooltipContent
            className={classNames('sinoui-tooltip', className)}
            style={style}
          >
            {isShowArrow && <Arrow data-popper-arrow />}
            {title}
          </TooltipContent>
        </TransitionComp>
      </Popper>
    </>
  );
}
