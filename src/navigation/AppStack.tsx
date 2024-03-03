import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminScreen from '../screens/AdminScreen';
import UserScreen from '../screens/UserScreen';
import { getData } from '../util';
import LoadingComponent from '../components/LoadingComponent';

const Stack = createStackNavigator();

const AppStack = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const userRole = await getData('role');
        setRole(userRole);
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    };

    fetchRole();
  }, []); 

  if (role === null) {
    return <LoadingComponent />;
  }

  if (role === 'user') {
    return (
      <Stack.Navigator initialRouteName="User">
        <Stack.Screen name="User" component={UserScreen} />
      </Stack.Navigator>
    );
  }

  if (role === 'admin') {
    return (
      <Stack.Navigator initialRouteName="Admin">
        <Stack.Screen name="Admin" component={AdminScreen} />
      </Stack.Navigator>
    );
  }

  return null;
};

export default AppStack;
