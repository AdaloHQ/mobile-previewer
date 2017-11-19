import axios from 'axios'

import { buildUrl } from '../utils/urls'

const FETCH_COLLECTION_REQUEST = Symbol('FETCH_COLLECTION_REQUEST')
const FETCH_COLLECTION_SUCCESS = Symbol('FETCH_COLLECTION_SUCCESS')
const FETCH_COLLECTION_FAILURE = Symbol('FETCH_COLLECTION_FAILURE')

const FETCH_ITEM_REQUEST = Symbol('FETCH_ITEM_REQUEST')
const FETCH_ITEM_SUCCESS = Symbol('FETCH_ITEM_SUCCESS')
const FETCH_ITEM_FAILURE = Symbol('FETCH_ITEM_FAILURE')

const CREATE_ITEM_REQUEST = Symbol('CREATE_ITEM_REQUEST')
const CREATE_ITEM_SUCCESS = Symbol('CREATE_ITEM_SUCCESS')
const CREATE_ITEM_FAILURE = Symbol('CREATE_ITEM_FAILURE')

const UPDATE_ITEM_REQUEST = Symbol('UPDATE_ITEM_REQUEST')
const UPDATE_ITEM_SUCCESS = Symbol('UPDATE_ITEM_SUCCESS')
const UPDATE_ITEM_FAILURE = Symbol('UPDATE_ITEM_FAILURE')

const DELETE_ITEM_REQUEST = Symbol('DELETE_ITEM_REQUEST')
const DELETE_ITEM_SUCCESS = Symbol('DELETE_ITEM_SUCCESS')
const DELETE_ITEM_FAILURE = Symbol('DELETE_ITEM_FAILURE')

const INITIAL_STATE = {
  tables: {},
  errors: {}
}

// REDUCER

export default (state=INITIAL_STATE, action) => {
  if (action.type === FETCH_COLLECTION_SUCCESS) {
    console.log("RECEIVING COLLECTION", action)
  }

  if (action.type === FETCH_ITEM_SUCCESS) {
    console.log("RECEIVING ITEM", action)
  }

  return INITIAL_STATE
}

// ACTIONS

export const fetchCollection = (datasourceId, tableId) => dispatch => {
  axios.get(buildUrl(datasourceId, tableId))
    .then(response => {
      dispatch({
        type: FETCH_COLLECTION_SUCCESS,
        data: response.data
      })
    })
    .catch(err => {
      console.error("ERROR FETCHING COLLECTION.", err)
    })
}

export const fetchItem = (datasourceId, tableId, id) => dispatch => {
  axios.get(buildUrl(datasourceId, tableId, id))
    .then(response => {
      dispatch({
        type: FETCH_ITEM_SUCCESS,
        data: response.data
      })
    })
    .catch(err => {
      console.error("ERROR FETCHING ITEM.", err)
    })
}

// SELECTORS

export const getTableData = (state, tableId) => {
  return state.data.tables[tableId]
}

export const getCollection = (state, tableId, sort=null, filter=null) => {
  let data = state.data.tables[tableId]
  let collection = Object.keys(data).map(id => data[id])

  if (sort) {
    collection.sort(sort)
  }

  if (filter) {
    collection = collection.filter(filter)
  }

  return collection
}

export const getItem = (state, tableId, selector) => {
  return selector(state.data.tables[tableId])
}
