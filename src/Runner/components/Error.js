import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class ErrorScreen extends Component {
  render() {
    let { message } = this.props

    return (
      <View style={styles.wrapper}>
        <Text style={styles.message}>
          {message}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ddd',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    color: '#aaa',
    fontSize: 24
  }
})
