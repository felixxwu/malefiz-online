import { translateGroup } from './getSVG'

export function createCircle(x: number, y: number) {
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  circle.setAttribute('cx', x.toString())
  circle.setAttribute('cy', y.toString())
  circle.setAttribute('r', '10')
  circle.setAttribute('fill', 'black')
  translateGroup!.appendChild(circle)
}
