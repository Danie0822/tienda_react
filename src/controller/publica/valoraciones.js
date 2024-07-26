import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import useApi from '../utilis/useApi';

// función para registrar un cliente
export const fetchInfoVal = () => {
    const { fetchData } = useApi();
    const fetchProductoId = async () => {
        try {
            const id_invt = await AsyncStorage.getItem("id_inventario");
            return id_invt;
        } catch (error) {
            Alert.alert('Error al obtener ID del producto', error.message);
            return null;
        }
    };
   // función para obtener la información del producto
    const valoraciones = async () => {
        try {
            const id_invt = await fetchProductoId();
            if (id_invt) {
                const url = `/public/producto/puntua/${id_invt}`;
                const response = await fetchData(url);
                if (response.success) {
                    return response;
                } else {
                    Alert.alert('Error al cargar:', 'No se pudo cargar la información del producto.');
                    return { success: false };
                }
            } else {
                Alert.alert('ID del producto no encontrado');
                return { success: false };
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error al cargar', error.message);
            return { success: false };
        }
    };

    return { valoraciones };
};
