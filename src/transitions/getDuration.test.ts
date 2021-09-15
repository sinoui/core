/**
 * @jest-environment jsdom
 */
import getDuration from './getDuration';

it('auto', () => {
  const node = document.createElement('div');
  Object.defineProperty(node, 'clientHeight', {
    configurable: true,
    value: 100,
  });
  expect(getDuration('auto', 'enter', node)).toBe(239);
});

it('数字', () => {
  expect(getDuration(300, 'enter')).toBe(300);
});

it('对象', () => {
  expect(getDuration({ enter: 100 }, 'enter')).toBe(100);
});
