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
    let { attributes } = object
    let { rowMargin } = attributes
    let prototype = object.children[0]

    return (
      <View
        style={[styles.row, { marginBottom: rowMargin }]}
        pointerEvents="box-none"
      >
        {renderChildren([prototype], { [object.id]: item })}
      </View>
    )
  }

  render() {
    let { object, component, renderChildren, bindingData } = this.props

    let { layout } = object

    let listItems = bindingData[object.id]

    if (!Array.isArray(listItems)) { return null }

    listItems = listItems.map(itm => ({ ...itm, key: itm.id }))

    let wrapperStyles = {
      ...layout
    }

    return (
      <View style={wrapperStyles} pointerEvents="box-none">
        <FlatList
          data={listItems}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    // Something here?
  },
  input: {
    position: 'absolute'
  }
})

