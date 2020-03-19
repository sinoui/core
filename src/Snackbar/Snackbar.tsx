import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import IconButton from '@sinoui/core/IconButton';
import Close from '@sinoui/icons/Close';
import { Theme } from '@sinoui/theme';
import { CSSTransition } from 'react-transition-group';
import { SNACKBAR_BACKGROUND } from './constants';
/**
 * Snackbar 屏幕底端消息条
 */

interface SnackbarProps {
  /**
   * 设置为true  消息条可见
   */
  open?: boolean;
  /**
   * 消息条显示时长
   */
  duration?: number;
  /**
   * 可选操作
   */
  action?: React.ReactNode;
  /**
   * 消息文本
   */
  message: string;
  /**
   * 消息条被关闭的回调函数
   */
  onClose?: () => void;
  stacked?: boolean;
  /**
   * 在宽屏下 leadding设置为true  消息条居左显示
   */
  leading?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * 操作区域换行样式
 */
const stackStyle = css`
  && > .sinoui-snackbar__surface {
    flex-direction: column;
  }

  && .sinoui-snackbar__label {
    width: 100%;
  }
  && .sinoui-snackbar__actions {
    width: 100%;
    justify-content: flex-end;
    margin-bottom: 6px;
  }
`;

const leadingStyle = css`
  justify-content: flex-start;
`;

const snackbarStyle = css`
  position: fixed;
  display: flex;
  z-index: ${({ theme }) => theme.zIndex.snackbar};
  right: 0;
  bottom: 0;
  left: 0;
  margin: 8px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  & .sinoui-snackbar__surface {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    min-width: 344px;
    max-width: 672px;
    transform: scale(0.8);
    opacity: 0;
    border-radius: 4px;
    box-shadow: ${({ theme }) => theme.shadows[6]};
    color: ${(props) => props.theme.palette.primary.contrastText};
    background-color: ${SNACKBAR_BACKGROUND};
    transition: ${({
      theme: {
        transitions: { create, easing, duration },
      },
    }) =>
      create(['opacity', 'transform'], {
        duration: duration.shortest,
        easing: easing.easeInOut,
      })};

    &.sinoui-snackbar--enter-active,
    &.sinoui-snackbar--enter-done {
      opacity: 1;
      transform: scale(1);
    }

    .sinoui-snackbar--exit-active {
      opacity: 0;
      transform: scale(0.9);
    }
  }

  & .sinoui-snackbar__label {
    padding: 14px 16px;
    flex-grow: 1;
    box-sizing: border-box;
    ${(props) => ({ ...props.theme.typography.body2 })}
  }

  & .sinoui-snackbar__actions {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    box-sizing: border-box;
    padding-right: 8px;

    & .sinoui-svg-icon {
      font-size: 18px;
    }

    & .sinoui-snackbar__action + .sinoui-snackbar__dismiss {
      margin-left: 8px;
    }
  }
`;

const DismissIconButton = styled(IconButton)`
  color: currentColor;
`;

const SnackbarWrapper = styled.div.attrs((props: SnackbarProps) => ({
  className: classNames('sinoui-snackbar', {
    'sinoui-snackbar--open': props.open,
    'sinoui-snackbar--stacked': props.stacked,
    'sinoui-snackbar--leading': props.leading,
  }),
}))<
  { open?: boolean; stacked?: boolean; leading?: boolean } & {
    theme: Theme;
  }
>`
  ${snackbarStyle};
  ${(props) => props.stacked && stackStyle}
  ${(props) => props.leading && leadingStyle}
`;

export default function Snackbar(props: SnackbarProps) {
  const {
    open,
    leading,
    stacked,
    message,
    duration = 5000,
    action,
    onClose,
    ...rest
  } = props;

  useEffect(() => {
    let timer: any;
    if (open && duration !== -1 && onClose) {
      timer = setTimeout(() => {
        onClose();
      }, duration);
    }

    return () => clearTimeout(timer as any);
  }, [duration, onClose, open]);

  return (
    <SnackbarWrapper stacked={stacked} open={open} leading={leading} {...rest}>
      <CSSTransition
        in={open}
        timeout={150}
        unmountOnExit
        classNames="sinoui-snackbar-"
      >
        <div className="sinoui-snackbar__surface">
          <div className="sinoui-snackbar__label">{message}</div>
          <div className="sinoui-snackbar__actions">
            {action && <div className="sinoui-snackbar__action">{action}</div>}
            <div className="sinoui-snackbar__dismiss">
              <DismissIconButton onClick={onClose}>
                <Close />
              </DismissIconButton>
            </div>
          </div>
        </div>
      </CSSTransition>
    </SnackbarWrapper>
  );
}
