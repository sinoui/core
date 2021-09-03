/**
 * 判断指定值是否为空
 *
 * @param value 值
 */
export default function isEmptyValue(value?: any) {
  return (
    typeof value !== 'boolean' &&
    // eslint-disable-next-line no-restricted-globals
    (typeof value !== 'number' || isNaN(value)) &&
    (!value || (Array.isArray(value) && value.length === 0))
  );
}
