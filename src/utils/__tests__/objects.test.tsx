import '@testing-library/jest-dom';
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
  it('objects', async () => {
    const text = removeUndefinedProperties(obj);

    const objNew = {
      checked: true,
      readOnly: true,
      color: '#fff',
    };

    expect(text).toStrictEqual(objNew);
  });

  it('objects测试', async () => {
    const text = removeUndefinedProperties(objs);

    const objsNew = {
      checked: true,
      color: '#fff',
    };

    expect(text).toStrictEqual(objsNew);
  });
});
