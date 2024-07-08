// utils/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApi from '../utilis/useApi';
import apiConfig from '../utilis/apiConfig';
import { Alert } from 'react-native';

const baseUrl = apiConfig.baseURL;

export async function estados(estado) {
    const { fetchData } = useApi();
    const idCliente = await AsyncStorage.getItem("id_cliente");

    if (!idCliente) {
        Alert.alert('Error:', 'No se encontró el ID del cliente.');
        return [];
    }

    const url = `${baseUrl}/view/status/${estado}/${idCliente}`;

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
}
