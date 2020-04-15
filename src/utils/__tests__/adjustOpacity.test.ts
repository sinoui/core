import adjustOpacity from '../adjustOpacity';

it('设置颜色的透明度', () => {
  expect(adjustOpacity(0.2, 'red')).toBe('rgba(255,0,0,0.2)');
  expect(adjustOpacity(0.2, 'red')).toBe('rgba(255,0,0,0.2)');
  expect(adjustOpacity(0.2, 'green')).toBe('rgba(0,128,0,0.2)');
});
