import { styled } from 'goober'
import './css/lexend.css'
import './css/styles.css'
import { MapRenderer } from './components/MapRenderer'
import { useEffect } from 'preact/hooks'
import { firstRender } from './utils/firstRender'
import { Menu } from './components/UI/Menu'
import { Action } from './components/UI/Action'
import { Navigation } from './components/UI/Navigation'

export function App() {
  useEffect(() => {
    firstRender()
  }, [])

  return (
    <Div>
      <MapRenderer />
      <Menu />
      <Action />
      <Navigation />
    </Div>
  )
}

const Div = styled('div')`
  height: 100vh;
  overflow: hidden;
`
