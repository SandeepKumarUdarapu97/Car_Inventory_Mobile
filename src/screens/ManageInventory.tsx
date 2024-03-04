import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {addCar, fetchAdminCars} from '../services/carService';
import {getData, removeData} from '../util';
import {updateCars} from '../redux/MainSlice';

const {width, height} = Dimensions.get('window');
interface ManageInventoryProps {
  navigation: any;
}

const ManageInventory: React.FC<ManageInventoryProps> = ({navigation}) => {
  const cars = useSelector((state: RootState) => state.main.cars);
  const [token, setToken] = useState<string>('');
  const [showAddCar, setShowAddCar] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<object>({});
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [quantity, setQuantity] = useState<number | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);

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

  const AddCarSubmitForm = async () => {
    try {
      console.log('AddCarSubmitForm', brand,model,quantity,price);
      const res = await addCar(token, brand, model, quantity, price);
      console.log('AddCarSubmitForm', res);
      if (res.status === 401 || res.status === 500) {
        logout(true);
      } else if (res.status === 200) {
        fetchCarsLocal();
        setShowAddCar(false);
        setBrand('');
        setModel('');
        setQuantity(undefined);
        setPrice(undefined);
      } else {
        console.error('Unexpected response status:', res.status);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.itemText}>{item.brand + ' '}</Text>
          <Text style={styles.itemModel}>{item.modelName}</Text>
          <Text style={styles.itemPrice}>Price : {item.price}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (selectedItem !== item) {
              setSelectedItem(item);
            } else {
              setSelectedItem({});
            }
          }}>
          <Icon
            name={
              selectedItem === item ? 'check-box' : 'check-box-outline-blank'
            }
            size={(width / 100) * 10}
            color="#333"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const checkSubmitButtonStatus = () => {
    if (brand.length > 0 && model.length > 0 && quantity > 0 && price > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handlePriceChange = (text: string) => {
    const parsedPrice = parseFloat(text);
    setPrice(isNaN(parsedPrice) ? undefined : parsedPrice);
  };

  const handleQuantityChange = (text: string) => {
    const parsedQuantity = parseInt(text, 10);
    setQuantity(isNaN(parsedQuantity) ? undefined : parsedQuantity);
  };

  const AddCarModal = () => {
    return (
      <Modal visible transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{color:'black',fontWeight:'600',marginBottom:(height/100)*0.75}}>Brand :-</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Car Brand"
              placeholderTextColor="#7a42f4"
              onChangeText={setBrand}
              value={brand}
            />
            <Text style={{color:'black',fontWeight:'600',marginBottom:(height/100)*0.75}}>Model :-</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Car Model"
              placeholderTextColor="#7a42f4"
              onChangeText={setModel}
              value={model}
            />
            <Text style={{color:'black',fontWeight:'600',marginBottom:(height/100)*0.75}}>Price :-</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Car Price"
              placeholderTextColor="#7a42f4"
              onChangeText={handlePriceChange}
              value={price !== undefined ? price.toString() : ''}
              keyboardType="numeric"
            />
            <Text style={{color:'black',fontWeight:'600',marginBottom:(height/100)*0.75}}>Quantity :-</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Car Quantity"
              placeholderTextColor="#7a42f4"
              keyboardType="numeric"
              onChangeText={handleQuantityChange}
              value={quantity !== undefined ? quantity.toString() : ''}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => setShowAddCar(false)}
                style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={!checkSubmitButtonStatus()}
                onPress={() => AddCarSubmitForm()}
                style={[
                  styles.submitButton,
                  {opacity: checkSubmitButtonStatus() ? 1 : 0.5},
                ]}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cars}
        renderItem={renderItem}
        style={{flex: 0.85}}
        contentContainerStyle={{paddingBottom: (height / 100) * 5}}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setBrand('');
            setModel('');
            setQuantity(undefined);
            setPrice(undefined);
            setShowAddCar(true);
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Add a car</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={Object.keys(selectedItem).length === 0}
          onPress={() => {
            setBrand(selectedItem.brand);
            setModel(selectedItem.modelName);
            setShowAddCar(true);
          }}
          style={[
            styles.button,
            {opacity: Object.keys(selectedItem).length > 0 ? 1 : 0.4},
          ]}>
          <Text style={styles.buttonText}>Use existing to add</Text>
        </TouchableOpacity>
      </View>
      {showAddCar && AddCarModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
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
  buttonContainer: {
    flex: 0.15,
    backgroundColor: 'rgba(211, 211, 211,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: (width / 100) * 3,
  },
  button: {
    flex: 0.47,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: (height / 100) * 1.5,
    borderRadius: (width / 100) * 2,
  },
  buttonText: {
    fontSize: (width / 100) * 4,
    fontWeight: '600',
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  inputField: {
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  submitButton: {
    flex: 0.47,
    backgroundColor: '#7a42f4',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ManageInventory;
