import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function StudentLogin() {
  const [regno, setRegno] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // <-- NEW

  const handleLogin = async () => {
    if (!regno || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const BASE_URL = 'http://72.60.223.126:8081';
      const response = await axios.get(`${BASE_URL}/api/login/student/${regno}`);

      if (response.status !== 200) {
        Alert.alert('Error', 'Registration number not found');
        setLoading(false);
        return;
      }

      const data = response.data;

      if (data.password === password) {
        Alert.alert('Success', 'Login successful');
        const year = data.year;

        setTimeout(() => {
          setLoading(false);
          router.push({
            pathname: '/StudentMain',
            params: { API: `${BASE_URL}/api/${year}/${regno}` },
          });
        }, 1000);
      } else {
        Alert.alert('Error', 'Invalid password');
        setLoading(false);
      }
    } catch (err) {
      Alert.alert('Error', 'Login failed due to network error, Please try again');
      console.error("err in student login - ", err);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox} pointerEvents={loading ? "none" : "auto"}>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.label}>
          Register number <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Register Number"
          value={regno}
          onChangeText={setRegno}
          editable={!loading}
        />

        <Text style={styles.label}>
          Password <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Enter Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            editable={!loading}
            returnKeyType='done'
            onSubmitEditing={handleLogin}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword((prev) => !prev)}
            disabled={loading}
          >
            <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.loginButton, loading && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={{ color: '#007BFF', marginTop: 10 }}>Logging in...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  loginBox: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#444',
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeButton: {
    marginLeft: -40,
    marginBottom: 15,
    padding: 10,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
