import React, { Component } from 'react'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import AppItem from './Item'

export default class ListView extends Component {
  render() {
    let { apps, onPressItem, loading, onRefresh } = this.props

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
        refreshControl={(
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
          />
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
