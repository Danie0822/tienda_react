import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import apiConfig from '../utilis/apiConfig';

const baseURL = apiConfig.getBaseURL2();

export const fetchOrderInfo = async (fetchData) =>{

    const idPedido = await AsyncStorage.getItem("id_pedido");

    if (!idPedido) {
        Alert.alert('Error:', 'No se encontró el ID del cliente.');
        return [];
    }
    const url = `/pedidos/procedure/details/${idPedido}`;
    try{
        const response = await fetchData(url);
        if(response.success){
            const result = response;
            return result.data.map(product => ({
                ...product,
                ruta_imagen: `${baseURL}${product.ruta_imagen}`
            }));
        }
        return data;

    }catch(error){
        Alert.alert('Error fetching products:', error.message);
        return [];
    }

}
