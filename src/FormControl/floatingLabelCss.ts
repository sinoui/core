import { css } from 'styled-components';
import FormLabelProps from './FormLabelProps';

const getTranslateX = ({
  variant,
}: {
  variant?: 'standard' | 'filled' | 'outlined';
}) => {
  switch (variant) {
    case 'filled':
      return 12;
    case 'outlined':
      return 14;

    case 'standard':
    default:
      return 0;
  }
};

const getTranslateY = (props: FormLabelProps) => {
  const { variant, filled, focused, dense } = props;
  const isShrink = filled || focused;
  if (variant === 'filled') {
    if (dense) {
      return isShrink ? 7 : 17;
    }
    return isShrink ? 9 : 20;
  }

  if (variant === 'outlined') {
    if (isShrink) {
      return -6;
    }
    return dense ? 12 : 20;
  }

  return isShrink ? 1.5 : 24;
};

const getScale = (props: FormLabelProps) => {
  const { filled, focused } = props;
  const isShrink = filled || focused;
  return isShrink ? 0.75 : 1;
};

/**
 * 浮动标签的样式
 */
const floatingLabelCss = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
  transform-origin: top left;
  line-height: 1.3;
  transform: translate(${getTranslateX}px, ${getTranslateY}px)
    scale(${getScale});
  will-change: transform;
  max-width: calc(100% - 24px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default floatingLabelCss;
