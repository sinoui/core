export default function formatListItems(items?: NodeListOf<Element>) {
  const children = [];
  if (items) {
    for (let i = 0; i < items.length; i += 1) {
      children.push(items[i]);
    }
  }
  return children;
}

export function getAvailableItems(list: HTMLUListElement): HTMLLIElement[] {
  const items = list.querySelectorAll('.sinoui-list-item');
  const itemsArr = formatListItems(items);

  return itemsArr.filter(
    (item) => !item.classList.contains('sinoui-list-item--disabled'),
  ) as HTMLLIElement[];
}
