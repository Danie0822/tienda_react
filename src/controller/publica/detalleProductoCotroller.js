import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import useApi from '../utilis/useApi';

// funcion para registrar un cliente
export const fetchInfoCliente = () => {
    const { fetchData } = useApi();
    const fetchClientId = async () => {
        try {
            const id = await AsyncStorage.getItem("id_cliente");
            return id;
        } catch (error) {
            Alert.alert('Error al obtener ID del cliente', error.message);
            return null;
        }
    };
    
    const infoProducto = async () => {
        try {
                const url = `/public/producto/productos/1`;
                const response = await fetchData(url);
                if (response.success) {
                    return response;
                } else {
                    Alert.alert('Error al cargar:', 'No se pudo cargar la información del cliente.');
                    return { success: false };
                }
                Alert.alert('...');
                return { success: false };
            
        } catch (error) {
            console.log(error)
            Alert.alert('Error al cargar', error.message);
            return { success: false };
        }
    };
    return { infoProducto };
};



