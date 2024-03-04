import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

interface AuthResponse {}

export const loginUser = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    console.log('calling:', username, password);

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

  

    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

