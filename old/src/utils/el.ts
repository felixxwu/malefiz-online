import { RecursivePartial } from '../types/recursivePartial'

function el<T extends keyof HTMLElementTagNameMap>(tag: T) {
  return ({
    attributes,
    children,
  }: {
    attributes?: RecursivePartial<HTMLElementTagNameMap[T]>
    children?: Node[]
  }) => {
    const element = document.createElement(tag)
    setAttributes(element, attributes!)
    for (const child of children ?? []) {
      element.appendChild(child)
    }
    return element
  }
}

function elNS<T extends keyof SVGElementTagNameMap>(tag: T) {
  return ({
    attributes,
    children,
    readonlyAttributes,
  }: {
    attributes?: RecursivePartial<SVGElementTagNameMap[T]>
    readonlyAttributes?: { [key: string]: string }
    children?: Node[]
  }) => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag)
    setAttributes(element, attributes!)
    for (const attribute in readonlyAttributes ?? {}) {
      element.setAttribute(attribute, readonlyAttributes![attribute])
    }
    for (const child of children ?? []) {
      element.appendChild(child)
    }
    return element
  }
}

function setAttributes(element: any, attributes: any) {
  for (const attribute in attributes) {
    if (typeof attributes[attribute] === 'object') {
      setAttributes(element[attribute as any], attributes[attribute]!)
    } else {
      element[attribute as any] = attributes[attribute]!
    }
  }
}

export const a = el('a')
export const abbr = el('abbr')
export const address = el('address')
export const area = el('area')
export const article = el('article')
export const aside = el('aside')
export const audio = el('audio')
export const b = el('b')
export const base = el('base')
export const bdi = el('bdi')
export const bdo = el('bdo')
export const blockquote = el('blockquote')
export const body = el('body')
export const br = el('br')
export const button = el('button')
export const canvas = el('canvas')
export const caption = el('caption')
export const cite = el('cite')
export const code = el('code')
export const col = el('col')
export const colgroup = el('colgroup')
export const data = el('data')
export const datalist = el('datalist')
export const dd = el('dd')
export const del = el('del')
export const details = el('details')
export const dfn = el('dfn')
export const dialog = el('dialog')
export const div = el('div')
export const dl = el('dl')
export const dt = el('dt')
export const em = el('em')
export const embed = el('embed')
export const fieldset = el('fieldset')
export const figcaption = el('figcaption')
export const figure = el('figure')
export const footer = el('footer')
export const form = el('form')
export const h1 = el('h1')
export const h2 = el('h2')
export const h3 = el('h3')
export const h4 = el('h4')
export const h5 = el('h5')
export const h6 = el('h6')
export const head = el('head')
export const header = el('header')
export const hgroup = el('hgroup')
export const hr = el('hr')
export const html = el('html')
export const i = el('i')
export const iframe = el('iframe')
export const img = el('img')
export const input = el('input')
export const ins = el('ins')
export const kbd = el('kbd')
export const label = el('label')
export const legend = el('legend')
export const li = el('li')
export const link = el('link')
export const main = el('main')
export const map = el('map')
export const mark = el('mark')
export const menu = el('menu')
export const meta = el('meta')
export const meter = el('meter')
export const nav = el('nav')
export const noscript = el('noscript')
export const object = el('object')
export const ol = el('ol')
export const optgroup = el('optgroup')
export const option = el('option')
export const output = el('output')
export const p = el('p')
export const picture = el('picture')
export const pre = el('pre')
export const progress = el('progress')
export const q = el('q')
export const rp = el('rp')
export const rt = el('rt')
export const ruby = el('ruby')
export const s = el('s')
export const samp = el('samp')
export const script = el('script')
export const search = el('search')
export const section = el('section')
export const select = el('select')
export const slot = el('slot')
export const small = el('small')
export const source = el('source')
export const span = el('span')
export const strong = el('strong')
export const style = el('style')
export const sub = el('sub')
export const summary = el('summary')
export const sup = el('sup')
export const table = el('table')
export const tbody = el('tbody')
export const td = el('td')
export const template = el('template')
export const textarea = el('textarea')
export const tfoot = el('tfoot')
export const th = el('th')
export const thead = el('thead')
export const time = el('time')
export const title = el('title')
export const tr = el('tr')
export const track = el('track')
export const u = el('u')
export const ul = el('ul')
export const video = el('video')
export const wbr = el('wbr')

export const animate = elNS('animate')
export const animateMotion = elNS('animateMotion')
export const animateTransform = elNS('animateTransform')
export const circle = elNS('circle')
export const clipPath = elNS('clipPath')
export const defs = elNS('defs')
export const desc = elNS('desc')
export const ellipse = elNS('ellipse')
export const feBlend = elNS('feBlend')
export const feColorMatrix = elNS('feColorMatrix')
export const feComponentTransfer = elNS('feComponentTransfer')
export const feComposite = elNS('feComposite')
export const feConvolveMatrix = elNS('feConvolveMatrix')
export const feDiffuseLighting = elNS('feDiffuseLighting')
export const feDisplacementMap = elNS('feDisplacementMap')
export const feDistantLight = elNS('feDistantLight')
export const feDropShadow = elNS('feDropShadow')
export const feFlood = elNS('feFlood')
export const feFuncA = elNS('feFuncA')
export const feFuncB = elNS('feFuncB')
export const feFuncG = elNS('feFuncG')
export const feFuncR = elNS('feFuncR')
export const feGaussianBlur = elNS('feGaussianBlur')
export const feImage = elNS('feImage')
export const feMerge = elNS('feMerge')
export const feMergeNode = elNS('feMergeNode')
export const feMorphology = elNS('feMorphology')
export const feOffset = elNS('feOffset')
export const fePointLight = elNS('fePointLight')
export const feSpecularLighting = elNS('feSpecularLighting')
export const feSpotLight = elNS('feSpotLight')
export const feTile = elNS('feTile')
export const feTurbulence = elNS('feTurbulence')
export const filter = elNS('filter')
export const foreignObject = elNS('foreignObject')
export const g = elNS('g')
export const image = elNS('image')
export const line = elNS('line')
export const linearGradient = elNS('linearGradient')
export const marker = elNS('marker')
export const mask = elNS('mask')
export const metadata = elNS('metadata')
export const mpath = elNS('mpath')
export const path = elNS('path')
export const pattern = elNS('pattern')
export const polygon = elNS('polygon')
export const polyline = elNS('polyline')
export const radialGradient = elNS('radialGradient')
export const rect = elNS('rect')
export const set = elNS('set')
export const stop = elNS('stop')
export const svg = elNS('svg')
export const symbol = elNS('symbol')
export const text = elNS('text')
export const textPath = elNS('textPath')
export const tspan = elNS('tspan')
export const use = elNS('use')
export const view = elNS('view')
