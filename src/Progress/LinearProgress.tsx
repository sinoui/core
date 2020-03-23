import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';
import { lighten } from 'polished';
import { ProgressPropsType } from './types';
import {
  inDeterminatePrimaryBarKeyFrames,
  inDeterminateSecondaryBarKeyFrames,
  determinateBuefferDotKeyframes,
} from './LinearKeyframes';

/**
 * 线性进度条不定量样式
 */
const inDeterminateStyle = css`
  & .sinoui-progress--linear__primary-bar {
    width: 100%;
    animation: ${inDeterminatePrimaryBarKeyFrames} 2.1s
      cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  }
  & .sinoui-progress--linear__secondary-bar {
    width: 100%;
    animation: ${inDeterminateSecondaryBarKeyFrames} 2.1s
      cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
  }
`;

/**
 * 非缓冲线性定量进度条
 */
const normalDeterminateStyle = css<ProgressPropsType>`
  & .sinoui-progress--linear__primary-bar {
    width: 100%;
    left: -100%;
    transform: translateX(${(props) => `${props.value}%`});
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.6, 1);
  }
`;

/**
 * 线性缓冲样式
 */
const bufferStyle = css<ProgressPropsType>`
  background-color: transparent;
  & .sinoui-progress--linear__buffer-dots {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: 10px 10px;
    background-position: 0 -23px;
    background-image: radial-gradient(
      ${({ color = 'primary', theme }) =>
          lighten(0.26, getColorFromTheme(theme, color))}
        0%,
      ${({ color = 'primary', theme }) =>
          lighten(0.26, getColorFromTheme(theme, color))}
        16%,
      transparent 42%
    );
    animation: ${determinateBuefferDotKeyframes} 3s infinite linear;
  }

  & .sinoui-progress--linear__secondary-bar {
    transform: translateX(${({ bufferValue = 0 }) => `${bufferValue}%`});
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.6, 1);
    background-color: ${({ color = 'primary', theme }) =>
      lighten(0.26, getColorFromTheme(theme, color))};
  }

  & .sinoui-progress--linear__primary-bar {
    transform: translateX(${({ value = 0 }) => `${value}%`});
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.6, 1);
    z-index: 1;
  }
`;

const Wrapper = styled.div<ProgressPropsType>`
  position: relative;
  width: 100%;
  height: ${(props) => props.thickness}px;
  background-color: ${({ color = 'primary', theme }) =>
    lighten(0.26, getColorFromTheme(theme, color))};
  overflow: hidden;

  & .sinoui-progress--linear__buffer {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: top left;
    background-color: ${({ color = 'primary', theme }) =>
      lighten(0.26, getColorFromTheme(theme, color))};
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  }

  & .sinoui-progress--linear__bar {
    position: absolute;
    width: 100%;
    height: 100%;
    left: -100%;
    top: 0;
    transform-origin: top left;
    background-color: ${({ color = 'primary', theme }) =>
      getColorFromTheme(theme, color)};
    transition: transform 0.2s linear;
  }

  ${({ determinate }) => !determinate && inDeterminateStyle};
  ${({ determinate, buffer }) =>
    determinate && !buffer && normalDeterminateStyle};
  ${({ determinate, buffer }) => determinate && buffer && bufferStyle};
`;

/**
 * 线性指示器
 */
export default function LinearProgress(props: ProgressPropsType) {
  const { determinate, className, buffer } = props;
  return (
    <Wrapper
      {...props}
      className={classNames(
        'sinoui-progress',
        'sinoui-progress--linear',
        { 'sinoui-progress--buffer': buffer },
        className,
      )}
    >
      {buffer && <div className="sinoui-progress--linear__buffer-dots" />}
      <div className="sinoui-progress--linear__bar sinoui-progress--linear__primary-bar" />
      {(!determinate || buffer) && (
        <div className="sinoui-progress--linear__bar sinoui-progress--linear__secondary-bar" />
      )}
    </Wrapper>
  );
}
