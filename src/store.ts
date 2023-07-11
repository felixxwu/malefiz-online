import { svg, translateGroup, zoomGroup } from './getSVG'

const init = {
  mouseDownData: <
    { coords: { x: number; y: number }; svgTranslation: { x: number; y: number } } | null
  >null,
  svgTranslation: { x: 0, y: 0 },
  svgZoom: 1,
}

const onChange: Type<keyof typeof init> = {
  mouseDownData(value) {
    if (value) {
      svg!.style.cursor = 'grab'
    } else {
      svg!.style.cursor = 'default'
    }
  },
  svgTranslation(value) {
    translateGroup!.style.transform = `translate(${value.x}px, ${value.y}px)`
  },
  svgZoom(value) {
    zoomGroup!.style.transform = `scale(${value})`
    zoomGroup!.style.transformOrigin = `50% 50%`
  },
}

export const store: typeof init = new Proxy(init, {
  get<T>(target: T, key: keyof T) {
    return target[key]
  },
  set<T extends typeof store>(target: T, key: keyof T, value: T[keyof T]) {
    target[key] = value
    onChange[key]?.(value)
    return true
  },
})

type Type<T extends keyof typeof init> = {
  [key in T]?: (value: (typeof init)[key]) => void
}
