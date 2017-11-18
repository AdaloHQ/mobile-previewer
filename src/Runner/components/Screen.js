import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { buildMapFunc } from '../utils/dependencies'
import ObjectRenderer from './ObjectRenderer'

class Screen extends Component {
  componentWillMount() {
    // Figure out what data is needed and fetch it
    let { component } = this.props
    let { dataBindings } = component

    // Object.keys(dataBindings).forEach(
  }

  render() {
    let { component, offsetX } = this.props

    let { width, height, objects } = component

    return (
      <View style={[styles.screen, { width, height }]}>
        {objects.map(obj => (
          <ObjectRenderer
            key={obj.id}
            object={obj}
            component={component}
          />
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#fff',
  }
})

const mapStateToProps = (state, { component, params }) =>
  buildMapFunc(component, params)(state)

export default connect(mapStateToProps)(Screen)
