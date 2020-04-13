import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Card from '@sinoui/core/Card';
import BaseInput from '@sinoui/core/BaseInput';
import IconButton from '@sinoui/core/IconButton';
import Divider from '@sinoui/core/Divider';
import MenuIcon from '@sinoui/icons/Menu';
import SearchIcon from '@sinoui/icons/Search';
import DirectionsIcon from '@sinoui/icons/Directions';
import Demo from '../../commons/Demo';

const Wrapper = styled(Card)`
  width: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: flex-start;
  padding: 2px 4px;
`;

const SearchInput = styled(BaseInput)`
  flex: 1;
  margin-left: 8px;
`;

function CustomizedBaseInput() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Demo>
        <Wrapper as="form">
          <IconButton color="textSecondary">
            <MenuIcon />
          </IconButton>
          <SearchInput placeholder="搜索人员信息" name="searchText" />
          <IconButton type="submit" color="textSecondary">
            <SearchIcon />
          </IconButton>
          <Divider vertical flexItem marginVertical={8} marginHorizontal={4} />
          <IconButton color="primary">
            <DirectionsIcon />
          </IconButton>
        </Wrapper>
      </Demo>
    </ThemeProvider>
  );
}

export default CustomizedBaseInput;
