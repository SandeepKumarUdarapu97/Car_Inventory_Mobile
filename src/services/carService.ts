const API_BASE_URL = 'http://localhost:3000';

interface CarData {

}

interface PurchaseResponse {

}

export const fetchCars = async (): Promise<CarData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/cars`);
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
