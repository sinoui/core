import React from 'react';
import classNames from 'classnames';
import SwitchBase, { SwitchBaseProps } from './SwitchBase';
import RadioButtonCheckedIcon from './svg-icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from './svg-icons/RadioButtonUnchecked';

export interface Props extends SwitchBaseProps {
  /**
   * 是否不可用
   */
  disabled?: boolean;
  /**
   * 是否被选中
   */
  checked?: boolean;
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

/**
 * 单选框组件（只有图标）。推荐使用`Radio`组件。
 */
function RadioButton(props: Props) {
  return (
    <SwitchBase
      inputType="radio"
      icon={<RadioButtonUncheckedIcon />}
      checkedIcon={<RadioButtonCheckedIcon />}
      {...props}
      className={classNames(
        'sinoui-radio',
        'sinoui-radio-button',
        props.className,
        {
          'sinoui-radio--checked': props.checked,
          'sinoui-radio--disabled': props.disabled,
        },
      )}
      data-testid="radio"
    />
  );
}

export default RadioButton;
