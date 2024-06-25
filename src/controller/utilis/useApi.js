// src/utilis/useApi.js
import React, { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiConfig from './apiConfig'; 

const baseURL = apiConfig.getBaseURL(); 

const useApi = () => {
  const [isFetchingData, setIsFetchingData] = useState(false);

  const getToken = async () => {
    return await AsyncStorage.getItem("token");
  };

  const fetchDataWithOptions = async (endpoint, options) => {
    try {
      await checkFetchingStatus();
      const response = await fetch(`${baseURL}${endpoint}`, options);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };

  const checkFetchingStatus = async () => {
    if (isFetchingData) {
      throw new Error("Otra operación está en curso. Por favor, espere.");
    }
    setIsFetchingData(true);
  };

  const handleResponse = async (response) => {
    const data = await response.json();
    setIsFetchingData(false);
    return data;
  };

  const handleError = (error) => {
    console.error("Error:", error);
    setIsFetchingData(false);
    return { success: false, message: error.message };
  };

  const fetchData = async (endpoint) => {
    const token = await getToken();
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return await fetchDataWithOptions(endpoint, options);
  };

  const sendData = async (endpoint, method, formData = null) => {
    const token = await getToken();
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: formData ? JSON.stringify(formData) : undefined
    };
    return await fetchDataWithOptions(endpoint, options);
  };

  const sendFormData = async (endpoint, method, formData = null) => {
    const token = await getToken();
    const options = {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    };
    return await fetchDataWithOptions(endpoint, options);
  };

  const deleteData = async (endpoint) => {
    const token = await getToken();
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    return await fetchDataWithOptions(endpoint, options);
  };

  return {
    fetchData,
    sendData,
    sendFormData,
    deleteData
  };
};

export default useApi;
