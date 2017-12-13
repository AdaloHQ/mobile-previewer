import axios from 'axios'

import { buildUrl } from '../utils/urls'

const FETCH_COLLECTION_REQUEST = Symbol('FETCH_COLLECTION_REQUEST')
const FETCH_COLLECTION_SUCCESS = Symbol('FETCH_COLLECTION_SUCCESS')
const FETCH_COLLECTION_FAILURE = Symbol('FETCH_COLLECTION_FAILURE')

const FETCH_OBJECT_REQUEST = Symbol('FETCH_OBJECT_REQUEST')
const FETCH_OBJECT_SUCCESS = Symbol('FETCH_OBJECT_SUCCESS')
const FETCH_OBJECT_FAILURE = Symbol('FETCH_OBJECT_FAILURE')

const CREATE_OBJECT_REQUEST = Symbol('CREATE_OBJECT_REQUEST')
const CREATE_OBJECT_SUCCESS = Symbol('CREATE_OBJECT_SUCCESS')
const CREATE_OBJECT_FAILURE = Symbol('CREATE_OBJECT_FAILURE')

const UPDATE_OBJECT_REQUEST = Symbol('UPDATE_OBJECT_REQUEST')
const UPDATE_OBJECT_SUCCESS = Symbol('UPDATE_OBJECT_SUCCESS')
const UPDATE_OBJECT_FAILURE = Symbol('UPDATE_OBJECT_FAILURE')

const DELETE_OBJECT_REQUEST = Symbol('DELETE_OBJECT_REQUEST')
const DELETE_OBJECT_SUCCESS = Symbol('DELETE_OBJECT_SUCCESS')
const DELETE_OBJECT_FAILURE = Symbol('DELETE_OBJECT_FAILURE')

const INITIAL_STATE = {
  tables: {},
  errors: {}
}

// REDUCER

export default (state=INITIAL_STATE, action) => {
  if (action.type === FETCH_COLLECTION_SUCCESS) {
    console.log("RECEIVING COLLECTION", action)
    let { data, tableId } = action

    let table = {
      ...this.state.tables[tableId]
    }

    data.forEach(itm => {
      table[itm.id] = itm
    })

    return {
      ...state,
      tables: {
        ...state.tables,
        [tableId]: table
      }
    }
  }

  if (action.type === FETCH_OBJECT_SUCCESS ||
      action.type === CREATE_OBJECT_SUCCESS) {

    console.log("RECEIVING OBJECT", action)

    let { tableId } = action
    let item = action.data

    return {
      ...state,
      tables: {
        ...state.tables,
        [tableId]: {
          ...state.tables[tableId],
          [item.id]: item
        }
      }
    }
  }

  return INITIAL_STATE
}

// ACTIONS

export const fetchCollection = (datasourceId, tableId) => dispatch => {
  axios.get(buildUrl(datasourceId, tableId))
    .then(response => {
      dispatch({
        type: FETCH_COLLECTION_SUCCESS,
        tableId,
        data: response.data
      })
    })
    .catch(err => {
      console.error("ERROR FETCHING COLLECTION.", err)
    })
}

export const fetchItem = (datasourceId, tableId, id) => dispatch => {
  console.log(buildUrl(datasourceId, tableId, id))
  axios.get(buildUrl(datasourceId, tableId, id))
    .then(response => {
      dispatch({
        type: FETCH_OBJECT_SUCCESS,
        tableId,
        data: response.data
      })
    })
    .catch(err => {
      console.error("ERROR FETCHING OBJECT.", err)
    })
}

export const fetch = (datasourceId, tablesId, id=null) => {
  if (id === null) {
    return fetchCollection(datasourceId, tableId)
  } else {
    return fetchItem(datasourceId, tablesId, id)
  }
}

export const createObject = (datasourceId, tableId, object) => dispatch => {
  axios.post(buildUrl(datasourceId, tableId), object)
    .then(response => {
      dispatch({
        type: CREATE_OBJECT_SUCCESS,
        tableId,
        data: response.data
      })
    })
    .catch(err => {
      console.error("ERROR CREATING OBJECT.", err)
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
