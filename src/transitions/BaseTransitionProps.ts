import type {
  TransitionProps,
  TransitionActions,
} from 'react-transition-group/Transition';

type TransitionKeys =
  | 'in'
  | 'mountOnEnter'
  | 'unmountOnExit'
  | 'onEnter'
  | 'onEntering'
  | 'onEntered'
  | 'onExit'
  | 'onExiting'
  | 'onExited'
  | 'timeout'
  | 'addEndListener';

/**
 * 基础的过度组件属性
 */
export default interface BaseTransitionProps
  extends TransitionActions,
    Partial<Pick<TransitionProps, TransitionKeys>> {
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactElement;
}
