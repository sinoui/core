import Button from '@sinoui/core/Button';
import styled from 'styled-components';

const ButtonsWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

/**
 * 组件属性
 */
export interface Props {
  /**
   * 清除的回调函数
   */
  onClear: () => void;
  /**
   * 点击确定按钮的回调函数
   */
  onOk: () => void;
  /**
   * 点击关闭按钮的回调函数
   */
  onClose: () => void;
}

/**
 * 移动端日期弹出底部按钮
 *
 * @param props 组件属性
 * @param props.onClear 清除的回调函数
 * @param props.onOk 点击确定按钮的回调函数
 * @param props.onClose 点击关闭按钮的回调函数
 */
const TimePickerMobileButtons: React.FC<Props> = ({
  onClear,
  onOk,
  onClose,
}) => (
  <ButtonsWrapper>
    <Button onClick={onClear} data-testid="clock-clear-btn">
      清除
    </Button>
    <Button onClick={onClose} data-testid="clock-cancel-btn">
      取消
    </Button>
    <Button onClick={onOk} data-testid="clock-ok-btn">
      设置
    </Button>
  </ButtonsWrapper>
);

export default TimePickerMobileButtons;
