import { getSavedJson, saveJson } from './localStorage'

const KEY = 'RECENT_ITEMS'

enum RecentType {
  CHART_LAYOUT = 'chart_layout',
  WATCHLIST = 'watchlist',
  SCREENER = 'screener',
}

type Recent = {
  [key: string]: any
  type: RecentType
  id: number
}

export const getRecents = (maxAmount = 30) =>
  (getSavedJson<Recent[]>(KEY, []) || []).slice(0, maxAmount)

export const saveRecents = (recents: Recent[], maxAmount = 30) =>
  saveJson(KEY, recents.slice(0, maxAmount))

export const removeRecent = (type: RecentType, id: number | string) =>
  getRecents().filter((recent) => recent.type === type && recent.id === id)

export function addRecent(type: RecentType, id: number, maxAmount = 30) {
  return saveRecents([{ type, id }, ...removeRecent(type, id)], maxAmount)
}
