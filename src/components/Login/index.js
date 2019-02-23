import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native'

import LogoImage from '../AppList/images/proton-logo.png'
import FormWrapper from './Login'
import Image from 'react-native-scalable-image'

import bottomGraphic from './bottom-graphic.png'

export default class Login extends Component {
  componentWillMount() {
    global.authIsMounted = true
  }

  comonentWillUnmount() {
    global.authIsMounted = false
  }

  render() {
    let { navigation } = this.props
    let width = Dimensions.get('window').width

    return (
      <View style={styles.body}>
        <StatusBar
          backgroundColor="#fff"
          barStyle="dark-content"
        />
        <FormWrapper navigation={navigation} />
        {Platform.OS === 'ios'
          ? <View style={styles.bottomGraphic}>
              <Image
                source={bottomGraphic}
                width={width}
              />
            </View>
          : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff'
  },
  bottomGraphic: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
})

