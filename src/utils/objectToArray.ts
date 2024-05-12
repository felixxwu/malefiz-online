export function objectToArray<K extends PropertyKey, A>(obj: { [P in K]: A }) {
  const keys = Object.keys(obj) as K[]
  return keys.map(key => ({ key, value: obj[key] }))
}
