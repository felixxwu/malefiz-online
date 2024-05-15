import { styled } from 'goober'
import { Event } from '.'
import { ComponentChildren } from 'preact'

export function EventAlert({ event, children }: { event: Event; children?: ComponentChildren }) {
  return (
    <Div>
      <div>Random event:</div>
      <h1>{event.name}</h1>
      <div>{event.description}</div>
      {children}
    </Div>
  )
}

const Div = styled('div')`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
`
