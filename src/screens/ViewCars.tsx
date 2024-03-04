import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import NumberAdjuster from '../components/Common/NumberAdjuster';
import {fetchCars, makePurchase} from '../services/carService';
import {getData, removeData} from '../util';
import {updateCars, updatePurchases} from '../redux/MainSlice';
import {fetchUserPurchases} from '../services/purchaseService';
import {useRoute} from '@react-navigation/native';

interface ViewCarsProps {
  navigation: any;
}
const {width, height} = Dimensions.get('window');

const ViewCars: React.FC<ViewCarsProps> = ({navigation}) => {
  const cars = useSelector((state: RootState) => state.main.cars);
  const [number, setNumber] = useState<number>(0);
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<object>({});
  const [token, setToken] = useState<string>('');

  const {params} = useRoute();

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

  const logout = (sessionExpired: boolean) => {
    if (sessionExpired) {
      removeData('token');
      removeData('role');
      Alert.alert(
        'Session Expired',
        'Your session has expired. Please log in again.',
        [{text: 'OK', onPress: () => navigation.navigate('Auth')}],
      );
    }
  };

  const fetchCarsLocal = async () => {
    try {
      const res = await fetchCars(token);

      if (res.status === 401) {
        logout(true);
      } else if (res.status === 200) {
        const data = await res.json();
        console.log('fetchCars', typeof(data), data.reverse());
        dispatch(updateCars(data.reverse()));
      } else {
        console.error('Unexpected response status:', res.status);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const fetchUserPurchasesLocal = async () => {
    try {
      const res = await fetchUserPurchases(token);

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

  const NumberAdjusterModal = () => {
    const handleBuy = async () => {
      try {
        const res = await makePurchase(
          token,
          selectedItem._id,
          number.toString(),
        );

        if (res.status === 400) {
          Alert.alert('Insufficient quantity available.');
        }
        if (res.status === 401 || res.status === 500) {
          // logout(true);
          console.log('res :-', res);
        } else if (res.status === 200) {
          fetchCarsLocal();
          fetchUserPurchasesLocal();
          Alert.alert('Purchase successful.');
        } else {
          console.error('Unexpected response status:', res.status);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
      setShowBuyModal(false);
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => setShowBuyModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <NumberAdjuster setNumberMethod={(val: number) => setNumber(val)} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                disabled={number === 0}
                style={[
                  styles.button,
                  styles.buttonClose,
                  {opacity: number === 0 ? 0.5 : 1},
                ]}
                onPress={handleBuy}>
                <Text style={styles.buttonText}>Buy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setShowBuyModal(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.itemText}>{item.brand + ' '}</Text>
          <Text style={styles.itemModel}>{item.modelName}</Text>
          <Text style={styles.itemPrice}>Price : {item.price}</Text>
        </View>
        <View style={styles.qtyContainer}>
          <Text style={styles.qtyText}>QTY :</Text>
          <Text style={styles.qtyValue}>{item.quantity}</Text>
        </View>
        {params.role === 'user' &&<TouchableOpacity
          onPress={() => {
            setSelectedItem(item);
            setShowBuyModal(true);
          }}
          style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={cars}
        renderItem={renderItem}
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: (height / 100) * 5}}
      />
      {showBuyModal && NumberAdjusterModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginHorizontal: (width / 100) * 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5', // Light grey background
    paddingVertical: (height / 100) * 2,
    paddingHorizontal: (width / 100) * 2,
    marginTop: (width / 100) * 3,
    borderRadius: (width / 100) * 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    color: '#333', // Dark grey text
    fontSize: (width / 100) * 4.5,
    fontWeight: '600',
  },
  itemModel: {
    color: '#333', // Dark grey text
    fontSize: (width / 100) * 3.5,
  },
  itemPrice: {
    color: '#333', // Dark grey text
    fontSize: (width / 100) * 3.5,
    fontWeight: '600',
  },
  qtyContainer: {
    flexDirection: 'row',
    marginHorizontal: (width / 100) * 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e0e0e0', // Slightly darker grey for contrast
    paddingVertical: (height / 100) * 1,
    paddingHorizontal: (width / 100) * 2,
    borderRadius: (width / 100) * 2,
  },
  qtyText: {
    color: '#333', // Dark grey text
    fontSize: (width / 100) * 3.5,
  },
  qtyValue: {
    color: '#333', // Dark grey text
    fontSize: (width / 100) * 3.5,
    fontWeight: '600',
  },
  buyButton: {
    backgroundColor: '#7a42f4', // A vibrant color for the button
    borderRadius: 10,
    paddingHorizontal: (width / 100) * 5,
    paddingVertical: (width / 100) * 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: (width / 100) * 3, // Add some margin to separate it from the quantity section
  },
  buyButtonText: {
    color: 'white',
    fontSize: (width / 100) * 3.5,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#7a42f4',
    flex: 0.35,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: (width / 100) * 5,
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: (height / 100) * 4,
  },
  buttonClose: {
    elevation: 2,
    borderRadius: (width / 100) * 1.5,
    paddingVertical: (height / 100) * 1,
  },
});

export default ViewCars;
