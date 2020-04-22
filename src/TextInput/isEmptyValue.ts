/**
 * 判断指定值是否为空
 *
 * @param value 值
 */
export default function isEmptyValue(value?: any) {
  return (
    typeof value !== 'boolean' &&
    typeof value !== 'number' &&
    (!value || (Array.isArray(value) && value.length === 0))
  );
}
