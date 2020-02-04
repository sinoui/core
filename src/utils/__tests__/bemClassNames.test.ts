import bemClassNames from '../bemClassNames';

it('生成className', () => {
  const result = bemClassNames(
    'sinoui-input-label',
    {
      disabled: true,
      filled: true,
    },
    'custom-input-label',
  );

  expect(result).toBe(
    'sinoui-input-label sinoui-input-label--disabled sinoui-input-label--filled custom-input-label',
  );
});
