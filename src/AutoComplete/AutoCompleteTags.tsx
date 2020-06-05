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
  /**
   * 如果设置为`true`，则为密集模式
   */
  dense?: boolean;
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

  const handleKeyDown = (index: number) => (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    const { key, target } = event;
    if (key === 'Backspace' && document.activeElement === target) {
      onRemoveTag(index);
    }
  };

  const getTagProps = (index: number) => ({
    onClick: handleClickTag(index),
    onDelete: handleDeleteTag(index),
    onKeyDown: handleKeyDown(index),
    label: tags[index],
    'data-tag-index': index,
    tabIndex: '-1',
    role: 'button',
    ...rest,
  });
  return <>{renderTags({ tags, getTagProps })}</>;
}
