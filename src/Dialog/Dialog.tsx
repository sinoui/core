import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import DialogTitle from '@sinoui/core/DialogTitle';
import DialogActions from '@sinoui/core/DialogActions';
import Modal from '@sinoui/core/Modal';
import DialogWrapper from './DialogWrapper';
import Iframe from './Iframe';

const ModalWrapper = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface DialogProps {
  /**
   * iframe的定位方式
   */
  absolute?: boolean;
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 是否全屏显示
   */
  fullScreen?: boolean;
  /**
   * 对话框将根据 maxWidth 的值进行自我调整
   */
  fullWidth?: boolean;
  /**
   * 添加自定义类名
   */
  className?: string;
  /**
   * 最大宽度
   */
  autoWidth?: boolean;
}

/**
 * 弹窗的根组件
 */
function Dialog(props: DialogProps) {
  const {
    children,
    absolute,
    fullScreen,
    fullWidth,
    className,
    autoWidth,
    backdropClick = true,
    ...rest
  } = props;

  /**
   * 获取Dialog子组件的排序号
   *
   * @param {Node} node
   */
  const getDialogNodeOrderNode = (node: React.ReactElement<any>) => {
    switch (node.type) {
      case DialogTitle:
        return 0;
      case DialogActions:
        return 2;
      default:
        return 1;
    }
  };

  const sortDialogChildren = (
    node1: React.ReactElement<any>,
    node2: React.ReactElement<any>,
  ) => {
    return getDialogNodeOrderNode(node1) - getDialogNodeOrderNode(node2);
  };

  const nodes = React.Children.toArray(children)
    .filter(Boolean)
    .sort(sortDialogChildren);

  return (
    <ModalWrapper {...rest} backdropClick={backdropClick}>
      <DialogWrapper
        fullScreen={fullScreen}
        fullWidth={fullWidth}
        className={classNames('sinoui-dialog', className)}
        autoWidth={autoWidth}
        {...props}
      >
        {nodes}
        <Iframe frameBorder={0} scrolling="false" absolute={absolute} />
      </DialogWrapper>
    </ModalWrapper>
  );
}

export default Dialog;
