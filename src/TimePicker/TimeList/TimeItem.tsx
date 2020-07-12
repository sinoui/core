import React from 'react';
import bemClassNames from '@sinoui/core/utils/bemClassNames';
import TimeItemWrapper from './TimeItemWrapper';

interface Props {
  index: number;
  style?: React.CSSProperties;
  data: (
    index: number,
  ) => {
    selected: boolean;
    timeValue: number;
    onClick: (index: number) => void;
  };
}

/**
 * 时间选项
 */
function TimeItem(props: Props) {
  const { index, data, ...rest } = props;
  const { selected, timeValue, onClick } = data(index);

  return (
    <TimeItemWrapper
      className={bemClassNames('sinoui-time-item', {
        selected,
      })}
      selected={selected}
      tabIndex={0}
      forwardedAs="div"
      data-index={index}
      data-time-value={timeValue}
      onClick={() => onClick(index)}
      {...rest}
    >
      {timeValue < 10 ? '0' : ''}
      {timeValue}
    </TimeItemWrapper>
  );
}

export default React.memo(TimeItem);
