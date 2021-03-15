/**
 * 数据分组
 * @param options 选项
 * @param groupBy 数据分组依据
 */
export default function groupOptions(
  options: any[],
  groupBy?: (option: any) => string,
) {
  let groupedOptions = options;
  if (groupBy) {
    // used to keep track of key and indexes in the result array
    const indexBy = new Map();
    let warn = false;

    groupedOptions = options.reduce((acc, option, index) => {
      const group = groupBy(option);

      if (acc.length > 0 && acc[acc.length - 1].groupTitle === group) {
        acc[acc.length - 1].options.push(option);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          if (indexBy.get(group) && !warn) {
            warn = true;
          }
          indexBy.set(group, true);
        }

        acc.push({
          key: index,
          index,
          groupTitle: group,
          options: [option],
        });
      }

      return acc;
    }, []);
  } else {
    groupedOptions = [{ key: 0, index: 0, groupTitle: '', options }];
  }

  return groupedOptions;
}
