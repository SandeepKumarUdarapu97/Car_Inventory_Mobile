import { Alert } from "react-native";
import { removeData } from "../util";
import { useNavigation } from "@react-navigation/native";

// const API_BASE_URL = 'http://192.168.1.7:3001';
const API_BASE_URL = 'http://localhost:3001';

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
    return response;
  } catch (error) {
    console.error('Error fetching cars:', error,token);
    throw error;
  }
};



export const fetchAdminCars = async (token:string): Promise<object> => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/cars`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching Admin cars:', error);
    throw error;
  }
};

export const addCar = async (token: string, brand: string, model: string, quantity: number, price: number): Promise<object> => {
  try {
     const response = await fetch(`${API_BASE_URL}/admin/add-car`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify({
         modelName: model,
         brand: brand,
         quantity: quantity,
         price: price,
       }),
     });

     console.log('response :-',response);
     
 
     return response
  } catch (error) {
     console.error('Error fetching Admin cars:', error);
     throw error;
  }
 };
 

export const makePurchase = async (token: string, carId: string, quantity: string): Promise<PurchaseResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: 'replace-with-user-id',
        carId: carId,
        quantity: parseInt(quantity),
      }),
    });
    return response;
  } catch (error) {
    console.error('Error making purchase:', error);
    throw error;
  }
};
