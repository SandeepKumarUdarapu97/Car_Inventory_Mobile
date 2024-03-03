import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

interface PurchaseDetailsProps {
  selectedCar: {
    brand: string;
    modelName: string;
  };
  purchaseQuantity: string;
  onQuantityChange: (text: string) => void;
  onPurchase: () => void;
}

const PurchaseDetails: React.FC<PurchaseDetailsProps> = ({ selectedCar, purchaseQuantity, onQuantityChange, onPurchase }) => {
  return (
    <View style={styles.purchaseContainer}>
      <Text style={styles.purchaseHeading}>Purchase Details</Text>
      <Text>{selectedCar.brand} - {selectedCar.modelName}</Text>
      <TextInput
        placeholder="Enter Quantity"
        keyboardType="numeric"
        style={styles.quantityInput}
        value={purchaseQuantity}
        onChangeText={onQuantityChange}
      />
      <Button title="Confirm Purchase" onPress={onPurchase} />
    </View>
  );
};

const styles = StyleSheet.create({
  purchaseContainer: {
    marginTop: 20,
  },
  purchaseHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
  },
});

export default PurchaseDetails;
