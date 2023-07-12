type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
    ? RecursivePartial<T[P]>
    : T[P]
}

export function el<T extends keyof HTMLElementTagNameMap>(tag: T) {
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

export function elNS<T extends keyof SVGElementTagNameMap>(tag: T) {
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
