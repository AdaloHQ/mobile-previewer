import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { reduxForm, Field } from 'redux-form'
import WrappedInput from '../Forms/WrappedInput'
import Button from './Button'

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
        <View style={styles.inputs}>
          <Field
            autoFocus
            keyboardType="email-address"
            autoCapitalize="none"
            name="email"
            placeholder="Email"
            type="email"
            component={WrappedInput}
            style={styles.input}
          />
          <Field
            secureTextEntry
            autoCapitalize="none"
            name="password"
            placeholder="Password"
            type="password"
            component={WrappedInput}
            style={styles.input}
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
  },

  input: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 15
  },

  inputs: {
    marginBottom: 20
  },
})

