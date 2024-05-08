export function polygonToXY(i: number, spokes: number, spacing: number) {
  return {
    x: spacing * Math.cos(Math.PI * ((i * 2) / spokes) - Math.PI * 0.5),
    y: spacing * Math.sin(Math.PI * ((i * 2) / spokes) - Math.PI * 0.5),
  }
}
