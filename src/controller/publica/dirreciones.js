import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import useApi from '../utilis/useApi';

// funcion utilizada para obtener la informacion del cliente de dirreciones 
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
    // funcion para obtener la informacion del cliente de dirreciones
    const infoCliente = async () => {
        try {
            const id = await fetchClientId();
            if (id) {
                const url = `/dirreciones/${id}`;
                const response = await fetchData(url);
                if (response.success) {
                    return response;
                } else {
                    Alert.alert('Error al cargar:', 'No se pudo cargar la información del cliente.');
                    return { success: false };
                }
            } else {
                Alert.alert('ID del cliente no encontrado');
                return { success: false };
            }
        } catch (error) {
            Alert.alert('Error al cargar', error.message);
            return { success: false };
        }
    };
    return { infoCliente };
};



