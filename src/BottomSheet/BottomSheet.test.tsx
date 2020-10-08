import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Button from '@sinoui/core/Button';
import BottomSheet from '@sinoui/core/BottomSheet';
import List from '@sinoui/core/List';
import ListItem from '@sinoui/core/ListItem';
import ListItemText from '@sinoui/core/ListItemText';
import ListItemPrimaryAction from '@sinoui/core/ListItemPrimaryAction';
import SvgIcon from '@sinoui/core/SvgIcon';
import { MdShare, MdInsertLink, MdModeEdit, MdDelete } from 'react-icons/md';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';

/**
 * BottomSheet组件 测试
 */

const listData = [
  { icon: MdShare, text: 'Share' },
  { icon: MdInsertLink, text: 'Get link' },
  { icon: MdShare, text: 'Share' },
];

const listScrollData = [
  ...listData,
  ...[
    { icon: MdModeEdit, text: 'Edit name' },
    { icon: MdDelete, text: 'Delete collection' },
    { icon: MdShare, text: 'Share' },
    { icon: MdInsertLink, text: 'Get link' },
    { icon: MdShare, text: 'Share' },
  ],
];

const Content = (props: any) => {
  const { data, onClick } = props;
  return (
    <List>
      {data.map((item: any, index: number) => (
        <React.Fragment key={index.toString()}>
          <ListItem onClick={onClick}>
            <ListItemPrimaryAction>
              <SvgIcon as={item.icon} color="textSecondary" />
            </ListItemPrimaryAction>
            <ListItemText>{item.text}</ListItemText>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};

function BottomSheetBasicDemo() {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  const onItemClick = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={onClick}>CLICK</Button>
      <BottomSheet open={open}>
        <Content data={listData} onClick={onItemClick} />
      </BottomSheet>
    </>
  );
}

function BottomSheetDemo() {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  const onBackdropClick = () => {
    setOpen(false);
  };

  const onItemClick = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={onClick}>CLICK</Button>
      <BottomSheet open={open} onBackdropClick={onBackdropClick}>
        <Content data={listData} onClick={onItemClick} />
      </BottomSheet>
    </>
  );
}

function BottomSheetScrollDemo() {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  const onBackdropClick = () => {
    setOpen(false);
  };

  const onItemClick = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={onClick}>CLICK</Button>
      <BottomSheet open={open} onBackdropClick={onBackdropClick}>
        <Content data={listScrollData} onClick={onItemClick} />
      </BottomSheet>
    </>
  );
}

const BottomSheetColor = styled(BottomSheet)<{ color?: string }>`
  > ul li {
    background-color: ${({ theme, color }) => getColorFromTheme(theme, color)};
    color: #fff;
  }
  > ul li svg {
    color: #fff;
  }
`;

function BottomSheetBasicColorDemo() {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  const onItemClick = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={onClick}>CLICK</Button>
      <BottomSheetColor open={open} color="success">
        <Content data={listData} onClick={onItemClick} />
      </BottomSheetColor>
    </>
  );
}

describe('BottomSheet组件 快照测试', () => {
  it('基本使用', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <BottomSheetBasicDemo />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('点击遮罩层事件', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <BottomSheetDemo />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('内容超出屏幕一半显示滚动条', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <BottomSheetScrollDemo />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('指定背景颜色', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <BottomSheetBasicColorDemo />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
