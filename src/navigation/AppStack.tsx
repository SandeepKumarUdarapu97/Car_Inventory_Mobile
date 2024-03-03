import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminScreen from '../screens/AdminScreen';
import UserScreen from '../screens/UserScreen';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Admin" component={AdminScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
};

export default AppStack;
