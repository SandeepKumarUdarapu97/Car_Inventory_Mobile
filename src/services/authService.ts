import axios from "axios";

const API_BASE_URL = 'http://192.168.1.7:3001'; 

interface AuthResponse {
}

export const loginUser = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: username,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Assuming AuthResponse is the type of the response data
    const data: AuthResponse = response.data;

    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
