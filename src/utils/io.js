import io from 'socket.io-client'

import { loadApp } from '../ducks/apps'

export const socket = io('http://localhost:8084')

export const connectSocket = store => {
  socket.on('app', result => {
    store.dispatch(loadApp(result))
  })
}

export const requestAll = () => {
  socket.emit('requestAll')
}

export const requestApp = appId => {
  socket.emit('requestApp', { appId })
}

