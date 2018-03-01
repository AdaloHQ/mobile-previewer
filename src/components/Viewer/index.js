import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import ShakeEvent from 'react-native-shake-event'

import { getApp } from '../../ducks/apps'
import Runner from 'apto-runner'

class Viewer extends Component {
  handleClose = () => {
    let { navigation } = this.props

    navigation.dispatch(NavigationActions.back())
  }

  handleShake = () => {
    console.log('-------> SHAKE!')
  }

  componentWillMount() {
    ShakeEvent.addEventListener('shake', this.handleShake)
  }

  componentWillUnmount() {
    ShakeEvents.removeEventListener('shake')
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
          <View style={styles.backButton}>
            <Text style={styles.backButtonText}>
              ╋
            </Text>
          </View>
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
    right: 0,
    bottom: 100,
    width: 32,
    height: 32,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  backButton: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: '#444',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButtonText: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 16,
    transform: [{ rotate: '45deg' }]
  },
})

const mapStateToProps = (state, ownProps) => ({
  app: getApp(state, ownProps.navigation.state.params.appId)
})

export default connect(mapStateToProps)(Viewer)
