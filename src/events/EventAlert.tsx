import { styled } from 'goober'
import { Event } from '.'

export function EventAlert({ event }: { event: Event }) {
  return (
    <Div>
      <div>Random event:</div>
      <h1>{event.name}</h1>
      <div>{event.description}</div>
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
