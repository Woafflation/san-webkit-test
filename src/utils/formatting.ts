const UsdFormatter = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

export const formatUsd = (amount: number): string =>
  UsdFormatter.format(amount / 100)

const SI_PREFIXES = {
  3: 'K',
  6: 'M',
  9: 'B',
  12: 'T',
} as const

export function millify(value: number, precision = 1): string {
  const str = Math.floor(value).toString()
  const { length } = str

  let exponent = 0
  for (let i = 3; i < length; i += 3) {
    exponent += 3
  }

  if (!exponent) {
    return str
  }

  if (exponent > 12) exponent = 12

  const mantissa = str.slice(0, -exponent)
  const exponentIndex = length - exponent
  const precised = precision
    ? '.' + str.slice(exponentIndex, exponentIndex + precision)
    : ''

  return +(mantissa + precised) + SI_PREFIXES[exponent]
}
