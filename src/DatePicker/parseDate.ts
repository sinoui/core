import mem from '@sinoui/core/utils/mem';

const DATE_REGEXP = /^\d{4}-\d{2}-\d{2}$/;

/**
 * 解析日期
 *
 * @param {string} dateStr 需要解析的日期字符串
 */
const parseDate = mem((dateStr?: string) => {
  if (dateStr) {
    if (DATE_REGEXP.test(dateStr)) {
      return new Date(Date.parse(`${dateStr}T00:00:00`));
    }
    return new Date(Date.parse(dateStr));
  }
  return undefined;
});

export default parseDate;
