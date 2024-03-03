import React from 'react';
import { View, Text } from 'react-native';
import AdminDashboard from '../components/Admin/AdminDashboard';

interface AdminScreenProps {}

const AdminScreen: React.FC<AdminScreenProps> = () => {
  return (
    <View>
      <Text>Admin Screen</Text>
      <AdminDashboard />
    </View>
  );
};

export default AdminScreen;
