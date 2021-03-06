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

it('正确处理驼峰单词', () => {
  const result = bemClassNames('sinoui-input-label', {
    readOnly: true,
  });

  expect(result).toBe('sinoui-input-label sinoui-input-label--read-only');
});
