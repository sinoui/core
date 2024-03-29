/* eslint-disable no-param-reassign */
/**
 *
 * @param element
 */
function getSizeData(element: HTMLElement) {
  const computedStyle = getComputedStyle(element);
  const getSizeValue = (key: keyof CSSStyleDeclaration) =>
    parseInt(computedStyle[key] as any, 10) || 0;
  const { boxSizing, width } = computedStyle;
  const padding = getSizeValue('paddingTop') + getSizeValue('paddingBottom');
  const border = getSizeValue('borderTop') + getSizeValue('borderBottom');

  return { boxSizing, padding, border, width };
}

/**
 *
 * @param shadow
 * @param content
 */
function getContentHeight(shadow: HTMLTextAreaElement, content = 'x') {
  shadow.value = content;
  return shadow.scrollHeight;
}

/**
 * 根据内容重新计算文本域的尺寸
 *
 * @param textarea 需要变更尺寸的文本域
 * @param shadow 用来计算内容尺寸的文本域
 * @param minRows 最小行数
 * @param maxRows 最大行数
 */
export default function resizeTextarea(
  textarea: HTMLTextAreaElement,
  shadow: HTMLTextAreaElement,
  minRows?: number,
  maxRows?: number,
) {
  const { boxSizing, padding, border, width } = getSizeData(textarea);
  shadow.style.width = width;
  const contentHeight =
    getContentHeight(shadow, textarea.value || textarea.placeholder || 'x') -
    padding;
  const singleRowHeight = getContentHeight(shadow) - padding;

  if (singleRowHeight <= 0) {
    return;
  }

  let textareaHeight = contentHeight;
  if (minRows) {
    textareaHeight = Math.max(singleRowHeight * minRows, textareaHeight);
  }
  if (maxRows) {
    textareaHeight = Math.min(singleRowHeight * maxRows, textareaHeight);
  }

  const newHeight =
    textareaHeight + (boxSizing === 'border-box' ? padding + border : 0);

  textarea.style.height = `${newHeight}px`;
  textarea.style.overflow =
    contentHeight - textareaHeight >= 1 ? 'auto' : 'hidden';
}
