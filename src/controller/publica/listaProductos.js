// src/controller/publica/fetchProducts.js
import { Alert } from 'react-native';
import apiConfig from '../utilis/apiConfig';

const baseURL = apiConfig.getBaseURL2();

export const fetchProducts = async (fetchData) => {
    const url = '/inventario/vistaPrueba/view/';

    try {
        const response = await fetchData(url);
        if (response.success) {
            const result = response;
            return result.data.map(product => ({
                ...product,
                ruta_imagen: `${baseURL}${product.ruta_imagen}`
            }));
        } else {
            Alert.alert('Error al cargar:', 'Error al cargar los datos de los productos');
            return [];
        }
    } catch (error) {
        Alert.alert('Error fetching products:', error.message);
        return [];
    }
};
