import React from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

interface ViewCarsProps {}
const {width, height} = Dimensions.get('window');

const ViewCars: React.FC<ViewCarsProps> = () => {
  const cars = useSelector((state: RootState) => state.main.cars);

  const renderItem = (item: object) => {
    console.log('item :', item.item._id);

    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: (width / 100) * 3,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(211, 211, 211,0.5)',
          paddingVertical: (height / 100) * 2,
          paddingHorizontal: (width / 100) * 2,
          marginTop: (width / 100) * 3,
          borderRadius: (width / 100) * 2,
        }}>
        <View>
          <Text style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'black',
                fontSize: (width / 100) * 4.5,
                fontWeight: '600',
              }}>
              {item.item.brand + ' '}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: (width / 100) * 3.5,
              }}>
              {item.item.model}
            </Text>
          </Text>
          <Text style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'black',
                fontSize: (width / 100) * 3.5,
              }}>
              Price :
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: (width / 100) * 3.5,
                fontWeight: '600',
              }}>
              {item.item.price}
            </Text>
          </Text>
        </View>
        <View
        style={{
          flexDirection: 'row',
          marginHorizontal: (width / 100) * 3,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(211, 211, 211,0.5)',
          paddingVertical: (height / 100) * 1,
          paddingHorizontal: (width / 100) * 2,
          borderRadius: (width / 100) * 2,
        }}>
            <Text style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'black',
                fontSize: (width / 100) * 3.5,
              }}>
              QTY :
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: (width / 100) * 3.5,
                fontWeight: '600',
              }}>
              {item.item.quantity}
            </Text>
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList data={cars} renderItem={renderItem} style={{flex: 1}} contentContainerStyle={{paddingBottom:(height/100)*5}} />
    </View>
  );
};
export default ViewCars;
