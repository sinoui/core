/**
 * 移动焦点
 *
 * @param autoCompleteContainer 自动完成的容器
 * @param direction 移动方向
 */
export default function moveFocused(
  autoCompleteContainer: HTMLElement | null,
  direction: number,
) {
  if (!autoCompleteContainer) {
    return;
  }

  const activeElement = document.activeElement as HTMLElement;
  const { tagIndex = '-1' } = activeElement.dataset;
  const newTagIndex = parseInt(tagIndex, 10) + direction;
  const tags = (autoCompleteContainer.querySelectorAll(
    '.sinoui-chip',
  ) as any) as HTMLElement[];
  if (newTagIndex === -2) {
    tags[tags.length - 1].focus();
  } else if (newTagIndex === -1 || newTagIndex > tags.length - 1) {
    (autoCompleteContainer.querySelector('input') as HTMLElement).focus();
  } else {
    tags[newTagIndex].focus();
  }
}
