import config from 'react-native-config'

import { AsyncStorage } from 'react-native'
import io from 'socket.io-client'

import { loadApp, loadAppsList } from '../ducks/apps'
import { setCurrentUser, setAuthVisible } from '../ducks/users'

let socket
let store

AsyncStorage.getItem('protonSession')
  .then(token => setToken(token))

export const ioReady = () => !!socket

const baseURL = 'https://proton-backend.herokuapp.com'
//const baseURL = config.REACT_APP_BACKEND_URL

export const setToken = token => {
  socket = io(`${baseURL}/?sessionToken=${token}`, { pingTimeout: 30000 })

  socket.on('app', result => {
    store.dispatch(loadApp(result))
  })

  socket.on('appsList', result => {
    store.dispatch(loadAppsList(result))
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

