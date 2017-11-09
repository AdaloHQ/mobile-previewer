import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { getApp } from '../../ducks/apps'
import Runner from '../Runner'

class Viewer extends Component {
  handleClose = () => {
    let { navigation } = this.props

    navigation.dispatch(NavigationActions.back())
  }

  render() {
    let { app } = this.props

    return (
      <View style={styles.view}>
        <Runner app={app} />
        <TouchableHighlight
          onPress={this.handleClose}
          style={styles.backButtonWrapper}
        >
          <View style={styles.backButton} />
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  backButtonWrapper: {
    position: 'absolute',
    right: 8,
    bottom: 100,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  backButton: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#444',
    opacity: 0.5
  },
})

const mapStateToProps = (state, ownProps) => ({
  app: getApp(state, ownProps.navigation.state.params.appId)
})

export default connect(mapStateToProps)(Viewer)
