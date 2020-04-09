import React, { useMemo } from 'react';
import styled from 'styled-components';
import bemClassNames from '../utils/bemClassNames';

export interface NotchedOutlineProps {
  /**
   * 设置为`true`，则会形成缺口。
   */
  notched?: boolean;
  /**
   * 缺口宽度
   */
  notchWidth?: number;
}

const NotchedOutlineLayout = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  pointer-events: none;
  box-sizing: border-box;

  > div {
    border: 1px solid currentColor;
  }

  > .sinoui-notched-outline__leading {
    border-right: none;
    width: 8px;
    border-radius: 4px 0 0 4px;
  }

  > .sinoui-notched-outline__notch {
    border-left: none;
    border-right: none;
    max-width: 80%;
    padding: 0 4px;
    box-sizing: content-box;
  }

  > .sinoui-notched-outline__trailing {
    border-left: none;
    flex-grow: 1;
    border-radius: 0 4px 4px 0;
  }

  &.sinoui-notched-outline--notched > .sinoui-notched-outline__notch {
    border-top: none;
  }
`;

/**
 * 有缺口的轮廓组件。一般用于轮廓模式的输入框、下拉选择框。
 */
export default function NotchedOutline(props: NotchedOutlineProps) {
  const { notched, notchWidth = 0 } = props;
  const notchStyle = useMemo(
    () => ({
      width: notchWidth,
    }),
    [notchWidth],
  );
  return (
    <NotchedOutlineLayout
      {...props}
      className={bemClassNames('sinoui-notched-outline', { notched })}
    >
      <div className="sinoui-notched-outline__leading" />
      <div className="sinoui-notched-outline__notch" style={notchStyle} />
      <div className="sinoui-notched-outline__trailing" />
    </NotchedOutlineLayout>
  );
}
