import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {loginUser} from '../services/authService';
import {storeData} from '../util';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Validation Error', 'Username and password are required.');
      return;
    }

    try {
      const response = await loginUser(username, password);
      if (response.status === 401) {
        Alert.alert('Invalid credentails.', 'Try again!');
      } else if (response.status === 200) {
        const res = await response.json();
        storeData('token', res.token);
        storeData('role', res.role);
        navigation.navigate('App', {role: res.role});
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('An Error Occurred', 'Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    width: '80%',
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
