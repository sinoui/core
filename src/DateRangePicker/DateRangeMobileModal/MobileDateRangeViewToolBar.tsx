import Button from '@sinoui/core/Button';
import Caption from '@sinoui/core/Caption';
import H5 from '@sinoui/core/H5';
import IconButton from '@sinoui/core/IconButton';
import Close from '@sinoui/core/svg-icons/Close';
import styled from 'styled-components';

/**
 * 工具栏组件的属性
 */
interface Props {
  /**
   * 弹窗标题
   */
  title?: string;
  /**
   * 开始时间
   */
  startDate?: Date;
  /**
   * 结束时间
   */
  endDate?: Date;
  /**
   * 弹窗关闭时的回调函数
   */
  onClose?: () => void;
  /**
   * 点击保存按钮时的回调函数
   */
  onOk?: () => void;
  /**
   * 点击清除按钮时的回调函数
   */
  onClear?: () => void;
  /**
   * 聚焦的输入框
   */
  focused?: 'start' | 'end';
  /**
   * 焦点位置变更回调函数
   */
  onFocusedChange?: (type: 'start' | 'end') => void;
  /**
   * 开始时间标题
   */
  startTitle?: string;
  /**
   * 结束时间标题
   */
  endTitle?: string;
}

const MobileDateRangeViewToolBarWrapper = styled.div`
  height: 128px;
  padding: 8px 16px 24px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  box-sizing: border-box;

  & > * {
    color: currentColor;
  }

  .sinoui-icon-button,
  .sinoui-button {
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }

  .sinoui-typography--caption,
  .sinoui-typography--h5 {
    padding-left: 48px;
  }
`;

const MobileDateRangeViewToolBarAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/**
 * 日期包裹组件的属性
 */
interface DateWrapperProps {
  /**
   * 是否是聚焦状态
   */
  $focused?: boolean;
}

const DateWrapper = styled.span<DateWrapperProps>`
  opacity: ${({ $focused }) => ($focused ? 1 : 0.7)};
  cursor: pointer;
`;

/**
 * 日历视图的工具栏
 *
 * @param props 组件属性
 * @param props.title 弹窗标题
 * @param props.startDate 开始时间
 * @param props.endDate 结束时间
 * @param props.onClose 弹窗关闭时的回调函数
 * @param props.onOk 点击保存按钮时的回调函数
 * @param props.onClear 点击清除按钮时的回调函数
 * @param props.focused 聚焦的输入框
 * @param props.onFocusedChange 焦点位置变更回调函数
 * @param props.startTitle 开始时间标题
 * @param props.endTitle 结束时间标题
 */
const MobileDateRangeViewToolBar = ({
  title,
  startDate,
  endDate,
  onClose,
  onOk,
  onClear,
  focused,
  onFocusedChange,
  startTitle = '开始时间',
  endTitle = '结束时间',
  ...rest
}: Props) => {
  const handleFocusedChange = (type: 'start' | 'end') => {
    if (onFocusedChange) {
      onFocusedChange(type);
    }
  };
  return (
    <MobileDateRangeViewToolBarWrapper
      className="sinoui-date-range-view-toolbar"
      {...rest}
    >
      <MobileDateRangeViewToolBarAction>
        <IconButton dense onClick={onClose}>
          <Close />
        </IconButton>
        <MobileDateRangeViewToolBarAction>
          <Button onClick={onClear}>清除</Button>
          <Button onClick={onOk}>保存</Button>
        </MobileDateRangeViewToolBarAction>
      </MobileDateRangeViewToolBarAction>
      <Caption>{title}</Caption>
      <H5 className="sinoui-date-range-view-toolbar__selected-date">
        <DateWrapper
          $focused={focused === 'start'}
          onClick={() => handleFocusedChange('start')}
        >
          {startDate
            ? `${startDate.getMonth() + 1}月${startDate.getDate()}日`
            : startTitle}
        </DateWrapper>
        -
        <DateWrapper
          $focused={focused === 'end'}
          onClick={() => handleFocusedChange('end')}
        >
          {endDate
            ? `
        ${endDate.getMonth() + 1}月${endDate.getDate()}日`
            : endTitle}
        </DateWrapper>
      </H5>
    </MobileDateRangeViewToolBarWrapper>
  );
};

export default MobileDateRangeViewToolBar;
