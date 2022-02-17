import itemStatus from './itemStatus';
import { Timestamp } from 'firebase/firestore';

//item never purchased, selected soon
const item1 = {
  data: {
    name: 'item1',
    'next purchase': 7,
    'estimated purchase interval': 0,
    'last purchased': null,
    'total purchases': 0,
    token: 'sage window alpha',
  },
  id: 1,
};
//item never purchased, selected kind of soon
const item2 = {
  data: {
    name: 'item2',
    'next purchase': 14,
    'estimated purchase interval': 0,
    'last purchased': null,
    'total purchases': 0,
    token: 'sage window alpha',
  },
  id: 2,
};
//item never purchased, selected not soon
const item3 = {
  data: {
    name: 'item3',
    'next purchase': 30,
    'estimated purchase interval': 0,
    'last purchased': null,
    'total purchases': 0,
    token: 'sage window alpha',
  },
  id: 3,
};
//item purchased once
const item4 = {
  data: {
    name: 'item4',
    'next purchase': 7,
    'estimated purchase interval': 7,
    'last purchased': null,
    'total purchases': 1,
    token: 'sage window alpha',
  },
  id: 3,
};
// double the estimated purchase interval
const item5 = {
  data: {
    name: 'item5',
    'next purchase': 7,
    'estimated purchase interval': 2,
    'last purchased': Timestamp.fromDate(new Date('02/13/2022')),
    'total purchases': 2,
    token: 'sage window alpha',
  },
  id: 5,
};
// more than two purchases
const item6 = {
  data: {
    name: 'item6',
    'next purchase': 30,
    'estimated purchase interval': 12,
    'last purchased': null,
    'total purchases': 2,
    token: 'sage window alpha',
  },
  id: 6,
};

test('item1 returns soon', () => {
  expect(itemStatus(item1)).toBe('soon');
});

test('item2 returns kind of soon', () => {
  expect(itemStatus(item2)).toBe('kind of soon');
});

test('item3 returns not soon', () => {
  expect(itemStatus(item3)).toBe('not soon');
});

test('item4 returns inactive', () => {
  expect(itemStatus(item4)).toBe('inactive');
});

test('item5 returns inactive', () => {
  expect(itemStatus(item5)).toBe('inactive');
});

test('item6 returns kind of soon', () => {
  expect(itemStatus(item6)).toBe('kind of soon');
});
