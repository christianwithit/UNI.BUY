export const CATEGORIES = [
  'Phones',
  'Laptops',
  'TVs',
  'Tablets',
  'Headphones',
  'Accessories',
];

export const CONDITIONS = [
  'New',
  'Like New',
  'Good',
  'Fair',
];

export const PRICE_RANGES = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $250', min: 100, max: 250 },
  { label: '$250+', min: 250, max: 10000 },
];

export const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'venmo', name: 'Venmo', icon: '📱' },
  { id: 'cash', name: 'Cash on Pickup', icon: '💵' },
];

export const CONTACT_METHODS = [
  { id: 'message', name: 'Message on UNI.BUY', icon: '💬', description: 'Chat directly in the app' },
  { id: 'email', name: 'Email', icon: '📧', description: 'Send an email' },
  { id: 'phone', name: 'Phone', icon: '📞', description: 'Call or text' },
];
