import React, { Component } from 'react'
import { Animated, Easing, Dimensions, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { NAVIGATION_BACK } from 'apto-constants'

import { createStack, push, peek, pop } from '../utils/stacks'
import Screen from './Screen'
import ErrorScreen from './Error'

export default class Navigator extends Component {
  static childContextTypes = {
    navigate: PropTypes.func
  }

  constructor(props) {
    super(props)

    let routeStack = push(createStack(), {
      target: props.initialComponentId,
      params: {},
      transition: null
    })

    this.state = {
      routeStack,
      navigationInProgress: false,
      currentViewOffset: 0,
      previousViewOffset: 0
    }
  }

  getChildContext() {
    return { navigate: this.navigate }
  }

  navigate = action => {
    let { width } = Dimensions.get('window')

    if (this.state.navigationInProgress) {
      return
    }

    if (action.type === NAVIGATION_BACK) {
      let currentViewOffset = new Animated.Value(0)

      Animated.timing(
        currentViewOffset,
        {
          toValue: width,
          easing: Easing.in(Easing.ease),
          duration: 200,
          delay: 20,
          useNativeDriver: true
        }
      ).start(this.postPop)

      this.setState(state => ({
        currentViewOffset,
        navigationInProgress: true
      }))
    } else {
      let currentViewOffset = new Animated.Value(width)

      Animated.timing(
        currentViewOffset,
        {
          toValue: 0,
          easing: Easing.out(Easing.ease),
          duration: 200,
          delay: 50,
          useNativeDriver: true
        }
      ).start(() => {
        this.setState({ navigationInProgress: false })
      })

      this.setState(state => ({
        currentViewOffset,
        navigationInProgress: true,
        routeStack: push(
          state.routeStack,
          { params: {}, ...action }
        ),
      }))
    }
  }

  // Cleanup that happens after animation finishes
  postPop = () => {
    let [head, routeStack] = pop(this.state.routeStack)

    let currentViewOffset = new Animated.Value(0)

    Animated.timing(
      currentViewOffset,
      {
        toValue: 0,
        duration: 1
      }
    ).start()

    this.setState({
      routeStack,
      navigationInProgress: false,
      currentViewOffset,
      previousViewOffset: 0
    })
  }

  render() {
    let { app } = this.props
    let { routeStack, currentViewOffset, previousViewOffset } = this.state

    let currentRoute = peek(routeStack)
    let previousRoute = peek(routeStack, 1)

    if (!currentRoute || !currentRoute.target) {
      return <ErrorScreen message='No Start Screen' />
    }

    let currentComponent = app.components[currentRoute.target]
    let previousComponent = previousRoute && app.components[previousRoute.target]

    let children = []

    if (previousComponent) {
      children.push(
        <Animated.View
          style={styles.inner}
          key={previousRoute.target}
        >
          <Screen
            component={previousComponent}
            params={previousRoute.params}
          />
        </Animated.View>
      )
    }

    children.push(
      <Animated.View
        key={currentRoute.target || '0'}
        style={[styles.inner, { transform: [{ translateX: currentViewOffset }] }]}
      >
        <Screen
          component={currentComponent}
          params={currentRoute.params}
        />
      </Animated.View>
    )

    return (
      <View style={styles.wrapper}>
        {children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  inner: {
    position: 'absolute',
    top: 0,
    left: 0
  }
})
