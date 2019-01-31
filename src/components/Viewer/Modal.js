import React, { Component } from 'react'

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import Button from '../Login/Button'
import ShakeImage from './images/shake-icon.png'

export default class ShakeModal extends Component {
  render() {
    let { onHide, onNeverAgain } = this.props

    return (
      <View style={styles.wrapper}>
        <Image source={ShakeImage} />
        <Text style={styles.text}>
          Shake your phone to exit preview.
        </Text>
        <View style={styles.buttonWrapper}>
          <Button onPress={onHide}>
            Got It!
          </Button>
        </View>
        <TouchableOpacity
          onPress={onNeverAgain}
          style={styles.neverAgainWrapper}
        >
          <Text style={styles.neverAgainText}>
            Never show this again
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    elevation: 8,
    padding: 32,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#666',
    fontSize: 17,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 30
  },
  buttonWrapper: {
    width: 200,
  },
  neverAgainWrapper: {
    marginTop: 20,
  },
  neverAgainText: {
    color: '#9e9e9e',
    fontSize: 14,
    fontWeight: '500',
  }
})
