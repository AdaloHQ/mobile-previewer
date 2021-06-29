import React, { Component } from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import ActionSheet from 'react-native-action-sheet'
import MenuImage from '../AppList/images/menu-icon.png'

export default class MenuButton extends Component {
  handlePress = () => {
    const { actionSheetCB } = this.props

    ActionSheet.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Reload', 'Exit'],
        cancelButtonIndex: 0,
      },
      actionSheetCB
    )
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
    padding: 20,
  },
})
