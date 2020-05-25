import React from 'react';
import List from '@sinoui/core/List';
import ListItem from '@sinoui/core/ListItem';
import ListItemText from '@sinoui/core/ListItemText';
import styled from 'styled-components';
import { Props, RenderOption, Option } from './types';

const MaxHeightList = styled(List)`
  max-height: 40vh;
  overflow: auto;
`;

const GroupContent = styled(ListItem)`
  display: block;
  padding: 0;

  &:hover {
    ::before {
      background-color: transparent;
    }
  }
`;

const GroupList = styled(List)`
  padding: 0px;
`;

const GroupTitle = styled.div`
  color: ${({ theme }) => theme.palette.text.secondary};
  background-color: ${({ theme }) => theme.palette.background.paper};
  line-height: 48px;
  padding: 0 16px;
  position: sticky;
  z-index: 1;
  top: -8px;
`;

export default function OptionList(props: Props) {
  const {
    options: OptionsProp = [],
    groupBy,
    getOptionLabel,
    renderOption: renderOptionProp,
    renderGroup: renderGroupProp,
  } = props;

  const renderOption = renderOptionProp || getOptionLabel;

  const renderListOption = (option: RenderOption) => {
    const { options = [] } = option;
    return options.map((item: Option) => (
      <ListItem key={renderOption(item)}>
        <ListItemText>{renderOption(item)}</ListItemText>
      </ListItem>
    ));
  };

  const defaultRenderGroup = (option: RenderOption) => {
    return (
      <GroupContent key={option.key} disabledRipple>
        <GroupTitle>{option.groupTitle}</GroupTitle>
        <GroupList>{renderListOption(option)}</GroupList>
      </GroupContent>
    );
  };

  const renderGroup = renderGroupProp || defaultRenderGroup;
  return (
    <MaxHeightList>
      {OptionsProp.map((option) => {
        if (groupBy) {
          return renderGroup(option);
        }

        return renderListOption(option);
      })}
    </MaxHeightList>
  );
}
