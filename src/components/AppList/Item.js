import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native'

import { relativeDate } from '../../utils/dates'
import IconImage from './default-icon.png'

export default class ListView extends Component {
  handlePress = () => {
    let { app, onPress } = this.props
    onPress(app._id)
  }

  render() {
    let { app } = this.props

    return (
      <View style={styles.wrapper}>
        <TouchableHighlight
          onPress={this.handlePress}
          underlayColor="#04f"
          style={styles.touchableHighlight}
        >
          <View style={styles.item}>
            <Image source={IconImage} style={styles.icon} />
            <View style={styles.details}>
              <Text style={styles.title}>
                {app.name}
              </Text>
              <Text style={styles.date}>
                Updated {relativeDate(app.updatedAt)}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  wrapper: {
    borderBottomColor: 'rgba(126, 216, 255, 0.6)',
    borderBottomWidth: 0.5
  },
  touchableHighlight: {
  },
  item: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 16
  },
  details: {
    flex: 1
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  date: {
    color: '#00B1FF',
    fontSize: 12,
    marginTop: 6
  }
})
