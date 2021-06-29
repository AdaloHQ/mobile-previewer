import React, { Component } from 'react'

import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native'

import Image from 'react-native-scalable-image'
import FormWrapper from './Login'

import bottomGraphic from './bottom-graphic.png'

const STATUS_BAR_HEIGHT = 24

export default class Login extends Component {
  render() {
    const { navigation } = this.props
    const { width } = Dimensions.get('window')
    const paddingTop = Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0

    return (
      <View style={[styles.body, { paddingTop }]}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <FormWrapper navigation={navigation} />
        {Platform.OS === 'ios' && (
          <View style={styles.bottomGraphic}>
            <Image source={bottomGraphic} width={width} />
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomGraphic: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
})
