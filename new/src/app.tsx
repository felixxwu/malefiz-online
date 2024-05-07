import { styled } from 'goober'
import './css/lexend.css'
import './css/styles.css'
import { MapRenderer } from './components/MapRenderer'
import { useEffect } from 'preact/hooks'
import { firstRender } from './utils/firstRender'

export function App() {
  useEffect(() => {
    firstRender()
  }, [])

  return (
    <Div>
      <MapRenderer />
    </Div>
  )
}

const Div = styled('div')`
  height: 100vh;
  overflow: hidden;
`
