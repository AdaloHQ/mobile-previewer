import React, { Component } from 'react'
import {
  View,
  TextList,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

import Group from '../Group'

export default class List extends Component {
  render() {
    let { object, component, renderChildren, value, bindingData } = this.props

    console.log("BINDINGS:", bindingData[object.id])

    let { x, y, width, height, rowHeight, rowMargin } = object

    let prototype = object.children[0]

    let targetPosition = {
      left: object.x,
      top: object.y,
      width: object.width,
      height: object.height
    }

    let listItems = bindingData[object.id]

    if (!Array.isArray(listItems)) { return null }

    return (
      <View style={styles.wrapper} pointerEvents="box-none">
        {listItems.map((itm, i) => (
          <View
            key={itm.id}
            style={[styles.wrapper, { top: i * (rowHeight + rowMargin) }]}
            pointerEvents="box-none"
          >
            {renderChildren(object.children)}
          </View>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  input: {
    position: 'absolute'
  }
})

