import { h, render } from 'preact'
import { App } from './app.tsx'
import { setup } from 'goober'

setup(h)

render(<App />, document.getElementById('app')!)
