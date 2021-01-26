import React, { useState, useRef, useEffect } from 'react';
import Popper from '@sinoui/core/Popper';
import Paper from '@sinoui/core/Paper';
import styled, { css } from 'styled-components';
import Collapse from '@sinoui/core/Collapse';
import Grow from '@sinoui/core/Grow';
import { Modifier } from '@popperjs/core';
import TextInput from '@sinoui/core/TextInput';
import Modal from '@sinoui/core/Modal';
import { defaultTheme } from '@sinoui/theme';
import StoryLayout from './StoryLayout';
import { Button } from '../src';

export default {
  title: 'Popper',
};

const TooltipContent = styled(Paper)`
  padding: 8px;
  margin: 2px;
`;

const Demo1 = () => {
  const [isShow, setIsShow] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <StoryLayout>
      <Button raised onClick={() => setIsShow(!isShow)} ref={buttonRef}>
        切换提示
      </Button>
      <Popper open={isShow} referenceElement={buttonRef}>
        <TooltipContent>这是弹出的提示内容</TooltipContent>
      </Popper>
    </StoryLayout>
  );
};

export const 弹出提示 = () => <Demo1 />;

const Demo2 = () => {
  const [isShow, setIsShow] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <StoryLayout>
      <Button raised onClick={() => setIsShow(!isShow)} ref={buttonRef}>
        切换提示
      </Button>
      <Popper open={isShow} referenceElement={buttonRef}>
        <Collapse in={isShow}>
          <TooltipContent>这是弹出的提示内容</TooltipContent>
        </Collapse>
      </Popper>
    </StoryLayout>
  );
};

export const 带动效的弹出提示 = () => <Demo2 />;

const Demo3 = () => {
  const [isShow, setIsShow] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <StoryLayout>
      <div
        style={{
          height: 500,
          width: 800,
          margin: '160px auto 0',
          overflow: 'auto',
          backgroundColor: 'white',
          border: '1px solid grey',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '250%',
            width: '250%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button raised onClick={() => setIsShow(!isShow)} ref={buttonRef}>
            切换提示
          </Button>
          <Popper open={isShow} referenceElement={buttonRef} placement="top">
            <Grow in={isShow}>
              <TooltipContent style={{ height: 100 }}>
                这是弹出的提示内容
              </TooltipContent>
            </Grow>
          </Popper>
        </div>
      </div>
    </StoryLayout>
  );
};

export const 滚动效果 = () => <Demo3 />;

const Arrow = styled.div`
  &,
  &::before {
    width: 10px;
    height: 10px;
    position: absolute;
    z-index: -1;
  }
  &::before {
    content: '';
    transform: rotate(45deg);
    background: #fff;
    top: 0;
    left: 0;
  }
`;

const Tooltip = styled.div<{ hide?: boolean }>`
  display: block;
  background: #fff;
  color: #642f45;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  text-align: left;
  max-height: 40vh;
  overflow: auto;
  ${({ hide }) =>
    hide &&
    css`
      &[data-popper-escaped] {
        opacity: 0.5;
      }
      &[data-popper-reference-hidden] {
        opacity: 0;
      }
    `}
  [data-popper-placement^='top'] > & > [data-popper-arrow] {
    bottom: -4px;
  }
  [data-popper-placement^='right'] > & > [data-popper-arrow] {
    left: -4px;
  }
  [data-popper-placement^='bottom'] > & > [data-popper-arrow] {
    top: -4px;
  }
  [data-popper-placement^='left'] > & > [data-popper-arrow] {
    right: -4px;
  }
  [data-small] {
    display: block;
  }
  [data-small] ~ *:not([data-small]) {
    display: none;
  }
`;

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

const Demo4 = () => {
  const [isShow, setIsShow] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <StoryLayout>
      <Button raised onClick={() => setIsShow(!isShow)} ref={buttonRef}>
        切换提示
      </Button>
      <Popper
        open={isShow}
        referenceElement={buttonRef}
        modifiers={modifiers}
        placement="right"
      >
        <Grow in={isShow}>
          <Tooltip>
            <Arrow data-popper-arrow />
            这是弹出的提示内容
          </Tooltip>
        </Grow>
      </Popper>
    </StoryLayout>
  );
};

export const 带箭头的提示 = () => <Demo4 />;

const C = styled.div`
  width: 834px;
  height: 100px;
  display: inline-block;
`;

const demo5Modifiers: Partial<Modifier<any, any>>[] = [
  {
    name: 'preventOverflow',
    options: {
      padding: 8,
    },
  },
];

const Demo5 = () => {
  const [isShow, setIsShow] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <StoryLayout>
      <C />
      <C />
      <C />
      <div />
      <Button raised onClick={() => setIsShow(!isShow)} ref={buttonRef}>
        切换提示
      </Button>
      <Popper
        open={isShow}
        referenceElement={buttonRef}
        portal
        modifiers={demo5Modifiers}
      >
        {(transitionProps) => (
          <Grow {...transitionProps}>
            <Tooltip className="tooltip">
              <div
                style={{
                  height: 200,
                }}
              >
                这是弹出的提示内容
              </div>
            </Tooltip>
          </Grow>
        )}
      </Popper>
    </StoryLayout>
  );
};

export const 验证在布局易变情况下的popper = () => <Demo5 />;

