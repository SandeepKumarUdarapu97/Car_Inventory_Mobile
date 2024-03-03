import React from 'react';
import { View, Text } from 'react-native';
import UserDashboard from '../components/User/UserDashboard';

interface UserScreenProps {}

const UserScreen: React.FC<UserScreenProps> = () => {
  return (
    <View>
      <Text>User Screen</Text>
      <UserDashboard />
    </View>
  );
};

export default UserScreen;
