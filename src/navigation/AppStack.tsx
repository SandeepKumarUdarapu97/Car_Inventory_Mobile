import React, {useCallback, useEffect, useState} from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import AdminScreen from '../screens/AdminScreen';
import UserScreen from '../screens/UserScreen';
import {RootStackParamList, getData} from '../util';
import ViewCars from '../screens/ViewCars';
import ManageInventory from '../screens/ManageInventory';
import PurchaseHistory from '../screens/PurchaseHistory';
import {RouteProp, useRoute} from '@react-navigation/native';
import LoadingComponent from '../components/Common/LoadingComponent';

const Stack = createStackNavigator();

type AppStackNavigationProp = StackNavigationProp<RootStackParamList, 'App'>;
type AppStackRouteProp = RouteProp<RootStackParamList, 'App'>;

const AppStack = () => {
  const route = useRoute();
  console.log('route :-', route.params.role);

  if (route.params.role === null || route.params.role === '') {
    return <LoadingComponent />;
  }

  if (route.params.role === 'user') {
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
          initialParams={{role: route.params.role}}
        />
        <Stack.Screen
          name="PurchaseHistory"
          component={PurchaseHistory}
          options={{title: 'Purchase History', headerTitleAlign: 'center'}}
        />
      </Stack.Navigator>
    );
  }

  if (route.params.role === 'admin') {
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
          initialParams={{role: route.params.role}}
        />
        <Stack.Screen
          name="ManageInventory"
          component={ManageInventory}
          options={{title: 'Manage Inventory', headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name="PurchaseHistory"
          component={PurchaseHistory}
          options={{title: 'Purchase History', headerTitleAlign: 'center'}}
        />
      </Stack.Navigator>
    );
  }

  return null;
};

export default AppStack;
