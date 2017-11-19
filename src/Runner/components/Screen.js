import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { buildMapFunc, getDependencies } from '../utils/dependencies'
import { fetch } from '../ducks/data'
import ObjectRenderer from './ObjectRenderer'

class Screen extends Component {
  componentWillMount() {
    // Figure out what data is needed and fetch it
    let { component, fetch } = this.props
    let dependencies = getDependencies(component, {})

    dependencies.forEach(dep => {
      fetch(...dep)
    })
  }

  render() {
    let { bindingData, component, offsetX } = this.props

    let { width, height, objects } = component

    return (
      <View style={[styles.screen, { width, height }]}>
        {objects.map(obj => (
          <ObjectRenderer
            key={obj.id}
            object={obj}
            component={component}
            bindingData={bindingData}
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

const mapStateToProps = (state, { component, params }) => ({
  bindingData: buildMapFunc(component, params)(state)
})

export default connect(mapStateToProps, { fetch })(Screen)
