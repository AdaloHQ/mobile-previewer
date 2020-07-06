import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import ActionSheet from 'react-native-action-sheet'

import { setCurrentUser } from '../../ducks/users'
import MenuImage from '../AppList/images/menu-icon.png'

export default class MenuButton extends Component {
  handlePress = () => {
    let { actionSheetCB } = this.props

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
