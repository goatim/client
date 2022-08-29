export function formatPercentage(percentage = 0): string {
  return `${(percentage / 100).toFixed(2)}%`;
}

export function formatPercentageVariation(variation = 0): string {
  if (variation > 0) {
    return `+${formatPercentage(variation)}`;
  }
  return formatPercentage(variation);
}
