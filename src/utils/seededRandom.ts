export function seededRandom(seed: string) {
  let sum = 17
  seed.split('').forEach((char, i) => {
    sum += char.charCodeAt(0) * (i + 1)
  })
  return (Math.sin(sum) + 1) / 2
}
