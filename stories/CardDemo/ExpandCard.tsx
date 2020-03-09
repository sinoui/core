import React, { useState } from 'react';
import {
  MdMoreVert,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md';
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
  const [expand, setExpand] = useState(false);
  return (
    <Card style={{ maxWidth: '345px' }}>
      <CardPrimaryAction>
        <CardHeader
          avatar={<Avatar />}
          action={<MdMoreVert />}
          title="Shrimp and Chorizo Paella"
          subheader="subheader"
        />
        <CardMedia imageUrl={mediaImgUrl} wide />
        <CardContent>
          Heat 1/2 cup of the broth in a pot until simmering, add saffron and
          set aside for 10 minutes.
        </CardContent>
      </CardPrimaryAction>
      <CardActions>
        <CardActionButtons>
          <button>read</button>
          <button>bookmark</button>
        </CardActionButtons>
        <CardActionIcons>
          <span onClick={() => setExpand(!expand)}>
            {!expand && <MdKeyboardArrowDown />}
            {expand && <MdKeyboardArrowUp />}
          </span>
        </CardActionIcons>
      </CardActions>
      {expand && (
        <CardContent>
          展开显示的文字文字文字文字文字文字文字文字文字文字文字文字文字文字
        </CardContent>
      )}
    </Card>
  );
}