const demo6Modifiers: Partial<Modifier<any, any>>[] = [
  {
    name: 'sameWidth',
    phase: 'beforeWrite',
    enabled: true,
    fn({ state }) {
      const { width } = state.rects.reference;
      // eslint-disable-next-line no-param-reassign
      state.styles.popper.width = `${width}px`;
    },
  },
  {
    name: 'offset',
    options: {
      offset: [0, 4],
    },
  },
  {
    name: 'preventOverflow',
    options: {
      padding: 8,
    },
  },
];

const Demo6 = () => {
  const [isShow, setIsShow] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isShow) {
      const handleClick = (event: MouseEvent) => {
        const tooltip = tooltipRef.current;
        const input = inputRef.current;
        if (
          tooltip === event.target ||
          tooltip?.contains(event.target as HTMLElement) ||
          input === event.target ||
          input?.contains(event.target as HTMLElement)
        ) {
          return;
        }
        event.stopImmediatePropagation();
        event.stopPropagation();
        setIsShow(false);
      };

      document.addEventListener('click', handleClick, false);

      return () => document.removeEventListener('click', handleClick, false);
    }
    return undefined;
  }, [isShow]);

  return (
    <StoryLayout>
      <TextInput
        ref={inputRef}
        onClick={() => setIsShow(true)}
        variant="outlined"
        label="等宽"
        style={{ width: 250 }}
      />
      <Popper
        open={isShow}
        referenceElement={inputRef}
        modifiers={demo6Modifiers}
        ref={tooltipRef}
        role="presentation"
        onMouseDown={(event) => event.preventDefault()}
      >
        <Grow in={isShow}>
          <Tooltip className="tooltip" role="listbox">
            <div
              style={{
                height: 200,
              }}
              tabIndex={-1}
            >
              这是弹出的提示内容
            </div>
          </Tooltip>
        </Grow>
      </Popper>
    </StoryLayout>
  );
};

export const 等宽 = () => <Demo6 />;

class ClickManager {
  private listeners: Function[] = [];

  private handleClick = (event: MouseEvent) => {
    // eslint-disable-next-line no-unused-expressions
    this.listeners[this.listeners.length - 1]?.(event);
  };

  private listen() {
    document.addEventListener('click', this.handleClick, false);
  }

  public unListen() {
    document.removeEventListener('click', this.handleClick, false);
  }

  public add(listener: (event: MouseEvent) => void) {
    this.listeners.push(listener);
    if (this.listeners.length === 1) {
      this.listen();
    }
    return () => {
      this.listeners.splice(this.listeners.indexOf(listener), 1);
      if (this.listeners.length === 0) {
        this.unListen();
      }
    };
  }
}

const clickManager = new ClickManager();

const Demo7 = () => {
  const [isOutShow, setIsOutShow] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const outTooltipRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isShow) {
      const handleClick = (event: MouseEvent) => {
        const tooltip = tooltipRef.current;
        const input = inputRef.current;
        if (
          tooltip === event.target ||
          tooltip?.contains(event.target as HTMLElement) ||
          input === event.target ||
          input?.contains(event.target as HTMLElement)
        ) {
          return;
        }
        setIsShow(false);
      };

      return clickManager.add(handleClick);
    }
    return undefined;
  }, [isShow]);

  useEffect(() => {
    if (isOutShow) {
      const handleClick = (event: MouseEvent) => {
        const outTooltip = outTooltipRef.current;
        const button = buttonRef.current;
        if (
          outTooltip === event.target ||
          outTooltip?.contains(event.target as HTMLElement) ||
          button === event.target ||
          button?.contains(event.target as HTMLElement)
        ) {
          return;
        }
        setIsOutShow(false);
      };

      return clickManager.add(handleClick);
    }
    return undefined;
  }, [isOutShow]);

  return (
    <StoryLayout>
      <Button ref={buttonRef} onClick={() => setIsOutShow(true)}>
        打开
      </Button>
      <Popper open={isOutShow} referenceElement={buttonRef} ref={outTooltipRef}>
        <TextInput
          ref={inputRef}
          onClick={() => setIsShow(true)}
          variant="outlined"
          label="等宽"
          style={{ width: 250 }}
        />
        <Popper
          open={isShow}
          referenceElement={inputRef}
          modifiers={demo6Modifiers}
          ref={tooltipRef}
          role="presentation"
          onMouseDown={(event) => event.preventDefault()}
        >
          <Grow in={isShow}>
            <Tooltip className="tooltip" role="listbox">
              <div
                style={{
                  height: 200,
                }}
                tabIndex={-1}
              >
                这是弹出的提示内容
              </div>
            </Tooltip>
          </Grow>
        </Popper>
      </Popper>
    </StoryLayout>
  );
};

export const 双弹出层 = () => <Demo7 />;

const PopperOverModalDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>展现模态框</Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} center>
        <Paper style={{ width: 500, height: 200 }}>
          <Button ref={buttonRef} onClick={() => setIsPopperOpen(true)}>
            展开弹层
          </Button>
          <Popper
            open={isPopperOpen}
            referenceElement={buttonRef}
            placement="bottom-start"
          >
            <TextInput autoFocus onBlur={() => setIsPopperOpen(false)} />
            <Button onClick={() => setIsPopperOpen(false)}>关闭弹层</Button>
          </Popper>
        </Paper>
      </Modal>
    </div>
  );
};

export const 在模态框上的弹层 = () => (
  <StoryLayout>
    <PopperOverModalDemo />
  </StoryLayout>
);
