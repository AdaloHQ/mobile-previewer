import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
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

    let { backgroundColor, layout } = component

    backgroundColor = backgroundColor || '#fff'

    let calculatedStyles = { backgroundColor }

    return (
      <View style={[styles.wrapper, calculatedStyles]}>
        <ScrollView style={styles.scrollView}>
          {layout.body.map(obj => (
            <ObjectRenderer
              key={obj.id}
              object={obj}
              component={component}
              bindingData={bindingData}
            />
          ))}
        </ScrollView>
        <View style={styles.fixedTop} pointerEvents="box-none">
          {layout.fixedTop.map(obj => (
            <ObjectRenderer
              key={obj.id}
              object={obj}
              component={component}
              bindingData={bindingData}
            />
          ))}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    width: '100%',
    height: '100%'
  },
  scrollView: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  fixedTop: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%'
  }
})

const mapStateToProps = (state, { component, params }) => ({
  bindingData: buildMapFunc(component, params)(state)
})

export default connect(mapStateToProps, { fetch })(Screen)
