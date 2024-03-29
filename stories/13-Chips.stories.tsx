import React, { useState } from 'react';
import Chip from '@sinoui/core/Chip';
import styled from 'styled-components';
import FaceIcon from '@sinoui/icons/Face';
import Avatar from '@sinoui/core/Avatar';
import StoryLayout from './StoryLayout';
import avatarf from './img/avatarf.jpg';

export default {
  title: 'Chip',
};

export const 基本使用 = () => (
  <StoryLayout>
    <div style={{ display: 'flex' }}>
      <Chip label="这是文本" />
      <Chip
        label="Delete"
        onDelete={() => {
          console.log('删除图标被点击');
        }}
      />
      <Chip label="Disabled" disabled />
      <Chip
        label="Disabled"
        disabled
        onDelete={() => {
          console.log('删除图标被点击');
        }}
      />
      <Chip label="leading icon" icon={<FaceIcon />} />
      <Chip
        label="leading icon"
        icon={<FaceIcon />}
        onDelete={() => {
          console.log('删除图标被点击');
        }}
      />
      <Chip
        label="Avatar"
        icon={
          <Avatar>
            <img src={avatarf} alt="" />
          </Avatar>
        }
      />
    </div>
  </StoryLayout>
);

export const 边框模式 = () => (
  <StoryLayout>
    <div style={{ display: 'flex' }}>
      <Chip label="这是文本" variant="outlined" />
      <Chip
        label="Delete"
        variant="outlined"
        onDelete={() => {
          console.log('删除图标被点击');
        }}
      />
      <Chip label="Disabled" variant="outlined" disabled />
      <Chip
        label="Disabled"
        variant="outlined"
        disabled
        onDelete={() => {
          console.log('删除图标被点击');
        }}
      />
      <Chip label="leading icon" icon={<FaceIcon />} variant="outlined" />
      <Chip
        label="leading icon"
        icon={<FaceIcon />}
        onDelete={() => {
          console.log('删除图标被点击');
        }}
        variant="outlined"
      />
      <Chip
        label="Avatar"
        icon={
          <Avatar>
            <img src={avatarf} alt="" />
          </Avatar>
        }
        variant="outlined"
      />
    </div>
  </StoryLayout>
);

export const 可点击的Chip = () => (
  <StoryLayout>
    <>
      <Chip label="Clickable" clickable />
      <Chip
        label="Delete"
        clickable
        onDelete={() => {
          console.log('删除图标被点击');
        }}
      />
      <Chip
        label="Disable"
        clickable
        disabled
        onDelete={() => {
          console.log('删除图标被点击');
        }}
      />
      <Chip label="Clickable" clickable variant="outlined" />
      <Chip
        label="Delete"
        variant="outlined"
        clickable
        onDelete={() => {
          console.log('删除图标被点击');
        }}
      />
      <Chip
        label="Disable"
        clickable
        disabled
        variant="outlined"
        onDelete={() => {
          console.log('删除图标被点击');
        }}
      />
    </>
  </StoryLayout>
);

export const DenseChip = () => (
  <StoryLayout>
    <div style={{ display: 'flex' }}>
      <Chip label="dense" dense />
      <Chip label="dense" variant="outlined" dense />
      <Chip
        label="Dense"
        onDelete={() => {
          console.log('删除图标被点击');
        }}
        dense
      />
      <Chip
        label="Dense"
        variant="outlined"
        onDelete={() => {
          console.log('删除图标被点击');
        }}
        dense
      />
      <Chip label="dense" dense icon={<FaceIcon />} />
      <Chip
        label="dense"
        variant="outlined"
        dense
        avatar={
          <Avatar>
            <img src={avatarf} alt="" />
          </Avatar>
        }
      />
    </div>
  </StoryLayout>
);

const StyledChip = styled(Chip)`
  margin: 4px;
`;

export const 自定义颜色 = () => (
  <StoryLayout>
    <>
      <div style={{ display: 'flex' }}>
        <StyledChip label="Default" />
        <StyledChip color="primary" label="Primary" />
        <StyledChip color="secondary" label="Secondary" />
        <StyledChip color="success" label="Success" />
        <StyledChip color="warning" label="Warning" />
        <StyledChip color="info" label="Info" />
        <StyledChip color="error" label="Error" />
        <StyledChip disabled label="Disabled" />
        <StyledChip
          color="primary"
          label="Primary"
          onDelete={() => console.log('123')}
        />
        <StyledChip
          disabled
          label="Disabled"
          color="primary"
          onDelete={() => console.log('123')}
        />
        <StyledChip
          color="primary"
          label="Primary Leading Icon"
          icon={<FaceIcon />}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <StyledChip label="Default" variant="outlined" />
        <StyledChip color="primary" label="Primary" variant="outlined" />
        <StyledChip color="secondary" label="Secondary" variant="outlined" />
        <StyledChip color="success" label="Success" variant="outlined" />
        <StyledChip color="warning" label="Warning" variant="outlined" />
        <StyledChip color="info" label="Info" variant="outlined" />
        <StyledChip color="error" label="Error" variant="outlined" />
        <StyledChip disabled label="Disabled" variant="outlined" />
        <StyledChip
          color="primary"
          label="Primary"
          variant="outlined"
          onDelete={() => console.log('123')}
        />
        <StyledChip
          disabled
          label="Disabled"
          color="primary"
          variant="outlined"
          onDelete={() => console.log('123')}
        />
        <StyledChip
          color="primary"
          label="Primary Leading Icon"
          icon={<FaceIcon />}
          variant="outlined"
        />
      </div>
    </>
  </StoryLayout>
);

function SelectedDemo() {
  const [selected, setSelected] = useState(false);
  return (
    <StoryLayout>
      <StyledChip
        label="toggle selected"
        selected={selected}
        clickable
        onClick={() => setSelected(!selected)}
      />
      <StyledChip
        label="toggle selected"
        selected={selected}
        icon={<FaceIcon />}
        clickable
        onClick={() => setSelected(!selected)}
      />
      <StyledChip
        label="toggle selected"
        color="primary"
        selected={selected}
        icon={<FaceIcon />}
        clickable
        onClick={() => setSelected(!selected)}
      />
      <StyledChip
        label="toggle selected"
        selected={selected}
        clickable
        onClick={() => setSelected(!selected)}
        variant="outlined"
      />
      <StyledChip
        label="toggle selected"
        selected={selected}
        icon={<FaceIcon />}
        clickable
        onClick={() => setSelected(!selected)}
        variant="outlined"
      />
      <StyledChip
        label="toggle selected"
        color="primary"
        selected={selected}
        icon={<FaceIcon />}
        clickable
        onClick={() => setSelected(!selected)}
        variant="outlined"
      />
    </StoryLayout>
  );
}

export const SelectedChips = () => <SelectedDemo />;

export const BasicSelectedChips = () => (
  <StoryLayout>
    <div style={{ display: 'flex' }}>
      <StyledChip label="toggle selected" selected />
      <StyledChip label="toggle selected" selected icon={<FaceIcon />} />
      <StyledChip
        label="toggle selected"
        color="primary"
        selected
        icon={<FaceIcon />}
      />
      <StyledChip label="toggle selected" selected variant="outlined" />
      <StyledChip
        label="toggle selected"
        selected
        icon={<FaceIcon />}
        variant="outlined"
      />
      <StyledChip
        label="toggle selected"
        color="primary"
        selected
        icon={<FaceIcon />}
        variant="outlined"
      />
    </div>
  </StoryLayout>
);
