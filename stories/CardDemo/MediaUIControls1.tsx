import React from 'react';
import styled from 'styled-components';
import { MdStar, MdStarBorder } from 'react-icons/md';
import Card from '@sinoui/core/Card';
import CardMedia from '@sinoui/core/CardMedia';
import CardContent from '@sinoui/core/CardContent';
import CardActions from '@sinoui/core/CardActions';
import CardActionButtons from '@sinoui/core/CardActionButtons';
import CardActionIcons from '@sinoui/core/CardActionIcons';
import StyledCardInner from './Components/StyledCardInner';
import { mediaAvatar } from './constant';

const StyledCardContent = styled(CardContent)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`;

export default function Demo() {
  return (
    <Card>
      <StyledCardInner>
        <CardMedia
          imageUrl={mediaAvatar}
          width={162}
          style={{ borderRadius: '4px 0 0 0' }}
        />
        <StyledCardContent>
          <h5>Rozes</h5>
          <h6>Mac Miller</h6>
        </StyledCardContent>
      </StyledCardInner>

      <CardActions>
        <CardActionButtons>Rate this album</CardActionButtons>
        <CardActionIcons>
          <MdStar />
          <MdStar />
          <MdStarBorder />
        </CardActionIcons>
      </CardActions>
    </Card>
  );
}
