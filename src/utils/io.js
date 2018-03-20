import config from 'react-native-config'

import { AsyncStorage } from 'react-native'
import io from 'socket.io-client'

import { loadApp } from '../ducks/apps'
import { setCurrentUser, setAuthVisible } from '../ducks/users'

let socket
let store

AsyncStorage.getItem('protonSession')
  .then(token => setToken(token))

export const ioReady = () => !!socket

export const setToken = token => {
  socket = io(`${config.REACT_APP_BACKEND_URL}/?sessionToken=${token}`)

  socket.on('app', result => {
    store.dispatch(loadApp(result))
  })

  socket.on('userProfile', user => {
    store.dispatch(setCurrentUser(user))
  })

  socket.on('unauthorized', () => {
    store.dispatch(setAuthVisible())
  })
}

// Receiving

export const connectSocket = newStore => {
  store = newStore
}

// Sending

export const requestAll = () => {
  socket.emit('requestAll')
}

export const requestApp = appId => {
  socket.emit('requestApp', { appId })
}

export const authenticate = (data, callback) => {
  socket.emit('authenticate', data, callback)
}

