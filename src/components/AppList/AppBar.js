import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native'

import MenuButton from './MenuButton'
import LogoImage from './images/logo-image.png'

const STATUS_BAR_HEIGHT = 24

export default class AppBar extends Component {
  render() {
    let { navigation, menuButtonCB } = this.props
    let innerWrapperStyles = {}

    if (Platform.OS === 'android') {
      innerWrapperStyles.marginTop = 24
    }

    return (
      <View style={styles.wrapper}>
        <SafeAreaView>
          <View style={[styles.innerWrapper, innerWrapperStyles]}>
            <View style={[styles.button, styles.leftButton]}>
              <MenuButton menuButtonCB={menuButtonCB} />
            </View>
            <View style={styles.title}>
              <Image source={LogoImage} />
            </View>
            <View style={[styles.button, styles.RightButton]}></View>
          </View>
        </SafeAreaView>
        <View style={styles.headerStripe}>
          <View style={{ flex: 1, backgroundColor: '#04a797' }} />
          <View style={{ flex: 1, backgroundColor: '#fdbc11' }} />
          <View style={{ flex: 1, backgroundColor: '#ef4c30' }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowRadius: 6,
    shadowOffset: { height: 3 },
    shadowOpacity: 1,
    elevation: 4,
    zIndex: 1,
  },
  innerWrapper: {
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'row',
  },
  title: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftButton: {
    justifyContent: 'flex-start',
  },
  rightButton: {
    justifyContent: 'flex-end',
  },
  headerStripe: {
    height: 4,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
})
