import React from 'react';
import Chip from '../Chip';
import type { RenderTagsProps } from './types';

interface Props {
  /**
   * 标签
   */
  tags?: string[];
  /**
   * 删除标签的回调函数
   */
  onRemoveTag: (index: number) => void;
  /**
   * 点击标签的回调函数
   */
  onClickTag: (index: number) => void;
  /**
   * 当前聚焦的标签
   */
  focused?: number;
  /**
   * 指定标签形态
   */
  variant?: 'standard' | 'outlined';
  renderTags?: (props: RenderTagsProps) => React.ReactNode;
}

const defaultRenderTags = (props: RenderTagsProps) => {
  const { tags, getTagProps } = props;
  return tags.map((tag, index) => <Chip key={tag} {...getTagProps(index)} />);
};

/**
 * 自动完成中的标签列表
 */
export default function AutoCompleteTags(props: Props) {
  const {
    tags = [],
    onRemoveTag,
    focused,
    onClickTag,
    renderTags = defaultRenderTags,
    ...rest
  } = props;

  const handleDeleteTag = (index: number) => (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    onRemoveTag(index);
  };

  const handleClickTag = (index: number) => () => onClickTag(index);

  const getTagProps = (index: number) => ({
    onClick: handleClickTag(index),
    onDelete: handleDeleteTag(index),
    label: tags[index],
    'data-tag-index': index,
    tabIndex: '-1',
    role: 'button',
    ...rest,
  });
  return <>{renderTags({ tags, getTagProps })}</>;
}
