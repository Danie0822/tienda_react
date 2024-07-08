// src/controller/publica/fetchOrders.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import apiConfig from '../utilis/apiConfig';

//Funcion que obtiene todos los datos acerca de los pedidos en diferentes estados
export const fetchOrders = async (fetchData, estado) => {
    //Accedrmos al id cliente que esta en sesion storage al iniciar sesion
    const idCliente = await AsyncStorage.getItem("id_cliente");

    if (!idCliente) {
        Alert.alert('Error:', 'No se encontró el ID del cliente.');
        return [];
    }

    const url = `/pedidos/view/status/${estado}/${idCliente}`;

    try {
        const { success, data } = await fetchData(url);
        if (!success) {
            Alert.alert('Error al cargar:', 'Error al cargar los datos');
            return [];
        }
        return data;
    } catch (error) {
        Alert.alert('Error:', error.message);
        return [];
    }
};
