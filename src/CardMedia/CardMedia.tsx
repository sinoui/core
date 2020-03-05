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

const CardMediaWrapper = styled.div.attrs(({ wide, square }: Props) => ({
  className: classNames(CardMediaClassName, {
    [`${CardMediaClassName}--16-9`]: wide,
    [`${CardMediaClassName}--square`]: square,
  }),
}))<Props>`
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

if (process.env.NODE_ENV === 'development') {
  CardMediaWrapper.displayName = 'CardMedia';
}

export default CardMediaWrapper;
