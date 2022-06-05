import { getYearAndMonthByValue, isValidateDate } from './utils';

/**
 * 组件属性
 */
interface Props {
  /**
   * 表示年和月的值。默认为当前年月。
   */
  value?: string;
}

/**
 * 显示年月文本的组件
 *
 * @param props 组件属性
 * @param props.value 表示年月的值。
 */
const YearMonthText: React.FC<Props> = ({ value }) => {
  const [year, month] = isValidateDate(value)
    ? getYearAndMonthByValue(value)
    : [new Date().getFullYear(), new Date().getMonth()];

  return (
    <>
      {year}年{month + 1}月
    </>
  );
};

export default YearMonthText;
