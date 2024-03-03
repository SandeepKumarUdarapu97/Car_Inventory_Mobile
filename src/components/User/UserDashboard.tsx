import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import CarItem from '../Common/CarItem';
import PurchaseDetails from '../Common/PurchaseDetails';
import { fetchCars, makePurchase } from '../../services/carService';

interface Car {
  _id: string;
  brand: string;
  modelName: string;
  quantity: number;
}

const UserDashboard: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | {}>({});
  const [purchaseQuantity, setPurchaseQuantity] = useState<string>('');

  useEffect(() => {
    fetchCars()
      .then((data) => setCars(data))
      .catch((error) => console.error('Error fetching cars:', error));
  }, []);

  const handlePurchase = () => {
    if (!selectedCar || !purchaseQuantity || isNaN(parseInt(purchaseQuantity)) || parseInt(purchaseQuantity) <= 0) {
      Alert.alert('Please select a valid car and enter a valid quantity.');
      return;
    }

    makePurchase(selectedCar._id as string, purchaseQuantity)
      .then((data) => {
        if (data.message) {
          Alert.alert(data.message);
          fetchCars()
            .then((updatedCars) => setCars(updatedCars))
            .catch((error) => console.error('Error fetching updated cars:', error));
        }
      })
      .catch((error) => console.error('Error purchasing car:', error));
  };

  return (
    <View>
      <Text>User Dashboard</Text>
      <Text style={styles.sectionHeading}>Available Cars</Text>
      <FlatList
        data={cars}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <CarItem item={item} onSelect={() => setSelectedCar(item)} />
        )}
      />
      {selectedCar._id && (
        <PurchaseDetails
          selectedCar={selectedCar as Car}
          purchaseQuantity={purchaseQuantity}
          onQuantityChange={(text) => setPurchaseQuantity(text)}
          onPurchase={handlePurchase}
        />
      )}
    </View>
  );
};

const styles = {
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
};

export default UserDashboard;
