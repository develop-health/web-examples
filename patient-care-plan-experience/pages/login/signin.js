import { Button, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useState } from 'react'
import { supabase } from '../../src/supabaseClient'

import loginImage1 from '../../assets/login1.png'
import { globalStyles } from '../globalStyles';

export default function SignInPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingHorizontal: 20}}>
      <Text style={[styles.header, {marginTop: 50}]}>Sign in to your account</Text>
      <Image
        style={{ flex: 1, margin: 50, height:"100%"}}
        source={loginImage1}
        resizeMode="contain"
      />
      <Text style={globalStyles.label}>Email</Text>
      <TextInput
          value={email}
          onChangeText={(email) => setEmail({ email })}
          placeholder={'Use the email on file with your provider'}
          style={globalStyles.input}
        />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[globalStyles.standardButton, globalStyles.submitButton]}>
        <Text style={[globalStyles.buttonText, globalStyles.submitButtonText]}>Send Verification Code</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
    // <div className="row flex-center flex">
    //   <div className="col-6 form-widget" aria-live="polite">
    //     <h1 className="header">Supabase + React</h1>
    //     <p className="description">
    //       Sign in via magic link with your email below
    //     </p>
    //     {loading ? (
    //       'Sending magic link...'
    //     ) : (
    //       <form onSubmit={handleLogin}>
    //         <label htmlFor="email">Email</label>
    //         <input
    //           id="email"
    //           className="inputField"
    //           type="email"
    //           placeholder="Your email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <button className="button block" aria-live="polite">
    //           Send magic link
    //         </button>
    //       </form>
    //     )}
    //   </div>
    // </div>
  )
}

export const styles = StyleSheet.create({
  header: {
     fontFamily: 'WorkSans',
     fontSize: 24
  },
});

