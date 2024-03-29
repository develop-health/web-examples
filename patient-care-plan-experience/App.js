import { StatusBar } from 'expo-status-bar';
import { div, Image, StyleSheet, Text, View } from 'react-native';
import genericUserIcon from './assets/user.png'

import { globalStyles } from './pages/globalStyles';

import CarePlanScreen from './pages/care_plan';
import MessagesScreen from './pages/messages';
import ProfileScreen from './pages/profile';
import SignInPage from './pages/login/signin';
import React from 'react';

import { AuthContext } from './src/context';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();



function ProfileHeader() {
  // Headers must be included with the navigator.
  // This is why this component is here and with the profile source.

  const [user, setAuthUser] = React.useContext(AuthContext);

  return (
    <View style={{  alignItems: 'center', flex: 0, width: '100%',}}>
      <Image
        style={{ width: 36, height: 36, borderRadius: 36/2}}
        source={genericUserIcon}
      />
      <Text style={{fontSize: 12, textAlign: 'center'}}>{user ? user.email : 'Not Logged In'}</Text>
    </View>
  );
}

function BottomNavigationTabs() {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Log In" component={SignInPage} options={{
        tabBarLabel: 'Log In',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-circle-outline" color={color} size={size} />
        ),
      }}/> */}
      <Tab.Screen name="Care Plan" component={CarePlanScreen} options={{
        tabBarLabel: 'Care Plan',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="heart-outline" color={color} size={size} />
        ),
      }}/>
      <Tab.Screen name="Messages" component={MessagesScreen} options={{
        tabBarLabel: 'Messages',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="chatbubble-ellipses-outline" color={color} size={size} />
        ),
      }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-outline" color={color} size={size} />
        ),
        headerTitle: (props) => <ProfileHeader {...props} />,
        headerStyle: {
          height: 110,
        },
      }}/>
    </Tab.Navigator>
  );
}

export default function App() {

  const [user, setUser] = React.useState(null);

  // load in any required fonts
  const [fontsLoaded] = useFonts({
    'WorkSans': require('./assets/fonts/WorkSans-VariableFont_wght.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <AuthContext.Provider value={[user, setUser]}>
      <NavigationContainer>      
        <BottomNavigationTabs/>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
