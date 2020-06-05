import React from 'react';
import classNames from 'classnames';
import YearItem from './YearItem';
import {
  COLUMNS_OF_YEAR_PC,
  COLUMNS_OF_YEAR_MOBILE,
  COUNTS_OF_YEAR,
} from '../constants';
import YearSelectViewWrapper from './YearSelectViewWrapper';
import useIsPc from '../useIsPc';

interface Props {
  /**
   * 选中的年份。
   */
  selectedYear?: number;
  /**
   * 指定最小年份。小于minYear的年份是禁用状态，不可选用。
   */
  minYear?: number;
  /**
   * 指定最大年份。大于maxYear的年份是禁用状态，不可选用。
   */
  maxYear?: number;
  /**
   * 开始年份。
   */
  startYear?: number;
  /**
   * 显示年份的个数。默认显示200个年份，即选中年份之前的100年，之后的99年。
   */
  showYearsCount?: number;
  /**
   * 选中年份的回调函数
   */
  onYearSelect?: (year: number) => void;
  /**
   * 指定自定义类名。
   */
  className?: string;
  /**
   * 指定自定义样式。
   */
  style?: React.CSSProperties;
}

/**
 * 生成年份列表
 *
 * @param startYear 开始年份
 * @param showYearsCount 年份个数
 */
const genYears = (startYear: number, showYearsCount: number) => {
  const years: number[] = [];

  for (let i = 0; i < showYearsCount; i += 1) {
    years.push(startYear + i);
  }

  return years;
};

/**
 * 计算年份视图的开始年份
 *
 * @param currentYear 当前年份
 * @param columns 列数
 */
const caclcStartYear = (currentYear: number, columns: number) => {
  return currentYear - (currentYear % columns) - (100 - (100 % columns));
};

/**
 * 选择年的视图
 */
export default function YearSelectView(props: Props) {
  const isPc = useIsPc();
  const columns = isPc ? COLUMNS_OF_YEAR_PC : COLUMNS_OF_YEAR_MOBILE;
  // eslint-disable-next-line react/destructuring-assignment
  const currentYear = props.selectedYear ?? new Date().getFullYear();
  const {
    selectedYear,
    startYear = caclcStartYear(currentYear, columns),
    showYearsCount = COUNTS_OF_YEAR,
    onYearSelect,
    minYear = -1,
    maxYear = Infinity,
    className,
    ...rest
  } = props;
  const years = genYears(startYear, showYearsCount);

  const handleYearItemClick = (year: number) => () => {
    if (onYearSelect) {
      onYearSelect(year);
    }
  };

  return (
    <YearSelectViewWrapper
      $columns={columns}
      className={classNames('sinoui-year-select-view', className)}
      {...rest}
    >
      {years.map((year, index) => (
        <YearItem
          key={year}
          row={Math.ceil((index + 1) / columns)}
          column={(index % columns) + 1}
          $selected={selectedYear === year}
          autoFocus={currentYear === year}
          onClick={handleYearItemClick(year)}
          disabled={year < minYear || year > maxYear}
        >
          {year}
        </YearItem>
      ))}
    </YearSelectViewWrapper>
  );
}
