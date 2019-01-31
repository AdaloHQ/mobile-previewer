import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { reduxForm, Field } from 'redux-form'
import WrappedInput from '../Forms/WrappedInput'
import Button from './Button'

import Logo from './logo.png'

const FORM_NAME = 'loginForm'

class LoginForm extends Component {
  render() {
    let { handleSubmit, error } = this.props

    return (
      <View
        onSubmit={handleSubmit}
        className="auth-form"
        style={styles.wrapper}
      >
        <View style={styles.logoWrapper}>
          <Image source={Logo} />
        </View>
        <View style={styles.inputs}>
          <Text style={styles.label}>Email</Text>
          <Field
            autoFocus
            keyboardType="email-address"
            autoCapitalize="none"
            name="email"
            type="email"
            component={WrappedInput}
            style={styles.inputWrapper}
            inputStyle={styles.input}
          />
          <Text style={styles.label}>Password</Text>
          <Field
            secureTextEntry
            autoCapitalize="none"
            name="password"
            type="password"
            component={WrappedInput}
            style={styles.inputWrapper}
            inputStyle={styles.input}
          />
        </View>
        <Button
          title="Sign In"
          onPress={handleSubmit}
        >
          Sign In
        </Button>
      </View>
    )
  }
}

export default reduxForm({
  form: FORM_NAME
})(LoginForm)

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    paddingBottom: 40,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 17,
    padding: 12,
  },
  inputs: {
    marginBottom: 20
  },
  label: {
    fontSize: 12,
    color: '#8a8a8a',
    marginBottom: 4,
    marginLeft: 2,
  },
  logoWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
})

