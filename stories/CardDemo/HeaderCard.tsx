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
import Avatar from './Components/Avatat';
import { mediaImgUrl } from './constant';

export default function Demo() {
  return (
    <Card>
      <CardPrimaryAction>
        <CardHeader
          avatar={<Avatar />}
          action={<MdMoreVert />}
          title="Shrimp and Chorizo Paella"
          subheader="subheader"
        />
        <CardMedia imageUrl={mediaImgUrl} wide />
        <CardContent>content</CardContent>
      </CardPrimaryAction>
      <CardActions>
        <CardActionButtons>
          <button>read</button>
          <button>bookmark</button>
        </CardActionButtons>
        <CardActionIcons>
          <MdShare />
          <MdMoreVert />
        </CardActionIcons>
      </CardActions>
    </Card>
  );
}
