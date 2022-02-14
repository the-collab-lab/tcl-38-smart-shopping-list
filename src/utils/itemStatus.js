import { Timestamp } from 'firebase/firestore';

export default function itemStatus(item) {
  //no purchase history
  if (!item.data['last purchased']) {
    if (item.data['next purchase'] === 7) return 'soon';
    if (item.data['next purchase'] === 14) return 'kind of soon';
    if (item.data['next purchase'] === 30) return 'not soon';
  }
  // double the estimated purchase interval
  const daysSinceLastPurchased = item.data['last purchased']
    ? Math.round((Timestamp.now() - item.data['last purchased']) / 86400)
    : 0;
  if (daysSinceLastPurchased >= item.data['estimated purchase interval'] * 2)
    return 'inactive';
  // 1 purchase only
  if (item.data['total purchases'] === 1) return 'inactive';
  // 2 or more purchases
  if (item.data['total purchases'] > 1) {
    if (item.data['estimated purchase interval'] < 7) return 'soon';
    if (item.data['estimated purchase interval'] <= 30) return 'kind of soon';
    if (item.data['estimated purchase interval'] > 30) return 'not soon';
  }
}
