import React, { useRef } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import classNames from 'classnames';
import useEnhancedEffect from '@sinoui/core/utils/useEnhancedEffect';
import YearItem from './YearItem';
import {
  COLUMNS_OF_YEAR_PC,
  COLUMNS_OF_YEAR_MOBILE,
  COUNTS_OF_YEAR,
} from '../constants';
import YearSelectViewWrapper from './YearSelectViewWrapper';
import useIsPc from '../useIsPc';
import bemClassNames from '../../utils/bemClassNames';

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
  /**
   * 是否是PC设备
   */
  isPc?: boolean;
}

/**
 * 生成年份列表
 *
 * @param startYear 开始年份
 * @param showYearsCount 年份个数
 */
export const genYears = (startYear: number, showYearsCount: number) => {
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
export const calcStartYear = (
  currentYear: number,
  columns: number,
  size = 100,
) => currentYear - (currentYear % columns) - (size - (size % columns));

/**
 * 选择年的视图
 */
export default function YearSelectView(props: Props) {
  const { isPc: isPcProp } = props;
  const navtiveIsPc = useIsPc();
  const isPc = isPcProp ?? navtiveIsPc;
  const columns = isPc ? COLUMNS_OF_YEAR_PC : COLUMNS_OF_YEAR_MOBILE;
  // eslint-disable-next-line react/destructuring-assignment
  const currentYear = props.selectedYear ?? new Date().getFullYear();
  const {
    selectedYear,
    showYearsCount = COUNTS_OF_YEAR,
    startYear = calcStartYear(
      currentYear,
      columns,
      Math.floor(showYearsCount / 2),
    ),

    onYearSelect,
    minYear = -1,
    maxYear = Infinity,
    className,
    ...rest
  } = props;
  const years = genYears(startYear, showYearsCount);
  const selectedYearNodeRef = useRef<HTMLButtonElement>(null);

  const handleYearItemClick = (year: number) => () => {
    if (onYearSelect) {
      onYearSelect(year);
    }
  };

  useEnhancedEffect(() => {
    const selectedYearNode = selectedYearNodeRef.current;
    if (selectedYearNode) {
      scrollIntoView(selectedYearNode, {
        block: 'center',
        inline: 'center',
      });
    }
  }, []);

  return (
    <YearSelectViewWrapper
      $columns={columns}
      className={classNames('sinoui-year-select-view', className)}
      {...rest}
      $isPc={isPc}
    >
      {years.map((year, index) => (
        <YearItem
          key={year}
          className={bemClassNames('sinoui-year-select-view__year-item', {
            selected: selectedYear === year,
            disabled: year < minYear || year > maxYear,
          })}
          row={Math.ceil((index + 1) / columns)}
          column={(index % columns) + 1}
          $selected={selectedYear === year}
          onClick={handleYearItemClick(year)}
          disabled={year < minYear || year > maxYear}
          ref={selectedYear === year ? selectedYearNodeRef : null}
          data-year={year}
          $isPc={isPc}
        >
          {year}
        </YearItem>
      ))}
    </YearSelectViewWrapper>
  );
}
