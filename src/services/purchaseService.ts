const API_BASE_URL = 'http://localhost:3001';

interface PurchaseData {
}

export const fetchUserPurchases = async (token: string): Promise<object> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/purchases`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("fetchUserPurchases response :",response);
    
    return response;
  } catch (error) {
    console.error('Error fetching user purchases:', error,token);
    throw error;
  }
};
export const fetchAdminPurchases = async (token: string): Promise<object> => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/purchases`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("fetchUserPurchases response :",response);
    
    return response;
  } catch (error) {
    console.error('Error fetching user purchases:', error,token);
    throw error;
  }
};
 

