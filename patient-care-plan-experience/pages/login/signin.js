import { Button, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { NavigationContainer, TabActions} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useContext, useState } from 'react'
import { supabase } from '../../src/supabaseClient'

import { AuthContext } from '../../src/context';

import loginImage1 from '../../assets/login1.png'
import loginImage2 from '../../assets/login2.png'

import { globalStyles } from '../globalStyles';

const Stack = createStackNavigator();
let globalEmail = '';

function SignInPage({ navigation }) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [user, setAuthUser] = useContext(AuthContext);


  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      globalEmail = email.email
      const { user, session, error } = await supabase.auth.signIn({ 'email': email.email })
      if (error) throw error
      navigation.navigate('VerificationKeyPage')
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
          autoComplete='email'  // android only
          autoCapitalize='none'
          spellCheck={false}
        />

      <TouchableOpacity
        onPress={handleLogin}
        style={[globalStyles.standardButton, globalStyles.submitButton]}>
        <Text style={[globalStyles.buttonText, globalStyles.submitButtonText]}>Send Verification Code</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  )
}

function VerificationKeyPage({ navigation }) {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [user, setAuthUser] = useContext(AuthContext);

  const handleVerification = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      
      const { user, session, error } = await supabase.auth.signIn({ 'email': globalEmail, password: password.password })
      if (error) throw error

      if (user){
        // store session and user

        // get the integer id for the user
        const { data, error } = await supabase.from('patient').select('_id').eq('id', user.id)
        user.intId = data[0]._id

        setAuthUser(user)
        const jumpToAction = TabActions.jumpTo("Care Plan", {  });
        navigation.dispatch(jumpToAction);

      }
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingHorizontal: 20}}>
      <Text style={[styles.header, {marginTop: 50}]}>Enter Verification Code</Text>
      <Image
        style={{ flex: 1, margin: 50, height:"100%"}}
        source={loginImage2}
        resizeMode="contain"
      />
      <Text style={globalStyles.label}>Check your email for a verification code</Text>
      <TextInput
          value={password}
          onChangeText={(password) => setPassword({ password })}
          onKeyPress={(e) => {if (e.key === 'Enter') {handleVerification(e)}}}
          placeholder={'Enter the code emailed to you'}
          style={globalStyles.input}
          autoCapitalize='none'
          spellCheck={false}

        />

      <TouchableOpacity
        onPress={handleVerification}
        style={[globalStyles.standardButton, globalStyles.submitButton]}>
        <Text style={[globalStyles.buttonText, globalStyles.submitButtonText]}>Verify Code</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  )
}
export default function LoginStack({navigation}) {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="SignInPage"
          component={SignInPage}
        />
        <Stack.Screen
          name="VerificationKeyPage"
          component={VerificationKeyPage}
        />
  
      </Stack.Navigator>
    );
}


export const styles = StyleSheet.create({
  header: {
     fontFamily: 'WorkSans',
     fontSize: 24
  },
});

