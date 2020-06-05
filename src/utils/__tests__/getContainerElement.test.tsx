import React from 'react';
import getContainerElement from '../getContainerElement';

it('dom元素', () => {
  const container = document.createElement('div');
  expect(getContainerElement(container)).toBe(container);
});

it('ref', () => {
  const containerRef = React.createRef<HTMLElement>();
  (containerRef as any).current = document.createElement('div');
  expect(getContainerElement(containerRef)).toBe(containerRef.current);
});

it('null', () => {
  expect(getContainerElement(null)).toBe(document.body);
});

it('undefined', () => {
  expect(getContainerElement(undefined)).toBe(document.body);
});

it('ref为空', () => {
  const containerRef = React.createRef<HTMLElement>();
  expect(getContainerElement(containerRef)).toBe(document.body);
});

it('() => dom', () => {
  const container = document.createElement('div');
  expect(getContainerElement(() => container)).toBe(container);
});

it('() => ref', () => {
  const containerRef = React.createRef<HTMLElement>();
  (containerRef as any).current = document.createElement('div');
  expect(getContainerElement(() => containerRef)).toBe(containerRef.current);
});

it('() => null', () => {
  expect(getContainerElement(() => null)).toBe(document.body);
});

it('() => undefined', () => {
  expect(getContainerElement(() => undefined)).toBe(document.body);
});

it('() => ref为空', () => {
  const containerRef = React.createRef<HTMLElement>();
  expect(getContainerElement(() => containerRef)).toBe(document.body);
});
