import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { connectActionSheet } from '@expo/react-native-action-sheet'

import { setCurrentUser } from '../../ducks/users'
import MenuImage from './images/menu-icon.png'

class MenuButton extends Component {
  handlePress = () => {
    let { navigation, setCurrentUser } = this.props

    this.props.showActionSheetWithOptions({
      options: ['Cancel', 'Logout'],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 0
    }, async index => {
      if (index === 1) {
        // Logout
        await AsyncStorage.removeItem('protonSession')
        setCurrentUser(null)
        navigation.navigate('Login')
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

export default connectActionSheet(connect(null, { setCurrentUser })(MenuButton))

const styles = StyleSheet.create({
  button: {
    padding: 20
  }
})
