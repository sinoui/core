import { createGlobalStyle } from 'styled-components';

const AutoCompleteStyle = createGlobalStyle`
  .sinoui-auto-complete--multiple .sinoui-base-input {
    display: flex;
    flex-wrap: wrap;
    padding-right: 56px;
  }

  .sinoui-auto-complete--multiple .sinoui-base-input > .sinoui-base-input__input {
    width: 0;
    min-width: 30px;
    padding-top: 6.5px;
  }

  .sinoui-auto-complete--multiple .sinoui-base-input > .sinoui-input-adornment--end {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
  }

  .sinoui-auto-complete--multiple .sinoui-chip {
    margin: 3px;
    max-width: calc(100% - 6px);
  }

  .sinoui-auto-complete--multiple.sinoui-text-input--filled > .sinoui-base-input {
    padding: 19px 56px 0px 8px;

    > .sinoui-base-input__input {
      padding: 7px 4px;
    }
  }

  .sinoui-auto-complete--multiple.sinoui-text-input--outlined > .sinoui-base-input {
    padding: 9px;
    padding-right: 56px;

    > .sinoui-base-input__input {
      padding: 7px 4px;
    }
  }

  .sinoui-auto-complete--dense .sinoui-chip {
    margin: 2px;
    max-width: calc(100% - 4px);
  }

  .sinoui-auto-complete--dense.sinoui-text-input--outlined > .sinoui-base-input {
    padding: 6px 9px;
    padding-right: 56px;
    

    > .sinoui-base-input__input {
      padding: 4px 4px 5px;
      height: 19px;
      min-height: 19px;
    }
  }

  .sinoui-auto-complete--dense .sinoui-base-input > .sinoui-base-input__input{
    padding: 4px 4px 5px;
    height: 19px;
    min-height: 19px;
  }

  .sinoui-auto-complete--dense.sinoui-text-input--filled > .sinoui-base-input {
    padding: 19px 56px 1px 8px;

    > .sinoui-base-input__input {
      padding: 4px 4px 5px;
      height: 19px;
      min-height: 19px;
    }
  }

  .sinoui-select--error .sinoui-auto-complete__popup-indicator > .sinoui-svg-icon {
  
  }
`;

export default AutoCompleteStyle;
