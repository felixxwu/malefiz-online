import { store } from './store'

const urlParams = new URLSearchParams(window.location.search)
export const gameId = urlParams.get('game')
store.gameId = gameId
