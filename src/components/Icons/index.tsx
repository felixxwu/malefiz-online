import { JSX } from 'preact/jsx-runtime'
import { colours } from '../../config/colours'
import { textOpacity } from '../../signals/signals'

function Icon(props: { pathString: string; size?: number; colour?: string }) {
  const { pathString, size = 12, colour = colours.background } = props

  return (
    <svg
      viewBox='0 0 24 24'
      width={size}
      height={size}
      opacity={textOpacity.value}
      style={{ transition: '500ms' }}
    >
      <path d={pathString} fill={colour}></path>
    </svg>
  )
}

function createIcon(pathString: string) {
  return (props: { size?: number; colour?: string }) => {
    const { size, colour } = props
    return <Icon pathString={pathString} size={size} colour={colour} />
  }
}

export const PlusIcon = createIcon('M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z')
export const MinusIcon = createIcon('M0 10h24v4h-24z')
export const MenuIcon = createIcon('M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z')
export const FullScreenIcon = createIcon(
  'M24 9h-4v-5h-5v-4h9v9zm-9 15v-4h5v-5h4v9h-9zm-15-9h4v5h5v4h-9v-9zm9-15v4h-5v5h-4v-9h9z'
)
export const CrossIcon = createIcon(
  'M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z'
)
export const ChevronLeft = createIcon(
  'M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z'
)
export const ChevronRight = createIcon(
  'M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z'
)
export const RefreshIcon = createIcon(
  'M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z'
)

export const ChevronLeftPath = () => (
  <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
)
export const ChevronRightPath = () => (
  <path d='M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z' />
)
export const PencilIconPath = (props: JSX.IntrinsicElements['path']) => (
  <path
    {...props}
    d='M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z'
  />
)
