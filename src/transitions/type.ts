export interface BaseTransitionCompProps {
  appear?: boolean;
  in?: boolean;
  /**
   * 指定过渡时应用的css类名。
   */
  transitionClasses?:
    | string
    | {
        appear?: string;
        appearActive?: string;
        enter?: string;
        enterActive?: string;
        exit?: string;
        exitActive?: string;
      };
  onEnter?: (node: HTMLElement, isAccept: boolean) => void;
  onEntering?: (node: HTMLElement, isAccept: boolean) => void;
  onEntered?: (node: HTMLElement, isAccept: boolean) => void;
  onExit?: (node: HTMLElement) => void;
  onExiting?: (node: HTMLElement) => void;
  onExited?: (node: HTMLElement) => void;
}

export interface TransitionHandlers {
  /**
   * 在进入'entering'阶段之前调用的回调函数。
   *
   * @type {(node: HTMLElement, isAppearing: boolean) => void}
   */
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  /**
   * 在设置'entered'状态之后调用的回调函数。
   *
   * @type {(node: HTMLElement, isAppearing: boolean) => void}
   */
  onEntered?: (node: HTMLElement, isAppearing: boolean) => void;
  /**
   * 在设置'entering'状态之后调用的回调函数。
   *
   * @type {(node: HTMLElement, isAppearing: boolean) => void}
   */
  onEntering?: (node: HTMLElement, isAppearing: boolean) => void;
  /**
   * 在设置'exiting'状态之前调用的回调函数。
   *
   * @type {(node: HTMLElement) => void}
   */
  onExit?: (node: HTMLElement) => void;
  /**
   * 在设置'exited'状态之后调用的回调函数。
   *
   * @type {(node: HTMLElement) => void}
   */
  onExited?: (node: HTMLElement) => void;
  /**
   * 在设置'exiting'状态之后调用的回调函数。
   *
   * @type {(node: HTMLElement) => void}
   */
  onExiting?: (node: HTMLElement) => void;
}
