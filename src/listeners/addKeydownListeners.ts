import { store } from '../data/store'

export function addKeydownListeners() {
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      store.menuOpen = !store.menuOpen
    }
  })
}
