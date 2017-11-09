import immutabilityHelper from 'immutability-helper'

import { setLink } from '../../utils/io'

const ADD_LINK = Symbol('ADD_LINK')
const REMOVE_LINK = Symbol('REMOVE_LINK')

export default (state, action) => {
  if (action.type === ADD_LINK) {
    console.log('Adding Link')
    let { appId, componentId, objectId, link } = action

    setLink({ appId, componentId, objectId, link })

    return immutabilityHelper(state, {
      apps: {
        [appId]: {
          components: {
            [componentId]: {
              links: {
                [objectId]: {
                  $set: link
                }
              }
            }
          }
        }
      }
    })
  }

  if (action.type === REMOVE_LINK) {
    console.log('Removing Link')
    let { appId, componentId, objectId } = action

    setLink({ appId, componentId, objectId, link: null })

    return immutabilityHelper(state, {
      apps: {
        [appId]: {
          components: {
            [componentId]: {
              links: {
                $unset: [objectId]
              }
            }
          }
        }
      }
    })
  }

  return state
}

// ACTIONS

export const addLink = (appId, componentId, objectId, link) => ({
  type: ADD_LINK,
  appId,
  componentId,
  objectId,
  link
})

export const removeLink = (appId, componentId, objectId) => ({
  type: REMOVE_LINK,
  appId,
  componentId,
  objectId
})

// SELECTORS

export const getLink = (state, appId, componentId, objectId) => {
  if (!state.apps.apps[appId] ||
      !state.apps.apps[appId].components[componentId]) {
    return null
  }

  let link = state.apps.apps[appId].components[componentId].links[objectId]

  if (!link) { return link }

  link = {
    ...link,
    targetName: state.apps.apps[appId].components[link.target].name
  }
  
  return link 
}
