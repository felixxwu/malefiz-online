export function objectMap<K extends PropertyKey, A, B>(
  obj: { [P in K]: A },
  fn: (value: A, key: K) => B
) {
  const keys = Object.keys(obj) as K[]
  const returnObj = {} as { [P in K]: B }
  keys.forEach(key => {
    returnObj[key] = fn(obj[key], key)
  })
  return returnObj
}
