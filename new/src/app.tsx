import { styled } from 'goober'
import './css/lexend.css'
import './css/styles.css'
import { MapRenderer } from './components/MapRenderer'
import { useEffect } from 'preact/hooks'
import { firstRender } from './utils/firstRender'
import { UI } from './components/UI'

export function App() {
  useEffect(() => {
    firstRender()
  }, [])

  return (
    <Div>
      <MapRenderer />
      <UI />
    </Div>
  )
}

const Div = styled('div')`
  height: 100vh;
  overflow: hidden;
`
