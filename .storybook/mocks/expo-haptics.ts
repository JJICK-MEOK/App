export const ImpactFeedbackStyle = {
  Light: 'Light',
  Medium: 'Medium',
  Heavy: 'Heavy',
  Rigid: 'Rigid',
  Soft: 'Soft',
} as const;

export const NotificationFeedbackType = {
  Success: 'Success',
  Warning: 'Warning',
  Error: 'Error',
} as const;

export const impactAsync = () => Promise.resolve();
export const notificationAsync = () => Promise.resolve();
export const selectionAsync = () => Promise.resolve();
