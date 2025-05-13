export function getSecondsSince(startDate: Date): number {
  const now = new Date();
  return Math.floor((now.getTime() - startDate.getTime()) / 1000);
}
