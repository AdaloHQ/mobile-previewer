import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native'

import { relativeDate } from '../../utils/dates'
import IconImage from './default-icon.png'
import { assetsBaseURL } from '../Viewer'

export default class ListView extends Component {
  handlePress = () => {
    let { app, onPress } = this.props
    onPress(app.id)
  }

  getIconSource() {
    let { app } = this.props

    if (app && app.icon) {
      return {
        uri: `${assetsBaseURL}/${app.icon}`
      }
    }

    return IconImage
  }

  render() {
    let { app } = this.props

    return (
      <View style={styles.wrapper}>
        <TouchableHighlight
          onPress={this.handlePress}
          underlayColor="#ccc"
          style={styles.touchableHighlight}
        >
          <View style={styles.item}>
            <View style={styles.iconWrapper}>
              <Image source={this.getIconSource()} style={styles.icon} />
              <View style={styles.iconBorder} />
            </View>
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
  touchableHighlight: {
  },
  item: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconWrapper: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 13,
  },
  iconBorder: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 13,
  },
  details: {
    flex: 1
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  date: {
    color: '#9a9a9a',
    fontSize: 12,
    marginTop: 6
  }
})
