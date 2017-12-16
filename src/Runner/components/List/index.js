import React, { Component } from 'react'
import {
  FlatList,
  View,
  TextList,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

import Group from '../Group'

export default class List extends Component {
  renderItem = ({ item }) => {
    let { object, component, renderChildren } = this.props
    let { rowHeight, rowMargin } = object
    let prototype = object.children[0]

    let height = rowHeight + rowMargin

    let innerStyles = {
      left: -prototype.x,
      top: -prototype.y,
    }

    return (
      <View style={[styles.row, { height }]} pointerEvents="box-none">
        <View style={[styles.wrapper, innerStyles]} pointerEvents="box-none">
          {renderChildren([prototype])}
        </View>
      </View>
    )
  }

  render() {
    let { object, component, renderChildren, bindingData } = this.props

    let { x, y, width, height } = object

    let listItems = bindingData[object.id]

    if (!Array.isArray(listItems)) { return null }

    listItems = listItems.map(itm => ({ ...itm, key: itm.id }))

    let wrapperStyles = { left: x, top: y }
    let listStyles = { width, height }

    return (
      <View style={[styles.wrapper, wrapperStyles]} pointerEvents="box-none">
        <FlatList
          data={listItems}
          renderItem={this.renderItem}
          style={listStyles}
        />
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
  row: {
    // Something here?
  },
  input: {
    position: 'absolute'
  }
})

