import { styled } from 'goober'
import './css/lexend.css'
import './css/styles.css'
import { colours } from './config/colours'

export function App() {
  return <Container>hello</Container>
}

const Container = styled('div')`
  background-color: ${colours.background};
  height: 100vh;
  overflow: hidden;
`
