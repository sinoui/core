import React from 'react';
import IconButton from '@sinoui/core/IconButton';
import styled from 'styled-components';
import classNames from 'classnames';
import Close from '../svg-icons/Close';

export interface CloseIconProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconButtonWrapper = styled(IconButton)`
  position: absolute !important;
  top: 8px;
  right: 8px;
  color: ${(props) => props.theme.palette.text.secondary};
  padding: 12px;

  &:hover {
    transition: color 300ms;
    transition: background 300ms;

    @media (hover: none) {
      background-color: transparent;
    }
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
      <Close />
    </IconButtonWrapper>
  );
}
