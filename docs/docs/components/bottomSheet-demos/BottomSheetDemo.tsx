import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Button from '@sinoui/core/Button';
import BottomSheet from '@sinoui/core/BottomSheet';
import List from '@sinoui/core/List';
import ListItem from '@sinoui/core/ListItem';
import ListItemText from '@sinoui/core/ListItemText';
import ListItemPrimaryAction from '@sinoui/core/ListItemPrimaryAction';
import Divider from '@sinoui/core/Divider';
import IconButton from '@sinoui/core/IconButton';
import BookmarkBorder from '@sinoui/icons/BookmarkBorder';

function BottomSheetDemo(props: any) {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  const onBackdropClick = () => {
    setOpen(false);
  };
  const listData = [1, 2, 3];
  const content = (
    <List>
      {listData.map((item) => (
        <React.Fragment key={item}>
          <ListItem>
            <ListItemPrimaryAction>
              <IconButton color="primary">
                <BookmarkBorder />
              </IconButton>
            </ListItemPrimaryAction>
            <ListItemText>item{item}</ListItemText>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );

  const {
    onBackdropClick: onBackdropClickProps,
    backdrop: backdropProps,
  } = props;
  return (
    <ThemeProvider theme={defaultTheme}>
      {onBackdropClickProps && <Button>CLICK</Button>}
      <BottomSheet
        open={open}
        onBackdropClick={onBackdropClickProps && onBackdropClick}
        backdrop={backdropProps}
        {...props}
      >
        {content}
      </BottomSheet>
    </ThemeProvider>
  );
}

export default BottomSheetDemo;
