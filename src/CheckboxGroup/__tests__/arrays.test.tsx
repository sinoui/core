import { cleanup } from '@testing-library/react';
import { removeItem, pushItem, toggleItem } from '../arrays';

describe('arrays 单元测试', () => {
  afterEach(cleanup);

  test('测试删除数组中指定元素removeItem', async () => {
    const arr = removeItem(['1', '2', '3', '4'], '3');

    expect(arr).toStrictEqual(['1', '2', '4']);
  });

  test('测试向数组items的结尾添加新元素pushItem', async () => {
    const arr = pushItem(['1', '2', '3', '4'], '8');

    expect(arr).toStrictEqual(['1', '2', '3', '4', '8']);
  });

  test('测试数组items中元素存在则删除，不存在则添加toggleItem', async () => {
    const arrnew = toggleItem(['1', '2', '3', '4'], '2');
    expect(arrnew).toStrictEqual(['1', '3', '4']);

    const arr = toggleItem(['1', '2', '3', '4'], '8');
    expect(arr).toStrictEqual(['1', '2', '3', '4', '8']);
  });
});
