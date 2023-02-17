import AutosizeTextarea from '@sinoui/core/AutosizeTextarea';
import Button from '@sinoui/core/Button';
import { defaultTheme } from '@sinoui/theme';
import { useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';

export default {
  title: 'AutosizeTextarea',
};

const AutosizeTextareaDemo = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <AutosizeTextarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <AutosizeTextarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        minRows={2}
      />
      <AutosizeTextarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxRows={5}
      />
    </>
  );
};

export const 验证 = () => <AutosizeTextareaDemo />;

/**
 * 多行文本框示例
 */
function TextAreaDemo() {
  const [value, setValue] = useState(
    new Array(10).fill('这是一段文本，很长的文本哟。').join('\n'),
  );

  return (
    <AutosizeTextarea
      value={value}
      onChange={(event) => setValue(event.target.value)}
      minRows={28}
      style={{
        fontSize: '1rem',
        lineHeight: 1.3,
      }}
    />
  );
}

export const 异步加载后自动同步高度 = () => {
  const [visible, setVisible] = useState(false);
  const textInput = useMemo(() => <TextAreaDemo />, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button onClick={() => setVisible((prev) => !prev)}>
        切换输入框可见性
      </Button>
      <div style={{ display: visible ? '' : 'none', width: 180 }}>
        {textInput}
      </div>
    </ThemeProvider>
  );
};
