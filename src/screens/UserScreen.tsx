import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import UserDashboard from '../components/User/UserDashboard';
import {getData, removeData} from '../util';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {fetchCars} from '../services/carService';
import {useNavigation} from '@react-navigation/native';

interface UserScreenProps {
  navigation: any;
}

const UserScreen: React.FC<UserScreenProps> = ({navigation}) => {
  const [token, setToken] = useState<string>('');
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const cars = useSelector((state: RootState) => state.main.cars);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = await getData('token');
        setToken(storedToken);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (token !== '' && !dataFetched) {
      fetchCarsLocal();
      setDataFetched(true);
    }
  }, [token]);

  const fetchCarsLocal = async () => {
    try {
      const res = await fetchCars(token);

      if (res.status === 401) {
        removeData('token');
        removeData('role');
        Alert.alert(
          'Session Expired',
          'Your session has expired. Please log in again.',
          [{text: 'OK', onPress: () => navigation.navigate('Auth')}],
        );
      } else if (res.status === 200) {
        const data = await res.json(); // Extract JSON data
        console.log('fetchCars', data);
      } else {
        console.error('Unexpected response status:', res.status);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      // Handle other errors here if needed
    }
  };

  return (
    <View>
      <Text>User Screen</Text>
      <UserDashboard />
    </View>
  );
};

export default UserScreen;
