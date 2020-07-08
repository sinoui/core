/**
 * 找出range2在range1区域的
 * @param range1 参考区域
 * @param range2 实际区域
 */
const getCrossDateRange = (
  range1: [Date, Date],
  range2: [Date, Date],
): [Date, Date] | undefined => {
  const [start1, end1] = range1;
  const [start2, end2] = range2;

  if (start1 <= start2 && end1 >= end2) {
    return range2;
  }

  if (start2 <= start1 && end2 >= end1) {
    return range1;
  }

  if (end2 < start1 || end1 < start2) {
    return undefined;
  }

  if (end2 <= end1) {
    return [start1, end2];
  }

  return [start2, end1];
};

export default getCrossDateRange;
