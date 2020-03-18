import React from 'react';
import IconButton from '@sinoui/core/IconButton';
import SvgIcon from '@sinoui/core/SvgIcon';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import classNames from 'classnames';

export interface CloseIconProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconButtonWrapper = styled(IconButton)`
  color: currentColor;
  position: absolute !important;
  top: 0;
  right: 0;

  :hover {
    color: white;
    transition: color 300ms;
    transition: background 300ms;
  }
`;

/**
 * 关闭按钮组件
 *
 * @export
 * @param {CloseIconProps} props
 * @returns
 */
export default function CloseIcon(props: CloseIconProps) {
  const { onClick } = props;
  return (
    <IconButtonWrapper
      onClick={onClick}
      className={classNames('sinoui-dialog-title__icon')}
    >
      <SvgIcon as={MdClose} />
    </IconButtonWrapper>
  );
}
