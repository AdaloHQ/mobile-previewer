import React, { Component } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import AppItem from './Item'

export default class ListView extends Component {
  render() {
    let { apps, onPressItem } = this.props

    apps = apps.map(app => ({
      ...app,
      key: app._id
    }))

    return (
      <FlatList
        data={apps}
        renderItem={({ item }) => (
          <AppItem app={item} onPress={onPressItem} />
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})
