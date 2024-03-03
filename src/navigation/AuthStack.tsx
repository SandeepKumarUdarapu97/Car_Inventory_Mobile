import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';

const AuthStack = createStackNavigator();

export const AuthStackNavigator = () => {
  console.log('LoginScreen');
  
  return (
    <AuthStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
