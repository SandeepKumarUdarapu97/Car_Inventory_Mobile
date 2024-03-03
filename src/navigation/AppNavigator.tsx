import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { getData } from '../util';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = await getData('token');
        setToken(userToken);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchData();
  }, []); 

  console.log('token', token);
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={token === null ? 'Auth' : 'App'}>
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
