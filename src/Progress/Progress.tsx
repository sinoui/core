import React from 'react';
import LinearProgress from './LinearProgress';
import CircleProgress from './CircleProgress';
import CircleDeterminateProgress from './CircleDeterminateProgress';
import { ProgressPropsType } from './types';

/**
 *
 * 进度条组件
 *
 */

export default function Progress(props: ProgressPropsType) {
  const { linear, thickness = 4, determinate, ...rest } = props;
  const render = () => {
    if (linear) {
      return (
        <LinearProgress
          {...rest}
          thickness={thickness}
          determinate={determinate}
        />
      );
    }
    if (determinate) {
      return <CircleDeterminateProgress {...props} />;
    }
    return <CircleProgress {...props} />;
  };
  return render();
}
