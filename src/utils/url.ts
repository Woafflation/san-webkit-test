const NON_WORDS_REGEX = /[\W_]+/g
const SPACES_REGEX = /\s/g

export const getIdFromSEOLink = (link: string): number =>
  parseInt(link.slice(link.lastIndexOf('-') + 1), 10)

export const getSEOLinkFromIdAndTitle = (id: string | number, title?: string | null): string =>
  title
    ? encodeURIComponent(
        `${title
          .replace(NON_WORDS_REGEX, ' ')
          .trim()
          .replace(SPACES_REGEX, '-')
          .toLowerCase()}-${id}`,
      )
    : `${id}`

export function parse(queryString: string) {
  const qs = queryString.startsWith('?') ? queryString.slice(1) : queryString
  const entries = qs.split('&')

  const result = {}
  for (let i = 0, len = entries.length; i < len; i++) {
    const [key, value] = entries[i].split('=')
    result[decodeURIComponent(key)] = decodeURIComponent(value)
  }
  return result
}
