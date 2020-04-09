import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { removeUndefinedProperties } from '@sinoui/core/utils/objects';

const obj = {
  checked: true,
  readOnly: true,
  color: '#fff',
  disabled: undefined,
};

const objs = {
  checked: true,
  readOnly: undefined,
  color: '#fff',
  disabled: undefined,
};

/**
 * objects 单元测试
 */
describe('objects 单元测试', () => {
  afterEach(cleanup);

  test('objects', async () => {
    const text = removeUndefinedProperties(obj);

    const objNew = {
      checked: true,
      readOnly: true,
      color: '#fff',
    };

    expect(text).toStrictEqual(objNew);
  });

  test('objects测试', async () => {
    const text = removeUndefinedProperties(objs);

    const objsNew = {
      checked: true,
      color: '#fff',
    };

    expect(text).toStrictEqual(objsNew);
  });
});
