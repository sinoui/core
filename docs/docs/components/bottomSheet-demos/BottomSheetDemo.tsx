import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Button from '@sinoui/core/Button';
import BottomSheet from '@sinoui/core/BottomSheet';
import List from '@sinoui/core/List';
import ListItem from '@sinoui/core/ListItem';
import ListItemText from '@sinoui/core/ListItemText';
import ListItemPrimaryAction from '@sinoui/core/ListItemPrimaryAction';
import SvgIcon from '@sinoui/core/SvgIcon';
import { MdShare, MdInsertLink, MdModeEdit, MdDelete } from 'react-icons/md';

const listData = [
  { icon: MdShare, text: 'Share' },
  { icon: MdInsertLink, text: 'Get link' },
  { icon: MdShare, text: 'Share' },
  { icon: MdModeEdit, text: 'Edit name' },
  { icon: MdDelete, text: 'Delete collection' },
];

const listScrollData = listData.concat(listData, listData);

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

function BottomSheetDemo(props: any) {
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

  const { backdrop: backdropProps, listScroll } = props;
  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ width: '300px' }}>
        <Button onClick={onClick}>CLICK</Button>
        <BottomSheet
          open={open}
          onBackdropClick={onBackdropClick}
          backdrop={backdropProps}
          {...props}
        >
          <Content
            onClick={onItemClick}
            data={listScroll ? listScrollData : listData}
          />
        </BottomSheet>
      </div>
    </ThemeProvider>
  );
}

export default BottomSheetDemo;
