import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {formatDateToIST} from '../util';

const {width, height} = Dimensions.get('window');
interface PurchaseHistoryProps {}

interface Purchase {
  _id: string;
  car: {
    brand: string;
    modelName: string;
  };
  user: {
    username: string;
  };
  purchaseDate: string;
}

const PurchaseHistory: React.FC<PurchaseHistoryProps> = () => {
  const purchases = useSelector(
    (state: RootState) => state.main.purchases,
  ) as Purchase[];

  console.log('purchases :-', purchases[0]);

  const renderItem = ({item}: {item: Purchase}) => {
    const {car, user: user, purchaseDate} = item;
    const formattedDate = formatDateToIST(purchaseDate);
    console.log('item:-', item.user._doc);

    return (
      <View style={styles.itemContainer}>
        <Text
          style={styles.itemText}>{`Car: ${car.brand ? car.brand : car._doc.brand} ${car.modelName?car.modelName : car._doc.modelName}`}</Text>
        <Text style={styles.itemText}>{`User: ${user.username ? user.username:user._doc.username}`}</Text>
        <Text style={styles.itemText}>{`Purchase Date: ${formattedDate}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={purchases}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: (width/100)*3,
    backgroundColor: 'white',
  },
  itemContainer: {
    backgroundColor: '#f5f5f5',
    padding: (width/100)*6,
    marginVertical: (width/100)*3,
    marginHorizontal: (width/100)*5,
    borderRadius: (width/100)*3,
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
    fontSize: (width/100)*4.5,
    marginBottom: (width/100)*2,
    fontWeight:'600'
  },
});

export default PurchaseHistory;
