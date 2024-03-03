import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface CarItemProps {
  item: {
    brand: string;
    modelName: string;
    quantity: number;
  };
  onSelect: () => void;
}

const CarItem: React.FC<CarItemProps> = ({ item, onSelect }) => {
  return (
    <View style={styles.carItem}>
      <Text>{item.brand} - {item.modelName}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Button title="Purchase" onPress={onSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  carItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    marginBottom: 10,
  },
});

export default CarItem;
