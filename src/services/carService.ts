import { Alert } from "react-native";
import { removeData } from "../util";
import { useNavigation } from "@react-navigation/native";

const API_BASE_URL = 'http://192.168.1.7:3001';

interface CarData {

}

interface PurchaseResponse {

}

export const fetchCars = async (token: string): Promise<object> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/cars`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // if (response.status === 401) {
    //   removeData('token');
    //   removeData('role');
    //   Alert.alert(
    //     'Session Expired',
    //     'Your session has expired. Please log in again.',
    //     [{ text: 'OK', onPress: () => navigation.navigate("Login") }]
    //   );
    // }

    // if (!response.ok) {
    //   throw new Error(`Failed to fetch cars. Status: ${response.status}`);
    // }
    return response;
  } catch (error) {
    console.error('Error fetching cars:', error,token);
    throw error;
  }
};



export const fetchAdminCars = async (): Promise<CarData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/cars`);
    const data: CarData[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

export const makePurchase = async (carId: string, quantity: string): Promise<PurchaseResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'replace-with-user-id',
        carId: carId,
        quantity: parseInt(quantity),
      }),
    });
    const data: PurchaseResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error making purchase:', error);
    throw error;
  }
};
