import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {loginUser} from '../services/authService';
import axios from 'axios';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const getConfig = async () => {
    try {
      const response = await axios.get(`http://192.168.1.7:3001/config`);
      console.log('config', response);
      const config = response.data;
      return config;
    } catch (error) {
      console.error('config',error);
      throw error;
    }
  };

  useEffect(() => {
    getConfig();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      console.log('response : ', response);

      if (response.success) {
        if (response.userRole === 'admin') {
          navigation.navigate('Admin');
        } else {
          navigation.navigate('User');
        }
      } else {
        alert('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '80%',
  },
});

export default LoginScreen;
