import { JSX } from 'preact/jsx-runtime'
import { AcidRain } from './AcidRain'
import { Earthquake } from './Earthquake'

export type Event = {
  name: string
  alert: () => JSX.Element
  onActivate: () => void
}

export const events = [AcidRain, Earthquake] as const satisfies Event[]
export type EventName = (typeof events)[number]['name']
