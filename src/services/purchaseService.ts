const API_BASE_URL = 'http://localhost:3000';

interface PurchaseData {
}

export const fetchUserPurchases = async (userId: string): Promise<PurchaseData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/purchases?userId=${userId}`);
    const data: PurchaseData[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user purchases:', error);
    throw error;
  }
};

