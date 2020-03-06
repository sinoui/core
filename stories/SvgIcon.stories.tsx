import React, { useEffect } from 'react';
import SvgIcon from '@sinoui/core/SvgIcon';
import StoryLayout from './StoryLayout';
import { WiDayCloudyGusts } from 'react-icons/wi';

export default {
  title: 'SvgIcon',
};

export const 基本使用 = () => (
  <StoryLayout>
    <SvgIcon>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </SvgIcon>
  </StoryLayout>
);

export const 设置图标大小 = () => (
  <StoryLayout>
    <SvgIcon size={28}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </SvgIcon>
    <p style={{ fontSize: '48px' }}>
      <SvgIcon size="inherit">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </SvgIcon>
    </p>
  </StoryLayout>
);

export const 设置指定根元素 = () => (
  <StoryLayout>
    <SvgIcon as={WiDayCloudyGusts} />
  </StoryLayout>
);

export const 设置指定标题 = () => (
  <StoryLayout>
    <SvgIcon title="关闭">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </SvgIcon>
  </StoryLayout>
);

export const 设置svg可见区域 = () => (
  <StoryLayout>
    <SvgIcon viewBox="0 0 30 30">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </SvgIcon>
  </StoryLayout>
);

export const 设置颜色 = () => (
  <StoryLayout>
    <p style={{ color: '#000' }}>
      图标的颜色默认等同于文本颜色，从父元素集成而来：
      <SvgIcon>
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </SvgIcon>
    </p>
    <p>
      color=primary:
      <SvgIcon color="primary">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </SvgIcon>
    </p>
    <p>
      color=secondary:
      <SvgIcon color="secondary">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </SvgIcon>
    </p>
    <p>
      color=error
      <SvgIcon color="error">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </SvgIcon>
    </p>
    <p>
      color=warning
      <SvgIcon color="warning">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </SvgIcon>
    </p>
    <p>
      color=success
      <SvgIcon color="success">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </SvgIcon>
    </p>
    <p>
      color=info
      <SvgIcon color="info">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </SvgIcon>
    </p>
    <p>
      color=action
      <SvgIcon color="actionActive">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </SvgIcon>
    </p>
    <p>
      color=disabled
      <SvgIcon color="actionDisabled">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </SvgIcon>
    </p>
  </StoryLayout>
);

function SvgIconRef() {
  const ref = React.createRef();
  useEffect(() => {
    console.log(ref.current);
  });
  return (
    <SvgIcon ref={ref}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </SvgIcon>
  );
}

export const 设置ref引用元素 = () => (
  <StoryLayout>
    <SvgIconRef />
  </StoryLayout>
);
