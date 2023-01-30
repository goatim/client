export function formatReferralCode(referralCode: string): string {
  return referralCode.replace(/^(.{3})/g, '$1 ');
}
