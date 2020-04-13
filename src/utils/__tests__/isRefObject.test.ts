import '@testing-library/jest-dom/extend-expect';
import isRefObject from '../isRefObject';

it('refObject', () => {
  expect(isRefObject({ current: 'current' })).toBeTruthy();
});

describe('非refObject', () => {
  it('数组', () => {
    expect(isRefObject([])).toBeFalsy();
  });

  it('对象', () => {
    expect(isRefObject({ name: 'name' })).toBeFalsy();
  });
});
