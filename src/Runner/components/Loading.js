import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text>Loading...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
