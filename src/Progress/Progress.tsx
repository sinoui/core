import CircleDeterminateProgress from './CircleDeterminateProgress';
import CircleProgress from './CircleProgress';
import LinearProgress from './LinearProgress';
import type { ProgressPropsType } from './types';

/**
 * 进度条组件
 *
 * @param props 组件属性
 */
const Progress: React.FC<ProgressPropsType> = (props) => {
  const { linear, thickness = 4, determinate, ...rest } = props;
  const render = () => {
    if (linear) {
      return (
        <LinearProgress
          {...rest}
          thickness={thickness}
          determinate={determinate || props.buffer}
        />
      );
    }
    if (determinate) {
      return <CircleDeterminateProgress {...props} />;
    }
    return <CircleProgress {...props} />;
  };
  return render();
};

export default Progress;
