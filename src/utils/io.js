import { AsyncStorage } from 'react-native'
import axios from 'axios'

import { loadApp, loadAppsList } from '../ducks/apps'
import { setCurrentUser, setAuthVisible } from '../ducks/users'

let store
let token

AsyncStorage.getItem('protonSession').then((token) => {
  setToken(token)

  if (token) {
    getUserProfile()
  } else {
    store.dispatch(setAuthVisible())
  }
})

const baseURL = 'https://proton-backend.herokuapp.com'
//const baseURL = "http://localhost:8084";

const buildURL = (path) => {
  return `${baseURL}${path}`
}

export const setToken = (tok) => {
  token = tok
}

// Receiving

const handleError = (err) => {
  if (err.response.status === 401) {
    store.dispatch(setAuthVisible())
  } else {
    console.error('ERROR RESPONSE:', err.response.status)
  }
}

export const connectSocket = (newStore) => {
  store = newStore
}

// Sending

export const requestAll = () => {
  axios
    .get(buildURL('/apps'), { headers: { 'x-proton-auth': token } })
    .then((resp) => store.dispatch(loadAppsList(resp.data)))
    .catch(handleError)
}

export const requestApp = (appId) => {
  return axios
    .get(buildURL(`/apps/${appId}`))
    .then((resp) => store.dispatch(loadApp(resp.data)))
    .catch(handleError)
}

export const authenticate = (data, callback) => {
  return axios
    .post(buildURL('/sessions'), data)
    .then((resp) => {
      setToken(resp.data.sessionToken)

      callback(resp.data)

      console.log('SUCCESS!!!', resp.data)
      return getUserProfile()
    })
    .catch((err) => {
      console.log('FAILURE!!!', err)
      callback({ success: false })
    })
}

export const getUserProfile = () => {
  return axios
    .get(buildURL('/user'), { headers: { 'x-proton-auth': token } })
    .then((resp) => store.dispatch(setCurrentUser(resp.data)))
    .catch(handleError)
}
