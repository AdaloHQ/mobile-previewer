import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class Button extends Component {
  render() {
    let { onPress, children } = this.props

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>
            {children}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#00a898',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
  },
  text: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  }
})
