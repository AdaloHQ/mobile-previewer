import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Login extends Component {
  componentWillMount() {
    global.authIsMounted = true
  }

  comonentWillUnmount() {
    global.authIsMounted = false
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f00' }} />
    )
  }
}
