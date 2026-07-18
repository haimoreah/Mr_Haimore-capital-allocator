const formatter = new Intl.NumberFormat('ar-EG', {
  maximumFractionDigits: 0,
})

export function formatNumber(value: number): string {
  return formatter.format(value)
}
