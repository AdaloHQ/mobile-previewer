import React, { Component } from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'

import MenuImage from './images/menu-icon.png'

export default class MenuButton extends Component {
  render() {
    const { menuButtonCB } = this.props
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
