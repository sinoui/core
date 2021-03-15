/**
 * 展现的时间选项个数（为了生成可以无限滚动的时间选项列表定义的一个超大的选项个数）
 */
export const TIME_ITEM_COUNT = 10000;
/**
 * 时间选项的宽度
 */
export const TIME_ITEM_WIDTH = 56; // px
/**
 * 时间选项的高度
 */
export const TIME_ITEM_HEIGHT = 40; // px
/**
 * 时间选项列表的高度
 */
export const TIME_LIST_HEIGHT = 7 * TIME_ITEM_HEIGHT; // px

/**
 * 时间格式。形如：`1:23`、`01:03`。
 */
export const TIME_REGEXP = /^(\d{1,2}):(\d{1,2})$/;
