import React, { Component } from 'react'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import AppItem from './Item'
import Header from './Header'

export default class ListView extends Component {
  render() {
    let { apps, onPressItem, loading, onRefresh } = this.props

    apps = apps.map(app => ({
      ...app,
      key: app.id
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
        showsVerticalScrollIndicator={false}
        style={styles.list}
        ListHeaderComponent={Header}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 8,
    paddingBottom: 30,
  }
})

