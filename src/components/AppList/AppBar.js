import React, { Component } from 'react'
import {Dimensions, Platform, Animated, Easing} from 'react-native'
import LogoImage from './images/logo-circle.png'
import Draggable from "react-native-draggable";

const ADALO_MENU_SIZE = 45

export default class AppBar extends Component {
  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
  }

  handleAnimation = () => {
    // A loop is needed for continuous animation
    Animated.loop(
        // Animation consists of a sequence of steps
        Animated.sequence([
          // start rotation in one direction (only half the time is needed)
          Animated.timing(this.animatedValue, {
            toValue: 1.0,
            duration: 20,
            easing: Easing.linear,
            useNativeDriver: true
          }),
          // rotate in other direction, to minimum value (= twice the duration of above)
          Animated.timing(this.animatedValue, {
            toValue: -1.0,
            duration: 20,
            easing: Easing.linear,
            useNativeDriver: true
          }),
          // return to begin position
          Animated.timing(this.animatedValue, {
            toValue: 0.0,
            duration: 20,
            easing: Easing.linear,
            useNativeDriver: true
          })
        ]), {iterations: 3}
    ).start();
  }

    componentDidMount() {
      if(this.props?.hintDraggable) {
        this.handleAnimation()
      }
    }

  render() {
    let { menuButtonCB } = this.props
    let innerWrapperStyles = {}
    let HORIZONTAL_POSITION = Dimensions.get("window").width * 0.5 - ADALO_MENU_SIZE / 2
    let VERTICAL_POSITION = Dimensions.get("window").height - ADALO_MENU_SIZE / 2

    if (Platform.OS === 'android') {
      innerWrapperStyles.marginTop = 48
    }

    return (
        <Draggable x={HORIZONTAL_POSITION}
                   y={VERTICAL_POSITION}
                   isCircle
                   onShortPressRelease={menuButtonCB}
        >
          <Animated.Image
              source={LogoImage}
              resizeMode='contain'
              style={{
                width: ADALO_MENU_SIZE,
                height: ADALO_MENU_SIZE,
                transform: [{
                  rotate: this.animatedValue.interpolate({
                    inputRange: [-1, 1],
                    outputRange: ['-0.1rad', '0.1rad']
                  })
                }]
              }}

          />
        </Draggable>
    )
  }
}
