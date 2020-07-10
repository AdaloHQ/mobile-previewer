import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import ActionSheet from 'react-native-action-sheet'

import MenuImage from './images/menu-icon.png'

export default class MenuButton extends Component {
  render() {
    let { menuButtonCB } = this.props
    return (
      <TouchableOpacity onPress={menuButtonCB} style={styles.button}>
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
