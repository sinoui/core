/* eslint-disable no-unused-expressions */
import { fireEvent } from '@testing-library/react';
import ModalManager, { findParentModal } from '../ModalManager';
import type { ModalInfo } from '../ModalManager';

let modalManager: ModalManager | undefined;

beforeEach(() => {
  modalManager = new ModalManager();
});

jest.useFakeTimers();

afterEach(() => {
  modalManager?.destroy();
  document.body.innerHTML = '';
  jest.clearAllTimers();
});

it('添加模态框', () => {
  const modal = {
    node: document.createElement('div'),
    content: document.createElement('div'),
    autoFocus: false,
    enforceFocus: false,
    container: document.body,
  };

  modalManager?.add(modal);

  expect(modalManager?.isTopModal(modal.node)).toBe(true);
});

it('删除模态框', () => {
  const modal = {
    node: document.createElement('div'),
    content: document.createElement('div'),
    autoFocus: false,
    enforceFocus: false,
    container: document.body,
  };

  modalManager?.add(modal);
  modalManager?.remove(modal.node);

  expect(modalManager?.isTopModal(modal.node)).toBe(false);
});

it('自动获取到焦点', () => {
  const modalContent = document.createElement('input');
  document.body.appendChild(modalContent);

  const modal = {
    node: document.createElement('div'),
    content: modalContent,
    autoFocus: true,
    enforceFocus: false,
    container: document.body,
  };

  modalManager?.add(modal);

  expect(document.activeElement).toBe(modalContent);
});

it('autoFocus = false时，焦点不变', () => {
  const modalContent = document.createElement('input');
  document.body.appendChild(modalContent);

  const modal = {
    node: document.createElement('div'),
    content: modalContent,
    autoFocus: false,
    enforceFocus: false,
    container: document.body,
  };

  modalManager?.add(modal);

  expect(document.activeElement).not.toBe(modalContent);
});

it('模态框中的元素自动获取焦点后，焦点不会转移到模态框中', () => {
  const modalNode = document.createElement('div');
  const modalContent = document.createElement('div');
  document.body.appendChild(modalNode);
  modalNode.appendChild(modalContent);
  const input = document.createElement('input');
  modalContent.appendChild(input);
  input.focus();

  const modal = {
    node: modalNode,
    content: modalContent,
    autoFocus: true,
    enforceFocus: false,
    container: document.body,
  };

  modalManager?.add(modal);

  expect(document.activeElement).toBe(input);
});

const createModal = (modalInfo?: Partial<ModalInfo>) => {
  const modalNode = document.createElement('div');
  modalNode.dataset.sinouiId = 'modal';
  const modalContent = document.createElement('div');
  modalContent.tabIndex = -1;
  document.body.appendChild(modalNode);
  modalNode.appendChild(modalContent);
  const input = document.createElement('input');
  modalContent.append(input);

  return {
    node: modalNode,
    content: modalContent,
    autoFocus: true,
    enforceFocus: false,
    container: document.body,
    ...modalInfo,
  };
};

it('删除模态框时，焦点还给之前的模态框', () => {
  const modal1 = createModal();
  const modal2 = createModal();

  modalManager?.add(modal1);
  fireEvent.focusIn(document.body);
  modalManager?.add(modal2);

  expect(document.activeElement).toBe(modal2.content);

  modalManager?.remove(modal2.node);

  jest.runAllTimers();

  expect(document.activeElement).toBe(modal1.content);
});

it('删除模态框，焦点还给之前模态框中的焦点元素', () => {
  const modal1 = createModal();
  const modal2 = createModal();

  modalManager?.add(modal1);
  (modal1.content.firstElementChild as HTMLElement).focus();
  fireEvent.focusIn(document.body);
  modalManager?.add(modal2);
  modalManager?.remove(modal2.node);

  jest.runAllTimers();

  expect(document.activeElement).toBe(modal1.content.firstElementChild);
});

it('删除模态框，焦点还给之前容器中的焦点元素', () => {
  const modal = createModal();
  const input = document.createElement('input');
  document.body.append(input);
  input.focus();
  fireEvent.focusIn(document.body);

  modalManager?.add(modal);
  modalManager?.remove(modal.node);

  jest.runAllTimers();

  expect(document.activeElement).toBe(input);
});

it('同时删除多个模态框', () => {
  const modal1 = createModal();
  const modal2 = createModal();
  const modal3 = createModal();

  modalManager?.add(modal1);
  fireEvent.focusIn(document.body);
  modalManager?.add(modal2);
  fireEvent.focusIn(document.body);
  modalManager?.add(modal3);
  fireEvent.focusIn(document.body);

  jest.spyOn(modal1.content, 'focus'); // 监听 modal1 的聚焦
  modalManager?.remove(modal3.node);
  modalManager?.remove(modal2.node);

  jest.runAllTimers();

  expect(modal1.content.focus).toBeCalledTimes(1);
  expect(document.activeElement).toBe(modal1.content);
});

it('将焦点限制在模态框中', () => {
  const modal = createModal({ enforceFocus: true });
  modalManager?.add(modal);

  const input = document.createElement('input');
  document.body.append(input);
  input.focus();
  fireEvent.focusIn(document.body);
  fireEvent.focusOut(modal.content);

  jest.runAllTimers();

  expect(document.activeElement).toBe(modal.content);
});

it('焦点可以转移到模态框中的元素', () => {
  const modal = createModal({ enforceFocus: true });
  modalManager?.add(modal);

  (modal.content.firstElementChild as HTMLElement).focus();
  fireEvent.focusIn(document.body);
  fireEvent.focusOut(modal.content);

  jest.runAllTimers();

  expect(document.activeElement).toBe(modal.content.firstElementChild);
});

it('不是顶端的模态框，不限制焦点移出', () => {
  const modal1 = createModal({ enforceFocus: true });
  const modal2 = createModal({ enforceFocus: true });

  modalManager?.add(modal1);
  modalManager?.add(modal2);

  modal1.content.focus();
  fireEvent.focusIn(document.body);
  fireEvent.focusOut(modal2.node);

  jest.runAllTimers();

  expect(document.activeElement).toBe(modal2.content);
});

describe('findParentModal', () => {
  it('获取模态框父节点', () => {
    const modal = document.createElement('div');
    modal.dataset.sinouiId = 'modal';
    const content = document.createElement('div');
    modal.appendChild(content);
    document.body.append(modal);

    expect(findParentModal(content)).toBe(modal);
    expect(findParentModal(modal)).toBe(modal);
  });

  it('指定不在模态框中的元素', () => {
    expect(findParentModal(document.body)).toBe(null);
  });
});
