import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

interface ViewCarsProps {}
const {width, height} = Dimensions.get('window');

const ViewCars: React.FC<ViewCarsProps> = () => {
  const cars = useSelector((state: RootState) => state.main.cars);

  const renderItem = ({item}) => {
    console.log('item :', item._id);

    return (
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.itemText}>{item.brand + ' '}</Text>
          <Text style={styles.itemModel}>{item.model}</Text>
          <Text style={styles.itemPrice}>Price : {item.price}</Text>
        </View>
        <View style={styles.qtyContainer}>
          <Text style={styles.qtyText}>QTY :</Text>
          <Text style={styles.qtyValue}>{item.quantity}</Text>
        </View>
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
});

export default ViewCars;
