import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AdminScreen from '../screens/AdminScreen';
import UserScreen from '../screens/UserScreen';
import {getData} from '../util';
import LoadingComponent from '../components/LoadingComponent';
import ViewCars from '../screens/ViewCars';

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
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{
            title: 'User',
            headerTitleAlign: 'center',
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="ViewUserCars"
          component={ViewCars}
          options={{title: 'View cars', headerTitleAlign: 'center'}}
        />
      </Stack.Navigator>
    );
  }

  if (role === 'admin') {
    return (
      <Stack.Navigator initialRouteName="Admin">
        <Stack.Screen
          name="Admin"
          component={AdminScreen}
          options={{
            title: 'Admin',
            headerTitleAlign: 'center',
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="ViewCars"
          component={ViewCars}
          options={{title: 'View cars', headerTitleAlign: 'center'}}
        />
      </Stack.Navigator>
    );
  }

  return null;
};

export default AppStack;
