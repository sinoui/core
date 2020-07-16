/* eslint-disable no-underscore-dangle */
import activeElement from 'dom-helpers/activeElement';
import contains from 'dom-helpers/contains';

const isHTMLElement = (e: Node | null): e is HTMLElement =>
  !!e && 'parentElement' in e;

/**
 * 判断指定元素是否在模态框中
 *
 * @param node 节点
 */
export function findParentModal(node: Element | null) {
  let parent = isHTMLElement(node) ? node : null;

  while (isHTMLElement(parent) && parent.nodeName !== 'HTML') {
    if (parent.dataset.sinouiId === 'modal') {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
}

/**
 * 模态框信息
 */
export interface ModalInfo {
  /**
   * 模态框元素
   */
  node: HTMLElement;
  /**
   * 模态框内容
   */
  content: HTMLElement;
  /**
   * 装载模态框的容器
   */
  container: HTMLElement;
  /**
   * 自动获取焦点
   */
  autoFocus: boolean;
  /**
   * 设置焦点不离开模态框
   */
  enforceFocus: boolean;
}

/**
 * 模态框管理
 */
export default class ModalManager {
  /**
   * 所有展现的模态框
   */
  private readonly modals: ModalInfo[];

  /**
   * 在模态框之外的焦点元素
   */
  private activeElementOutModal: Element | null;

  /**
   * 在模态框内的焦点元素
   */
  private readonly activeElementsInModals: WeakMap<
    HTMLElement,
    HTMLElement | null
  >;

  /**
   * 模态框卸载时的回调函数
   */
  private readonly unmountCallbacksOfModals: WeakMap<HTMLElement, Function[]>;

  /**
   * 卸载模态框管理器的回调函数
   */
  private readonly unmountCallbacks: Function[];

  /**
   * 将焦点还给之前元素的定时器id
   */
  private focusLastActiveElementTimer = -1;

  constructor() {
    this.modals = [];
    this.activeElementOutModal = activeElement();
    this.activeElementsInModals = new WeakMap();
    this.unmountCallbacksOfModals = new WeakMap();
    this.unmountCallbacks = [];

    this.listenGlobalFocus();
  }

  private static _defaultModalManager?: ModalManager;

  public static defaultModalManager() {
    if (!this._defaultModalManager) {
      this._defaultModalManager = new ModalManager();
    }
    return this._defaultModalManager;
  }

  /**
   * 添加模态框
   *
   * @param modalNode 模态框元素
   */
  add(modal: ModalInfo) {
    const unmountCallbacks: Function[] = [];
    this.modals.push(modal);
    this.unmountCallbacksOfModals.set(modal.node, unmountCallbacks);
    if (modal.autoFocus) {
      this.focusModal(modal);
    }

    if (modal.enforceFocus) {
      unmountCallbacks.push(this.enforceFocusInModal(modal));
    }
  }

  /**
   * 删除模态框
   *
   * @param modalNode 模态框元素
   */
  remove(modalNode: HTMLElement) {
    const removedModal = this.modals.splice(
      this.modals.findIndex((modal) => modal.node === modalNode),
      1,
    )[0];
    const modal = this.modals[this.modals.length - 1];
    if (removedModal.autoFocus || (modal && modal.autoFocus)) {
      this.focusLastActiveElement();
    }
    // eslint-disable-next-line no-unused-expressions
    this.unmountCallbacksOfModals.get(modalNode)?.forEach((fn) => fn());
    this.unmountCallbacksOfModals.delete(modalNode);
    this.activeElementsInModals.delete(modalNode);
  }

  /**
   * 判断指定模态框是否为顶端模态框
   *
   * @param modalNode 模态框元素
   */
  isTopModal(modalNode: HTMLElement) {
    return (
      this.modals.length > 0 &&
      this.modals[this.modals.length - 1].node === modalNode
    );
  }

  destroy() {
    this.unmountCallbacks.forEach((fn) => fn());
  }

  /**
   * 监听全局聚焦事件，获取模态框之外的聚焦元素以及模态框内聚焦元素的变化
   */
  private listenGlobalFocus() {
    if (typeof window === 'undefined') {
      // 在SSR环境中不用监听
      return;
    }

    const callback = () => {
      const element = activeElement() as HTMLElement | null;
      const parentModal = findParentModal(element);
      if (!parentModal && this.modals.length === 0) {
        this.activeElementOutModal = element;
      } else if (parentModal) {
        this.activeElementsInModals.set(parentModal, element);
      }
    };

    document.body.addEventListener('focusin', callback, true);

    this.unmountCallbacks.push(() =>
      document.body.removeEventListener('focusin', callback, true),
    );
  }

  /**
   * 限制焦点离开模态框
   *
   * @param modal 模态框
   */
  private enforceFocusInModal(modal: ModalInfo) {
    const callback = () => {
      if (!this.isTopModal(modal.node)) {
        return;
      }
      setTimeout(() => {
        const currentActiveElement = activeElement();
        if (
          this.isTopModal(modal.node) &&
          currentActiveElement &&
          !contains(modal.content, currentActiveElement)
        ) {
          modal.content.focus();
        }
      });
    };

    modal.node.addEventListener('focusout', callback, true);

    return () => modal.node.removeEventListener('focusout', callback, true);
  }

  /**
   * 聚焦模态框
   *
   * @param modalNode 模态框元素
   */
  private focusModal(modal: ModalInfo) {
    const currentActiveElement = activeElement();
    if (
      !this.activeElementsInModals.get(modal.node) &&
      currentActiveElement &&
      !contains(modal.content, currentActiveElement)
    ) {
      modal.content.focus();
    }
  }

  /**
   * 聚焦之前的焦点元素。
   *
   * 此函数在模态框关闭时调用，将焦点还给之前的焦点元素。
   */
  private focusLastActiveElement() {
    clearTimeout(this.focusLastActiveElementTimer);
    this.focusLastActiveElementTimer = setTimeout(() => {
      const lastActiveElement = this.getActiveElementOfTopModal() as HTMLElement;
      if (lastActiveElement) {
        lastActiveElement.focus();
      }
    });
  }

  /**
   * 获取顶端模态框的焦点元素
   */
  private getActiveElementOfTopModal() {
    const topModal = this.modals[this.modals.length - 1];
    if (topModal) {
      return (
        this.activeElementsInModals.get(topModal.node) ??
        this.activeElementOutModal
      );
    }
    return this.activeElementOutModal;
  }
}
