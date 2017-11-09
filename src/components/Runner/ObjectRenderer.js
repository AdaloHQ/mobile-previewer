import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { LABEL, SECTION, GROUP } from 'apto-constants'

import Label from './Label'
import Section from './Section'

export default class ObjectRenderer extends Component {
  render() {
    let { component, object } = this.props

    switch (object.type) {
      case LABEL:
        return <Label component={component} object={object} />
      case SECTION:
        return <Section component={component} object={object} />
      case GROUP:
        return (
          <View style={styles.group}>
            {object.children.map(child => (
              <ObjectRenderer
                key={child.id}
                component={component}
                object={child}
              />
            ))}
          </View>
        )
    }
  }
}

const styles = StyleSheet.create({
  group: {
    position: 'absolute',
    left: 0,
    top: 0
  }
})
