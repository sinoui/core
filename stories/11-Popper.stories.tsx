import React, { useState, useRef } from 'react';
import Popper from '@sinoui/core/Popper';
import Paper from '@sinoui/core/Paper';
import styled, { css } from 'styled-components';
import Collapse from '@sinoui/core/Collapse';
import Grow from '@sinoui/core/Grow';
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
  pointer-events: none;
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
      <Popper open={isShow} referenceElement={buttonRef} modifiers={modifiers}>
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
