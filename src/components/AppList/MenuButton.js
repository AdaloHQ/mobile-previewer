import React, { Component } from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { connectActionSheet } from '@expo/react-native-action-sheet'

import MenuImage from './images/menu-icon.png'

class MenuButton extends Component {
  handlePress = () => {
    this.props.showActionSheetWithOptions({
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

export default connectActionSheet(MenuButton)

const styles = StyleSheet.create({
  button: {
    padding: 20
  }
})
