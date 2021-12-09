import React, { useState } from 'react';
import ToggleButton from '@sinoui/core/ToggleButton';
import Done from '@sinoui/icons/Done';
import ToggleButtonGroup from '@sinoui/core/ToggleButtonGroup';
import FormatAlignLeft from '@sinoui/icons/FormatAlignLeft';
import FormatAlignRight from '@sinoui/icons/FormatAlignRight';
import FormatAlignCenter from '@sinoui/icons/FormatAlignCenter';
import FormatAlignJustify from '@sinoui/icons/FormatAlignJustify';
import FormatBold from '@sinoui/icons/FormatBold';
import FormatItalic from '@sinoui/icons/FormatItalic';
import FormatUnderlined from '@sinoui/icons/FormatUnderlined';
import FormatClear from '@sinoui/icons/FormatClear';
import StoryLayout from './StoryLayout';

export default {
  title: '切换按钮',
};

export const 基础使用 = () => {
  const [selected, setSelected] = useState<string>('');

  return (
    <StoryLayout>
      <ToggleButtonGroup value={selected} onChange={setSelected as any}>
        <ToggleButton value="left">
          <FormatAlignLeft />
        </ToggleButton>
        <ToggleButton value="center">
          <FormatAlignCenter />
        </ToggleButton>
        <ToggleButton value="right">
          <FormatAlignRight />
        </ToggleButton>
        <ToggleButton value="justify">
          <FormatAlignJustify />
        </ToggleButton>
      </ToggleButtonGroup>
    </StoryLayout>
  );
};

export const 多选 = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <StoryLayout>
      <ToggleButtonGroup
        multiple
        value={selected}
        onChange={setSelected as any}
      >
        <ToggleButton value="bold">
          <FormatBold />
        </ToggleButton>
        <ToggleButton value="italic">
          <FormatItalic />
        </ToggleButton>
        <ToggleButton value="underLine">
          <FormatUnderlined />
        </ToggleButton>
        <ToggleButton value="clear" disabled={selected.length === 0}>
          <FormatClear />
        </ToggleButton>
      </ToggleButtonGroup>
    </StoryLayout>
  );
};

export const 紧凑模式 = () => {
  const [selected, setSelected] = useState<string>('');

  return (
    <StoryLayout>
      <ToggleButtonGroup dense value={selected} onChange={setSelected as any}>
        <ToggleButton value="left">
          <FormatAlignLeft />
        </ToggleButton>
        <ToggleButton value="center">
          <FormatAlignCenter />
        </ToggleButton>
        <ToggleButton value="right">
          <FormatAlignRight />
        </ToggleButton>
        <ToggleButton value="justify">
          <FormatAlignJustify />
        </ToggleButton>
      </ToggleButtonGroup>
      <br />
      <ToggleButtonGroup value={selected} onChange={setSelected as any}>
        <ToggleButton value="left">
          <FormatAlignLeft />
        </ToggleButton>
        <ToggleButton value="center">
          <FormatAlignCenter />
        </ToggleButton>
        <ToggleButton value="right">
          <FormatAlignRight />
        </ToggleButton>
        <ToggleButton value="justify">
          <FormatAlignJustify />
        </ToggleButton>
      </ToggleButtonGroup>
    </StoryLayout>
  );
};

export const 指定颜色 = () => {
  const [selected, setSelected] = useState<string>('');

  return (
    <StoryLayout>
      <ToggleButtonGroup
        color="primary"
        value={selected}
        onChange={setSelected as any}
      >
        <ToggleButton value="web">web</ToggleButton>
        <ToggleButton value="android">Android</ToggleButton>
        <ToggleButton value="ios">ios</ToggleButton>
      </ToggleButtonGroup>
      <br />
      <ToggleButtonGroup
        color="secondary"
        value={selected}
        onChange={setSelected as any}
      >
        <ToggleButton value="web">web</ToggleButton>
        <ToggleButton value="android">Android</ToggleButton>
        <ToggleButton value="ios">ios</ToggleButton>
      </ToggleButtonGroup>
      <br />
      <ToggleButtonGroup
        color="info"
        value={selected}
        onChange={setSelected as any}
      >
        <ToggleButton value="web">web</ToggleButton>
        <ToggleButton value="android">Android</ToggleButton>
        <ToggleButton value="ios">ios</ToggleButton>
      </ToggleButtonGroup>
    </StoryLayout>
  );
};

export const 单个按钮 = () => {
  const [selected, setSelected] = useState(false);

  return (
    <StoryLayout>
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => setSelected(!selected)}
      >
        <Done />
      </ToggleButton>
    </StoryLayout>
  );
};
