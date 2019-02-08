import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native'

import MenuButton from './MenuButton'
import LogoImage from './images/foundry-logo-text.png'

export default class AppBar extends Component {
  render() {
    let { navigation } = this.props

    return (
      <View style={styles.wrapper}>
        <SafeAreaView>
          <View style={styles.innerWrapper}>
            <View style={[styles.button, styles.leftButton]}>
              <MenuButton navigation={navigation} />
            </View>
            <View style={styles.title}>
              <Image source={LogoImage} />
            </View>
            <View style={[styles.button, styles.RightButton]}>
            </View>
          </View>
        </SafeAreaView>
        <View style={styles.headerStripe}>
          <View style={{ flex: 1, backgroundColor: '#a82058' }} />
          <View style={{ flex: 1, backgroundColor: '#ef4c30' }} />
          <View style={{ flex: 1, backgroundColor: '#ffc00e' }} />
          <View style={{ flex: 1, backgroundColor: '#a1cd46' }} />
          <View style={{ flex: 1, backgroundColor: '#00a898' }} />
          <View style={{ flex: 1, backgroundColor: '#43437a' }} />
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
    paddingTop: 8,
    paddingBottom: 8,
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
