import React, { useState } from 'react';
import Dialog from '@sinoui/core/Dialog';
import DialogTitle from '@sinoui/core/DialogTitle';
import DialogContent from '@sinoui/core/DialogContent';
import DialogActions from '@sinoui/core/DialogActions';
import Button from '@sinoui/core/Button';

export default function DialogDemo(props: any) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>CLICK</Button>
      <Dialog
        open={open}
        {...props}
        onRequestClose={() => props.onRequestClose && setOpen(false)}
        onBackdropClick={() => props.onBackdropClick && setOpen(false)}
      >
        <DialogTitle>Use Google location service</DialogTitle>
        <DialogContent>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>DISAGREE</Button>
          <Button onClick={() => setOpen(false)}>AGREE</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
