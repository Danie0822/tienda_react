import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import useApi from '../utilis/useApi';

// funcion para registrar un cliente
export const fetchInfoCliente = () => {
    const { fetchData, sendData } = useApi();
    const fetchProductoId = async () => {
        try {
            const id_invt = await AsyncStorage.getItem("id_inventario");
            return id_invt;
        } catch (error) {
            Alert.alert('Error al obtener ID del producto', error.message);
            return null;
        }
    };
// funcion para obtener la informacion del producto
    const infoProducto = async () => {
        try {
            const id_invt = await fetchProductoId();
            if (id_invt) {
                const url = `/public/producto/productos/${id_invt}`;
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
            console.log(error)
            Alert.alert('Error al cargar', error.message);
            return { success: false };
        }
    };
    const agregarCarrito = async (cantidad, costo, cantidadVal) => {
        try {
            const validacion = await validarDatos(cantidad,cantidadVal);
            if (validacion !== true) {
                return { success: false, message: validacion };
            }
            const id = await AsyncStorage.getItem("id_cliente");
            const idNumero = parseInt(id);
            const id_invt = await fetchProductoId();
            const id_2 = parseInt(id_invt);
            const formData = {
                cantidad_producto: cantidad,
                costo_actual: costo,
                id_inventario: id_2,
                id_cliente: idNumero,
            };
            const { success, data } = await sendData("/public/producto/save", 'POST', formData);
            if (success) {
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: "Error en conexion" };
        }
    };
    // funcion para validar los datos del cliente
    const validarDatos = async (cantidad,cantidadVal) => {
        if (cantidad > cantidadVal ) {
            return "La cantidad solicitada es mayor a la que hay en inventario.";
        }
        return true;
    };

    return { infoProducto, agregarCarrito };
};

