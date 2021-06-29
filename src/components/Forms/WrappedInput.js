import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'

export default class WrappedInput extends Component {
  textInputRef = (el) => {
    this.input = el
  }

  componentDidMount() {
    const { autoFocus } = this.props

    setTimeout(() => {
      if (autoFocus && this.input) {
        this.input.focus()
      }
    }, 400)
  }

  render() {
    const {
      label,
      style,
      inputStyle,
      labelStyle,
      placeholder,
      autoFocus,
      ...props
    } = this.props

    const { value, onChange } = this.props.input

    return (
      <View style={style}>
        {label ? <Text style={labelStyle}>{label}</Text> : null}
        <TextInput
          {...props}
          ref={this.textInputRef}
          style={inputStyle}
          value={value}
          placeholder={placeholder}
          onChangeText={onChange}
          underlineColorAndroid="transparent"
        />
      </View>
    )
  }
}
