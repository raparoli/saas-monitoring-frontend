export const formatStorageGB = (gb: number): string => {
  const safeGb = typeof gb === 'number' && !isNaN(gb) ? gb : 0;
  if (safeGb >= 1000) {
    return `${(safeGb / 1000).toFixed(1)} TB`;
  }
  return `${safeGb.toLocaleString()} GB`;
};

export const formatDate = (dateString: string): string => {
  if (!dateString || typeof dateString !== 'string' || dateString.trim() === '') return 'Invalid Date';
  try {
    const date = new Date(dateString.trim());
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return 'Invalid Date';
  }
};

export const formatDateTime = (dateString: string): string => {
  if (!dateString || typeof dateString !== 'string' || dateString.trim() === '') return 'Invalid Date';
  try {
    const date = new Date(dateString.trim());
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return 'Invalid Date';
  }
};

export const getInitials = (name: string): string => {
  if (!name || typeof name !== 'string' || name.trim() === '') return 'U';
  const trimmedName = name.trim();
  if (!trimmedName) return 'U';
  return trimmedName.split(' ').filter(n => n && n.length > 0).map(n => n[0]).join('').toUpperCase() || 'U';
};

export const getDaysUntilRenewal = (renewalDate: string): number => {
  if (!renewalDate || typeof renewalDate !== 'string' || renewalDate.trim() === '') return 0;
  try {
    const renewal = new Date(renewalDate.trim());
    if (isNaN(renewal.getTime())) return 0;
    const today = new Date();
    const diffTime = renewal.getTime() - today.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return isNaN(days) ? 0 : days;
  } catch {
    return 0;
  }
};

export const getUsagePercentage = (used: number, total: number): number => {
  const safeUsed = typeof used === 'number' ? used : 0;
  const safeTotal = typeof total === 'number' ? total : 0;
  if (!safeTotal || safeTotal === 0 || isNaN(safeTotal) || isNaN(safeUsed)) return 0;
  const percentage = Math.round((safeUsed / safeTotal) * 100);
  return isNaN(percentage) ? 0 : Math.max(0, Math.min(100, percentage));
};