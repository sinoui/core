import React, { useRef } from 'react';
import List from '@sinoui/core/List';
import ListItem from '@sinoui/core/ListItem';
import ListItemText from '@sinoui/core/ListItemText';
import styled from 'styled-components';
import Progress from '@sinoui/core/Progress';
import { Props, RenderOption, Option } from './types';
import useMultiRefs from '../utils/useMultiRefs';

const MaxHeightList = styled(List)`
  max-height: 40vh;
  overflow: auto;
  padding: 0;
  margin-top: 8px;
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

const NoDataContent = styled.div`
  color: ${({ theme }) => theme.palette.text.secondary};
  background-color: ${({ theme }) => theme.palette.background.paper};
  line-height: 48px;
  padding: 0 16px;
`;

const LoadingLayout = styled.div`
  background-color: ${({ theme }) => theme.palette.background.paper};
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/**
 * 选项列表
 */
const OptionList = React.forwardRef<HTMLElement, Props>(function OptionList(
  props,
  ref,
) {
  const {
    options: optionsProp = [],
    groupBy,
    getOptionLabel,
    renderOption: renderOptionProp,
    renderGroup: renderGroupProp,
    ListboxComponent = MaxHeightList,
    selectedOptions,
    onOptionClick,
    loading,
    disabledOptions,
    ...rest
  } = props;

  const listRef = useRef<HTMLUListElement>(null);
  const handleRef = useMultiRefs(listRef, ref);

  const renderOption = renderOptionProp || getOptionLabel;

  const handleOptionClick = (label: string) => {
    if (onOptionClick) {
      onOptionClick(label);
    }
  };

  const renderListOption = (option: RenderOption) => {
    const { options = [] } = option;
    return options.length > 0 ? (
      options.map((item: Option, index) => (
        <ListItem
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          selected={
            selectedOptions &&
            selectedOptions.indexOf(getOptionLabel(item)) !== -1
          }
          disabled={
            disabledOptions &&
            disabledOptions.indexOf(getOptionLabel(item)) !== -1
          }
          onClick={() => handleOptionClick(getOptionLabel(item))}
        >
          <ListItemText>{renderOption(item)}</ListItemText>
        </ListItem>
      ))
    ) : (
      <NoDataContent>没有选项可供选择</NoDataContent>
    );
  };

  const defaultRenderGroup = (option: any) => {
    return (
      <GroupContent key={option.key} disabledRipple>
        <GroupTitle>{option.groupTitle}</GroupTitle>
        <GroupList>{option.children}</GroupList>
      </GroupContent>
    );
  };

  const renderGroup = renderGroupProp || defaultRenderGroup;
  return (
    <ListboxComponent
      ref={handleRef}
      {...rest}
      className="sinoui-auto-complete__option-list"
    >
      {loading ? (
        <LoadingLayout>
          <Progress />
        </LoadingLayout>
      ) : (
        optionsProp.map((option) => {
          if (groupBy) {
            return renderGroup({
              ...option,
              children: renderListOption(option),
            });
          }

          return renderListOption(option);
        })
      )}
    </ListboxComponent>
  );
});

export default OptionList;
