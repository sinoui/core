import generateClassName from '../generateClassName';

it('生成className', () => {
  const result = generateClassName('sinoui-input-label', {
    disabled: true,
    filled: true,
  });

  expect(result).toBe(
    'sinoui-input-label sinoui-input-label--disabled sinoui-input-label--filled',
  );
});
