/**
 * 移动焦点
 *
 * @param autoCompleteContainer 自动完成的容器
 * @param direction 移动方向
 */
export default function moveFocused(
  autoCompleteContainer: HTMLElement | null,
  direction: -1 | 1,
) {
  if (!autoCompleteContainer) {
    return;
  }

  const activeElement = document.activeElement as HTMLElement;
  const tags = Array.prototype.slice.call(
    autoCompleteContainer.querySelectorAll(
      '.sinoui-chip:not(.sinoui-chip--disabled)',
    ),
  ) as HTMLElement[];
  const tagIndex = tags.indexOf(activeElement);
  const newTagIndex = tagIndex + direction;

  if (newTagIndex === -2) {
    tags[tags.length - 1].focus();
  } else if (newTagIndex === -1 || newTagIndex > tags.length - 1) {
    (autoCompleteContainer.querySelector('input') as HTMLElement).focus();
  } else {
    tags[newTagIndex].focus();
  }
}
