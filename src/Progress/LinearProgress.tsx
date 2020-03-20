import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';
import { lighten } from 'polished';
import { ProgressPropsType } from './types';
import {
  inDeterminatePrimaryBarKeyFrames,
  inDeterminatePrimaryBarInnerKeyFrames,
  inDeterminateSecondaryBarKeyFrames,
  inDeterminateSecondaryBarInnerKeyFrames,
} from './LinearKeyframes';

/**
 * 线性进度条不定量样式
 */
const inDeterminateStyle = css`
  & .sinoui-progress--linear__primary-bar {
    left: -145.166611%;
    animation: ${inDeterminatePrimaryBarKeyFrames} 2s infinite linear;
  }

  & .sinoui-progress--linear__bar-inner {
    animation: ${inDeterminatePrimaryBarInnerKeyFrames} 2s infinite linear;
  }

  & .sinoui-progress--linear__secondary-bar {
    left: -54.888891%;
    animation: ${inDeterminateSecondaryBarKeyFrames} 2s infinite linear;
    > .sinoui-progress--linear__bar-inner {
      animation: ${inDeterminateSecondaryBarInnerKeyFrames} 2s infinite linear;
    }
  }
`;

/**
 * 非缓冲线性定量进度条
 */
const normalDeterminateStyle = css<ProgressPropsType>`
  &
    .sinoui-progress--linear__primary-bar
    > .sinoui-progress--linear__bar-inner {
    left: -100%;
    transform: translateX(${(props) => `${props.value}%`});
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.6, 1);
  }
`;
const Wrapper = styled.div.attrs((props: ProgressPropsType) => ({
  className: classNames('sinoui-progress', 'sinoui-progress--linear', {
    'sinoui-progress--linear--indeterminate': props.determinate,
  }),
}))<ProgressPropsType>`
  position: relative;
  width: 100%;
  height: ${(props) => props.thickness}px;
  transform: translateZ(0);
  outline: 1px solid transparent;
  overflow: hidden;
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.6, 1) 0ms;

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
    transform-origin: top left;
  }

  & .sinoui-progress--linear__bar-inner {
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
    background-color: ${({ color = 'primary', theme }) =>
      getColorFromTheme(theme, color)};
  }

  ${({ determinate }) => !determinate && inDeterminateStyle};
  ${({ determinate, buffer }) =>
    determinate && !buffer && normalDeterminateStyle};
`;

export default function LinearProgress(props: ProgressPropsType) {
  const { determinate } = props;
  return (
    <Wrapper {...props}>
      <div className="sinoui-progress--linear__buffer" />
      <div
        className={classNames(
          'sinoui-progress--linear__bar',
          'sinoui-progress--linear__primary-bar',
        )}
      >
        <span className="sinoui-progress--linear__bar-inner" />
      </div>
      {!determinate && (
        <div className="sinoui-progress--linear__bar sinoui-progress--linear__secondary-bar">
          <span className="sinoui-progress--linear__bar-inner" />
        </div>
      )}
    </Wrapper>
  );
}
