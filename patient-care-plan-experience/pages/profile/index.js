import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { globalStyles } from '../globalStyles';

const Stack = createStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProfileHomeScreen"
        component={ProfileHomeScreen}
      />
      <Stack.Screen
        name="UpdateProfileScreen"
        component={UpdateProfileScreen}
      />
      <Stack.Screen
        name="ManageSharingScreen"
        component={ManageSharingScreen}
      />

    </Stack.Navigator>
  );
}

function UpdateProfileScreen({ navigation }) {
  const [username, setUsername] = useState('');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingHorizontal: 20}}>
      <Text style={globalStyles.label}>Given Name</Text>
      <TextInput
          value={username}
          onChangeText={(username) => setUsername({ username })}
          placeholder={'Username'}
          style={globalStyles.input}
        />

      <Text style={globalStyles.label}>Family Name</Text>
      <TextInput
          value={username}
          onChangeText={(username) => setUsername({ username })}
          placeholder={'Family Name'}
          style={globalStyles.input}
        />

      <Text style={globalStyles.label}>Birthdate</Text>
      <TextInput
          value={username}
          onChangeText={(username) => setUsername({ username })}
          placeholder={'Birthdate'}
          style={globalStyles.input}
        />

      <Text style={globalStyles.label}>Email</Text>
      <TextInput
          value={username}
          onChangeText={(username) => setUsername({ username })}
          placeholder={'Email'}
          style={globalStyles.input}
        />


      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[globalStyles.standardButton, globalStyles.linkButton]}>
        <Text style={globalStyles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[globalStyles.standardButton, globalStyles.submitButton]}>
        <Text style={[globalStyles.buttonText, globalStyles.submitButtonText]}>Update profile</Text>
      </TouchableOpacity>

    </View>
  );
}

function ManageSharingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
      <Text>Manage Sharing</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function SignOut({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
      <Text>Signout</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
function ProfileHomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
    <TouchableOpacity
      onPress={() => navigation.navigate('UpdateProfileScreen')}
      style={globalStyles.standardButton}>
      <Text style={globalStyles.buttonText}>Update profile</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate('ManageSharingScreen')}
      style={globalStyles.standardButton}>
      <Text style={globalStyles.buttonText}>Manage Health Data Sharing</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => alert('Are you sure you want to sign out?')}
      style={[globalStyles.standardButton, globalStyles.linkButton]}>
      <Text style={globalStyles.buttonText}>Sign Out</Text>
    </TouchableOpacity>
  </View>

  );
}


export default function ProfileScreen() {
    return (
      <ProfileStack/>
    );
  }

