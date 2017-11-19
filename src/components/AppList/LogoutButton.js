import React, { Component } from 'react'
import { Button, AsyncStorage } from 'react-native'

export default class LogoutButton extends Component {
  state = { removing: false }

  handlePress = async () => {
    this.setState({ removing: true })

    try {
      let keys = await AsyncStorage.getAllKeys()

      await AsyncStorage.multiRemove(
        keys.filter(k => k.match(/^SESSION_TOKEN/)))
    } catch(err) {
      console.error("Error:", err)
    }

    this.setState({ removing: false })
  }

  render() {
    let { removing } = this.state

    return (
      <Button
        disabled={removing}
        color="#ff3b30"
        onPress={this.handlePress}
        title="Logout"
      />
    )
  }
}
