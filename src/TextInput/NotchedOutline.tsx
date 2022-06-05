import { useMemo } from 'react';
import styled, { css } from 'styled-components';

import bemClassNames from '../utils/bemClassNames';

/**
 * 轮廓缺口组件的属性
 */
export interface NotchedOutlineProps {
  /**
   * 设置为`true`，则会形成缺口。
   */
  notched?: boolean;
  /**
   * 缺口宽度
   */
  notchWidth?: number;
  /**
   * 是否显示方角
   */
  square?: boolean;
}

const leadingRoundCss = css`
  border-radius: 4px 0 0 4px;
`;

const trailingRoundCss = css`
  border-radius: 0 4px 4px 0;
`;

/**
 *
 */
interface NotchedOutlineLayoutProps {
  /**
   * 是否显示方角
   */
  $square?: boolean;
}

const NotchedOutlineLayout = styled.div<NotchedOutlineLayoutProps>`
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
    box-sizing: border-box;
    transition: ${({ theme: { transitions } }) =>
      transitions.create('border-color')};
  }

  > .sinoui-notched-outline__leading {
    border-right: none;
    flex: 0 0 auto;
    width: 10px;
    ${({ $square }) => !$square && leadingRoundCss};
  }

  > .sinoui-notched-outline__notch {
    border-left: none;
    border-right: none;
    padding: 0 4px;
    box-sizing: content-box;
  }

  > .sinoui-notched-outline__trailing {
    border-left: none;
    flex: 1 0 10px;
    ${({ $square }) => !$square && trailingRoundCss};
  }

  &.sinoui-notched-outline--notched > .sinoui-notched-outline__notch {
    border-top: none;
  }

  &.sinoui-notched-outline--no-label > .sinoui-notched-outline__notch {
    padding: 0;
  }
`;

/**
 * 有缺口的轮廓组件。一般用于轮廓模式的输入框、下拉选择框。
 *
 * @param props 组件属性
 */
const NotchedOutline: React.FC<NotchedOutlineProps> = (props) => {
  const { notched, notchWidth = 0, square } = props;
  const notchStyle = useMemo(
    () => ({
      width: notchWidth,
    }),
    [notchWidth],
  );
  return (
    <NotchedOutlineLayout
      {...props}
      className={bemClassNames('sinoui-notched-outline', {
        notched,
        'no-label': notchWidth === 0,
      })}
      $square={square}
    >
      <div className="sinoui-notched-outline__leading" />
      <div className="sinoui-notched-outline__notch" style={notchStyle} />
      <div className="sinoui-notched-outline__trailing" />
    </NotchedOutlineLayout>
  );
};

export default NotchedOutline;
