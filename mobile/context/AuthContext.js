import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load user', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data } = await client.post('/auth/login', { email, password });
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const register = async (name, email, password, demographics = {}) => {
    const payload = {
      name,
      email,
      password,
      gender: demographics.gender,
      profession: demographics.profession,
      ageCategory: demographics.ageCategory,
      primaryGoal: demographics.primaryGoal
    };
    
    // Clean up undefined fields
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    const { data } = await client.post('/auth/register', payload);
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const updateProfile = async (updates) => {
    const { data } = await client.patch('/auth/profile', updates);
    await AsyncStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const refreshUser = async () => {
    const { data } = await client.get('/auth/me');
    await AsyncStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, setError, login, register, updateProfile, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
