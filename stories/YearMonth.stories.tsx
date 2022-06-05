import React, { useState } from 'react';
import styled from 'styled-components';
import YearMonthPicker from '@sinoui/core/YearMonthPicker';
import Button from '@sinoui/core/Button';
import StoryLayout from './StoryLayout';

const StyledYearMontPicker = styled(YearMonthPicker)`
  width: 200px;
  margin: 8px;
`;

export default {
  title: 'YearMonthPicker',
};

export const 基本使用 = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <StoryLayout>
      <StyledYearMontPicker value={value} onChange={(v) => setValue(v)} />
    </StoryLayout>
  );
};

export const 指定范围 = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <StoryLayout>
      <StyledYearMontPicker
        value={value}
        onChange={setValue}
        min="2022-01"
        max="2022-06"
      />
    </StoryLayout>
  );
};

export const 指定渲染格式 = () => {
  const [value, setValue] = useState<string | undefined>();

  const renderValue = (date?: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');

    return `${year}年${Number(month)}月`;
  };

  return (
    <StoryLayout>
      <StyledYearMontPicker
        value={value}
        onChange={setValue}
        renderValue={renderValue}
      />
    </StoryLayout>
  );
};

export const 值同步 = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <StoryLayout>
      <StyledYearMontPicker
        label="选择日期"
        value={value}
        onChange={setValue}
        allowClear
      />
      <div>
        <Button onClick={() => setValue('2020-06')} raised>
          设置为2020-06
        </Button>
      </div>
    </StoryLayout>
  );
};

export const 允许值清空 = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <StoryLayout>
      <StyledYearMontPicker
        label="选择日期"
        value={value}
        onChange={setValue}
        allowClear
      />
      <div>当前值：{value}</div>
    </StoryLayout>
  );
};

export const 渲染placeHolder = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <StoryLayout>
      <StyledYearMontPicker
        value={value}
        onChange={setValue}
        placeholder="请选择年月"
      />
    </StoryLayout>
  );
};

export const 移动端 = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <StoryLayout>
      <StyledYearMontPicker value={value} onChange={setValue} isPc={false} />
    </StoryLayout>
  );
};
