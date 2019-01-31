import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>
          My Apps
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 20,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
})
