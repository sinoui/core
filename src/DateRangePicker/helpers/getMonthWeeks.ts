const ONE_DAY = 1 * 24 * 3600 * 1000;

/**
 * 获取指定月份所有周的开始时间和结束时间
 *
 * @param year 年份
 * @param month 月份
 */
const getMonthWeeks = (year: number, month: number) => {
  const weeks: [Date, Date][] = [];
  let firstDayOfWeek = new Date(year, month, 1, 0, 0, 0);
  let currentDate = firstDayOfWeek;
  const lastDate = new Date(
    new Date(year, month + 1, 1, 0, 0, 0).getTime() - ONE_DAY,
  );

  while (lastDate >= currentDate) {
    const weekDay = currentDate.getDay();
    if (weekDay === 1) {
      firstDayOfWeek = currentDate;
    }
    if (weekDay === 0 || currentDate.getTime() === lastDate.getTime()) {
      weeks.push([firstDayOfWeek, currentDate]);
    }
    currentDate = new Date(currentDate.getTime() + ONE_DAY);
  }

  return weeks;
};

export default getMonthWeeks;
