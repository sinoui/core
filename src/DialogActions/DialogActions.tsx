import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';

const columnLayout = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0px 8px 8px 0px;
  & .sinoui-button {
    margin: 0;
  }
`;

const defaultLayout = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  & .sinoui-button {
    margin: 8px 0;
    margin-right: 8px;
  }
`;

const DialogActionsWrapper = styled.div.attrs(({ className }) => ({
  className: classNames('sinoui-dialog-actions', className),
}))<{ column?: boolean }>`
  min-height: 52px;
  flex: 0 0 auto;
  ${(props) => (props.column ? columnLayout : defaultLayout)};
  & .sinoui-button {
    min-width: auto;
    padding: 0px 8px;
  }
`;

export interface Props {
  /**
   * 是否垂直显示
   */
  column?: boolean;
  /**
   * 子元素
   */
  children?: React.ReactNode | any;
  /**
   * 添加自定义类名
   */
  className?: string;
}

/**
 * 弹窗按钮组件
 */
function DialogActions(props: Props) {
  const { children, column } = props;
  return (
    <DialogActionsWrapper column={column}>
      {React.Children.map(
        children,
        (child: React.ReactElement<{ color?: string }>) => {
          return React.isValidElement(child)
            ? React.cloneElement(child, {
                color: child.props.color || 'primary',
              })
            : child;
        },
      )}
    </DialogActionsWrapper>
  );
}

export default DialogActions;
