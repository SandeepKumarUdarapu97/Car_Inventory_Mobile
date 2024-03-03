import React from 'react';
import { View, Text } from 'react-native';
import AdminDashboard from '../components/Admin/AdminDashboard';

const LoginScreen: React.FC = () => {
  return (
    <View>
      <Text>Login Screen</Text>
      <AdminDashboard />
    </View>
  );
};

export default LoginScreen;
