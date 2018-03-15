import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import LogoImage from '../AppList/images/proton-logo.png'
import { StackNavigator } from 'react-navigation'
import FormWrapper from './Login'

class Login extends Component {
  componentWillMount() {
    global.authIsMounted = true
  }

  comonentWillUnmount() {
    global.authIsMounted = false
  }

  render() {
    let { navigation } = this.props

    return (
      <View style={styles.body}>
        <FormWrapper navigation={navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    backgroundColor: '#fff',
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0
    },
    borderBottomWidth: 0
  },
})

export default StackNavigator(
  {
    Main: {
      screen: Login,
      navigationOptions: {
        title: 'Sign In',
        headerStyle: styles.header,
      }
    }
  }
)
