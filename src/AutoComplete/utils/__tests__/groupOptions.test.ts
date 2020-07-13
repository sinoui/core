import groupOptions from '../groupOptions';

const items = ['item1', 'item2', 'option1', 'option2', 'data1', 'data2'];

it('不指定分组方式', () => {
  const result = groupOptions(items);

  expect(result).toEqual([
    { key: 0, index: 0, groupTitle: '', options: items },
  ]);
});

it('指定分组规则', () => {
  const result = groupOptions(items, (option) => option[0].toUpperCase());

  expect(result).toEqual([
    { key: 0, index: 0, groupTitle: 'I', options: ['item1', 'item2'] },
    { key: 2, index: 2, groupTitle: 'O', options: ['option1', 'option2'] },
    { key: 4, index: 4, groupTitle: 'D', options: ['data1', 'data2'] },
  ]);
});
