import React, { Component } from 'react'
import { TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { events } from 'apto-constants'

import { getActionDependencies } from '../utils/dependencies'
import { executeAction } from '../utils/actions'

class ActionWrapper extends Component {
  static contextTypes = { navigate: PropTypes.func }

  getLink() {
    let { object } = this.props
    return object.link
  }

  getActions() {
    let { object } = this.props
    return object.actions || {}
  }

  hasActions() {
    let actions = this.getActions()

    return Object.keys(actions).length > 0
  }

  handlePress = () => {
    let { navigate } = this.context
    let { dependencies, dispatch } = this.props

    let link = this.getLink()
    let actions = this.getActions()

    actions = Object.keys(actions)
      .filter(id => actions[id].eventType === events.TAP)
      .forEach(id => {
        executeAction(actions[id], dependencies[id], dispatch)
      })

    if (link) {
      navigate(link)
    }
  }

  render() {
    let { children, dependencies, object } = this.props

    let hasAction = this.hasActions() || this.getLink()

    if (hasAction) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          activeOpacity={0.7}
          onPress={this.handlePress}
          children={children}
          hitSlop={{
            top: 5,
            bottom: 5,
            left: 5,
            right: 5
          }}
        />
      )
    }

    return children
  }
}

const mapStateToProps = (state, { component, object }) => ({
  dependencies: getActionDependencies(state, component, object)
})

export default connect(mapStateToProps)(ActionWrapper)
