import React from 'react';
import { View, Text, Button, Alert } from 'react-native';

interface AdminDashboardProps {}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  return (
    <View>
      <Text>Admin Dashboard</Text>
      <Button title="View All Purchases" onPress={() => Alert.alert('View All Purchases')} />
    </View>
  );
};

export default AdminDashboard;
