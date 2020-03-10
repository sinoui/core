import React from 'react';
import { MdShare, MdMoreVert } from 'react-icons/md';
import Card from '@sinoui/core/Card';
import CardMedia from '@sinoui/core/CardMedia';
import CardContent from '@sinoui/core/CardContent';
import CardPrimaryAction from '@sinoui/core/CardPrimaryAction';
import CardActions from '@sinoui/core/CardActions';
import CardActionButtons from '@sinoui/core/CardActionButtons';
import CardActionIcons from '@sinoui/core/CardActionIcons';
import Button from '@sinoui/core/Button';
import SvgIcon from '@sinoui/core/SvgIcon';
import IconButton from '@sinoui/core/IconButton';
import { mediaImgUrl } from './constant';

export default function Demo() {
  return (
    <Card>
      <CardPrimaryAction>
        <CardMedia imageUrl={mediaImgUrl} wide />
        <CardContent>主要内容</CardContent>
      </CardPrimaryAction>
      <CardActions>
        <CardActionButtons>
          <Button>read</Button>
          <Button>bookmark</Button>
        </CardActionButtons>
        <CardActionIcons>
          <IconButton color="primary">
            <SvgIcon as={MdShare} />
          </IconButton>
          <IconButton color="warning">
            <SvgIcon as={MdMoreVert} />
          </IconButton>
        </CardActionIcons>
      </CardActions>
    </Card>
  );
}
