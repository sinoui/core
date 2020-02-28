import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';

interface Props {
  /**
   * 图片链接
   */
  imageUrl: string;
  /**
   * 在水平方向上图片占满卡片宽度。采用 16:9 的比例。
   */
  wide?: boolean;
  /**
   * 图片呈现为一个正方形小块。
   */
  square?: boolean;
  /**
   * 图片宽度
   */
  width?: number;
  /**
   * 指定根组件
   */
  as?: React.ReactType;
  /**
   * 指定自定义样式类名。
   */
  className?: string;
  /**
   * 指定自定义样式。
   */
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const squareStyle = css`
  &::before {
    margin-top: 100%;
  }
`;

const wideStyle = css`
  &::before {
    margin-top: 56.25%;
  }
`;

const CardMediaClassName = 'sinoui-card__media';

const CardMediaWrapper = styled.div.attrs(
  ({ className, wide, square }: Props) => ({
    className: classNames(className, CardMediaClassName, {
      [`${CardMediaClassName}--16-9`]: wide,
      [`${CardMediaClassName}--square`]: square,
    }),
  }),
)<Props>`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;

  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
  }

  ${({ square }) => square && squareStyle}
  ${({ wide }) => wide && wideStyle}

  ${({ width }) =>
    width &&
    `
    width: ${width}px;
  `}
  box-sizing: border-box;
`;

React.forwardRef<React.Ref<HTMLDivElement>, Props>((props, ref) => {
  return (
    <CardMediaWrapper {...props} ref={ref}>
      {props.children}
    </CardMediaWrapper>
  );
});

if (process.env.NODE_ENV === 'development') {
  CardMediaWrapper.displayName = 'CardMedia';
}

export default CardMediaWrapper;
