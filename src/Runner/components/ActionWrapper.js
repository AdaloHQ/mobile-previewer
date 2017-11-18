import React, { Component } from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class ActionWrapper extends Component {
  static contextTypes = { navigate: PropTypes.func }

  handlePress = () => {
    let { action } = this.props
    let { navigate } = this.context

    navigate(action)
  }

  render() {
    let { action, children } = this.props

    if (action) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          activeOpacity={0.7}
          onPress={this.handlePress}
          children={children}
          style={styles.touchable}
        />
      )
    }

    return children
  }
}

const styles = StyleSheet.create({
  touchable: {
    margin: -5,
    padding: 5,
    borderRadius: 4
  }
})
