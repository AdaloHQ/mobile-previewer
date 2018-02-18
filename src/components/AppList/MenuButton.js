import React, { Component } from 'react'

import {
  TouchableOpacity,
  Image,
  ActionSheetIOS,
  StyleSheet
} from 'react-native'

import MenuImage from './images/menu-icon.png'

export default class MenuButton extends Component {
  handlePress = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Cancel', 'Logout'],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 0
    }, index => {
      if (index === 1) {
        // Do something
      }
    })
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress} style={styles.button}>
        <Image source={MenuImage} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 20
  }
})
