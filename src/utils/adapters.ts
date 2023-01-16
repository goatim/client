export function formatPercentage(percentage?: number, fractionDigits = 2): string {
  return `${((percentage || 0) * 100).toFixed(fractionDigits)}%`;
}

export function formatPercentageVariation(variation?: number, fractionDigits = 2): string {
  if (variation && variation > 0) {
    return `+${formatPercentage(variation, fractionDigits)}`;
  }
  return formatPercentage(variation, fractionDigits);
}

export function formatScore(score: number) {
  return `${score} pts`;
}
