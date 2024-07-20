import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import apiConfig from '../utilis/apiConfig';

const baseURL = apiConfig.getBaseURL2();

export const fetchOrderInfo = async (fetchData) => {
    const idPedido = await AsyncStorage.getItem("id_pedido");
    
    if (!idPedido) {
        Alert.alert('Error:', 'No se encontró el ID del pedido.');
        return { products: [], total_pago: 0 };
    }
    
    const url = `/pedidos/procedure/details/${idPedido}`;
    try {
        const response = await fetchData(url);
        if (response.success) {
            const result = response.data[0]; // Extraer el primer array del objeto `data`
            if (result.length > 0) {
                const idDetalle = result[0].id_detalle_pedido;
                await AsyncStorage.setItem("id_detalle_pedido", idDetalle.toString());

                const total_pago = result[0].total_pago;
                const products = result.map(product => ({
                    ...product,
                    ruta_imagen: `${baseURL}${product.ruta_imagen}`
                }));
                return { products, total_pago };
            }
        }
        return { products: [], total_pago: 0 };
    } catch (error) {
        Alert.alert('Error fetching products:', error.message);
        return { products: [], total_pago: 0 };
    }
};
