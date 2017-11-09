import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

import { relativeDate } from '../../utils/dates'

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
          underlayColor="#fff"
          activeOpacity={0.7}
          style={styles.touchableHighlight}
        >
          <View style={styles.item}>
            <Text style={styles.title}>
              {app.name}
            </Text>
            <Text style={styles.date}>
              Updated {relativeDate(app.updatedAt)}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  wrapper: {
    padding: 8
  },
  touchableHighlight: {
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.1
  },
  item: {
    paddingTop: 120,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444'
  },
  date: {
    color: '#444',
    fontSize: 11,
    opacity: 0.8
  }
})
