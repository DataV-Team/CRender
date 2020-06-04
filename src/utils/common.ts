// eslint-disable-next-line
export function deepClone<T = any>(obj: T, cache = new Map<any, any>([])): T {
  if (obj === null || typeof obj !== 'object') return obj

  if (cache.has(obj)) return cache.get(obj)

  // eslint-disable-next-line
  const clone: any = Array.isArray(obj) ? [] : {}
  cache.set(obj, clone)

  // @ts-ignore
  Object.keys(obj).forEach(key => (clone[key] = deepClone(obj[key], cache)))

  return clone
}
