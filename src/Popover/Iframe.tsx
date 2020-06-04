import styled from 'styled-components';

export interface Props {
  absolute?: boolean;
  scrolling?: any;
}

const Iframe = styled.iframe<Props>`
  position: ${(props: Props) => (props.absolute ? 'absolute' : 'fixed')};
  visibility: inherit;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
  z-index: -2;
  border-width: 0px;
  /* height:2000px; */
  filter: 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=70)';
`;

export default Iframe;
