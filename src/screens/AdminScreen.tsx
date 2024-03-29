import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Alert} from 'react-native';
import SectionalButton from '../components/Common/SectionalButton';
import Icon from 'react-native-vector-icons/Entypo';
import {RootState} from '../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {getData, removeData} from '../util';
import {fetchAdminCars} from '../services/carService';
import {useNavigation} from '@react-navigation/native';
import {updateCars, updatePurchases} from '../redux/MainSlice';
import {fetchAdminPurchases} from '../services/purchaseService';

const {width, height} = Dimensions.get('window');
interface AdminScreenProps {
  navigation: any;
}

const AdminScreen: React.FC<AdminScreenProps> = ({navigation}) => {
  const [token, setToken] = useState<string>('');
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const cars = useSelector((state: RootState) => state.main.cars);

  const dispatch = useDispatch();

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
      fetchPurchasesLocal();
      setDataFetched(true);
    }
  }, [token]);

  const logout = (sessionExpired: boolean) => {
    if (sessionExpired) {
      Alert.alert(
        'Session Expired',
        'Your session has expired. Please log in again.',
        [{text: 'OK', onPress: () => navigation.navigate('Auth')}],
      );
    } else {
      Alert.alert('Are you sure?', 'You want to logout from this session.', [
        {
          text: 'Yes',
          onPress: () => {
            removeData('token');
            removeData('role');
            navigation.navigate('Auth');
          },
        },
        {
          text: 'No',
          onPress: () => {},
        },
      ]);
    }
  };

  const fetchPurchasesLocal = async () => {
    try {
      const res = await fetchAdminPurchases(token);

      if (res.status === 401) {
        logout(true);
      } else if (res.status === 200) {
        const data = await res.json();
        console.log('fetchUserPurchasesLocal', data);
        dispatch(updatePurchases(data.reverse()));
      } else {
        console.error('Unexpected response status:', res.status);
      }
    } catch (error) {
      console.error('Error fetch User Purchases:', error);
    }
  };

  const fetchCarsLocal = async () => {
    try {
      const res = await fetchAdminCars(token);
      console.log('fetchAdminCars', res);
      if (res.status === 401 || res.status === 500) {
        logout(true);
      } else if (res.status === 200) {
        const data = await res.json();
        console.log('fetchCars', data);
        dispatch(updateCars(data.reverse()));
      } else {
        console.error('Unexpected response status:', res.status);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: (height / 100) * 5,
        backgroundColor: 'white',
      }}>
      <View>
        <SectionalButton
          buttonText="View cars"
          onPress={() => navigation.navigate('ViewCars')}
        />
        <SectionalButton
          buttonText="Manage inventory"
          onPress={() => navigation.navigate('ManageInventory')}
        />
        <SectionalButton
          buttonText="Purchase history"
          onPress={() => navigation.navigate('PurchaseHistory')}
        />
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity
          onPress={() => logout(false)}
          style={{
            flexDirection: 'row',
            marginHorizontal: (width / 100) * 3,
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            paddingVertical: (height / 100) * 2,
            paddingHorizontal: (width / 100) * 2,
            marginTop: (width / 100) * 3,
            borderRadius: (width / 100) * 2,
            width: (width / 100) * 25,
          }}>
          <Icon name="log-out" size={(width / 100) * 5} color="black" />
          <Text
            style={{
              color: 'black',
              fontSize: (width / 100) * 4.5,
              fontWeight: '600',
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminScreen;
