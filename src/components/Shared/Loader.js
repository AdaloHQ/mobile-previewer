import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Loader extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#444',
    fontSize: 17
  }
})
