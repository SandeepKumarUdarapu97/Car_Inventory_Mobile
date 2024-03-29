import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(value);
      return value;
    } else {
      throw new Error('Data not found');
    }
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Data with key ${key} removed successfully`);
  } catch (error) {
    console.error(`Error removing data with key ${key}:`, error);
    throw error;
  }
};

export const formatDateToIST = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
     day: '2-digit',
     month: '2-digit',
     year: 'numeric',
     timeZone: 'Asia/Kolkata',
  }).format(date);
 };

 export type RootStackParamList = {
  Auth: undefined;
  App: { role: string; otherParam?: string };
  // Add other screens as needed
};

 
