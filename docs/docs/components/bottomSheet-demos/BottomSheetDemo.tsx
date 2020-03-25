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

function BottomSheetDemo(props: any) {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  const onBackdropClick = () => {
    setOpen(false);
  };
  const listData = [
    { icon: MdShare, text: 'Share' },
    { icon: MdInsertLink, text: 'Get link' },
    { icon: MdShare, text: 'Share' },
    { icon: MdModeEdit, text: 'Edit name' },
    { icon: MdDelete, text: 'Delete collection' },
  ];
  const content = (
    <List>
      {listData.map((item: any, index) => (
        <React.Fragment key={index.toString()}>
          <ListItem>
            <ListItemPrimaryAction>
              <SvgIcon as={item.icon} color="textSecondary" />
            </ListItemPrimaryAction>
            <ListItemText>{item.text}</ListItemText>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );

  const {
    // onBackdropClick: onBackdropClickNew,
    backdrop: backdropProps,
  } = props;
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
          {content}
        </BottomSheet>
      </div>
    </ThemeProvider>
  );
}

export default BottomSheetDemo;
