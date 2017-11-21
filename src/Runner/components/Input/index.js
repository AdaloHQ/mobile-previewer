import React, { Component } from 'react'
import {
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import { GROUP_TYPE_INPUT } from 'apto-constants'

export default class Input extends Component {
  handlePress = () => {
    if (this.input) {
      this.input.focus()
    }
  }

  inputRef = input => {
    this.input = input
  }

  render() {
    let { object, renderChildren } = this.props

    let {
      groupTypeOptions,
      children,
      x, y, width, height
    } = object

    let prototypeId = groupTypeOptions[GROUP_TYPE_INPUT].textInputObject
    let prototype = children.filter(c => c.id === prototypeId)[0]
    let otherChildren = children.filter(c => c.id !== prototypeId)

    let fontSize = 14
    let color = '#000'

    if (prototype) {
      x = prototype.x
      y = prototype.y
      width = prototype.width
      color = prototype.color
      fontSize = prototype.fontSize
    }

    let inputPosition = {
      left: x,
      top: y
    }

    let inputStyle = {
      width,
      color,
      fontSize
    }

    let targetPosition = {
      left: object.x,
      top: object.y,
      width: object.width,
      height: object.height
    }

    return (
      <View style={styles.wrapper}>
        {renderChildren(otherChildren)}
        <TouchableHighlight
          onPress={this.handlePress}
          style={[styles.tapTarget, targetPosition]}
          underlayColor="transparent"
        >
          <View />
        </TouchableHighlight>
        <View style={[styles.input, inputPosition]}>
          <TextInput style={inputStyle} ref={this.inputRef} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  input: {
    position: 'absolute'
  }
})
