import React from 'react';
import { MdShare, MdMoreVert } from 'react-icons/md';
import Card from '@sinoui/core/Card';
import CardHeader from '@sinoui/core/CardHeader';
import CardMedia from '@sinoui/core/CardMedia';
import CardContent from '@sinoui/core/CardContent';
import CardPrimaryAction from '@sinoui/core/CardPrimaryAction';
import CardActions from '@sinoui/core/CardActions';
import CardActionButtons from '@sinoui/core/CardActionButtons';
import CardActionIcons from '@sinoui/core/CardActionIcons';
import Button from '@sinoui/core/Button';
import SvgIcon from '@sinoui/core/SvgIcon';
import IconButton from '@sinoui/core/IconButton';
import Avatar from './Components/Avatat';
import { mediaImgUrl } from './constant';

export default function Demo() {
  return (
    <Card style={{ width: '344px' }}>
      <CardHeader
        avatar={<Avatar />}
        action={
          <IconButton>
            <SvgIcon as={MdMoreVert} />
          </IconButton>
        }
        title="Shrimp and Chorizo PaellShrimp and Chorizo Paella"
        subheader="subheader"
      />
      <CardPrimaryAction>
        <CardMedia imageUrl={mediaImgUrl} wide />
        <CardContent>content</CardContent>
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
