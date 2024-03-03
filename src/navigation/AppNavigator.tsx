import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
