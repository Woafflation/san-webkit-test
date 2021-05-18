import { Cache, schemeCacheSetter, getCacheScheme } from './cache'
const fetch = process.browser ? window.fetch : require('node-fetch')

export type QueryOptions = {
  cache?: boolean
  /** Caching time in seconds */ cacheTime?: number
  precacher?: (...args: any[]) => any
  variables?: {
    [key: string]: any
  }
}

export type QueryData<T = string> = {
  /** @private */ __query: T
}
export type Query<T extends string, U> = QueryData<T> & U
export type QueryKey<T extends QueryData> = T['__query']
export type QueryRecord<T extends QueryData | null> = Record<
  QueryKey<NonNullable<T>>,
  T
>

export type Data<T extends QueryData> = {
  data: QueryRecord<T>
  errors?: any
}

export const HEADERS = {
  'Content-Type': 'application/json',
  authorization: null,
}

const dataAccessor = <T extends QueryData>({
  data,
  errors,
}: Data<T>): Promise<QueryRecord<T>> =>
  errors ? Promise.reject(errors) : Promise.resolve(data)
const jsonAccessor = <T extends QueryData>(
  response: Response,
): Promise<Data<T>> => response.json()

export function query<T extends QueryData | null>(
  scheme: string,
  options?: QueryOptions,
  requestOptions?: RequestInit,
): Promise<QueryRecord<T>> {
  const isWithCache = process.browser && options?.cache !== false

  if (isWithCache) {
    const cachedScheme = getCacheScheme(scheme, options)
    const data = Cache.get<T>(cachedScheme)
    if (data) return Promise.resolve(data)

    const inFlightQuery = Cache.getInFlightQuery<T>(cachedScheme)
    if (inFlightQuery) return inFlightQuery
  }

  let request = fetch(process.env.GQL_SERVER_URL, {
    headers: HEADERS,
    body: JSON.stringify({
      query: scheme,
      variables: options?.variables || null,
      operationName: null,
    }),
    ...requestOptions,
    method: 'post',
    credentials: 'include',
  })
    .then(jsonAccessor)
    .then(dataAccessor) as Promise<QueryRecord<T>>

  if (isWithCache) {
    const precacher = options?.precacher
    request = (
      precacher ? request.then(precacher(options?.variables)) : request
    ).then(schemeCacheSetter<NonNullable<T>>(scheme, options))

    Cache.setInFlightQuery(scheme, options, request)
  }

  return request
}

export function mutate<T extends QueryData>(
  scheme: string,
  options?: QueryOptions,
): Promise<QueryRecord<T>> {
  return query<T>(scheme, Object.assign({ cache: false }, options))
}

type Callback = (...args: any[]) => any
export function newSSRQuery<T extends Callback>(clb: T) {
  return (...args): ReturnType<T> =>
    clb(
      ...args.slice(0, -1),
      process.browser
        ? undefined
        : {
            headers: {
              ...HEADERS,
              cookie: args[args.length - 1].req.headers.cookie,
            },
          },
    )
}
