import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {getData} from '../util';
import {useRoute} from '@react-navigation/native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [role,setRole] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRole = await getData('role');
        setRole(userRole);
        const userToken = await getData('token');
        setToken(userToken);
      } catch (error) {
        console.error('Error fetching token:', error);
        setToken(null);
      }
    };

    fetchData();
  }, []);

  if (token !== '') {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false,}}
        initialRouteName={token === null ? 'Auth' : 'App'}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="App" component={AppStack} initialParams={{role: role}}/>
      </Stack.Navigator>
    );
  }
};

export default AppNavigator;
