import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import useApi from '../utilis/useApi';
import { useState } from 'react';

// funcion utilizada para obtener la informacion del cliente de carrito 
export const fetchInfoCarrito = () => {
    const { fetchData, deleteData, sendData } = useApi();
    const [selectedDireccionId, setSelectedDireccionId] = useState(null);

    const fetchClientId = async () => {
        try {
            const id = await AsyncStorage.getItem("id_cliente");
            return id;
        } catch (error) {
            Alert.alert('Error al obtener ID del cliente', error.message);
            return null;
        }
    };
// funcion para obtener la informacion del carrito
    const infoCarrito = async () => {
        try {
            const id = await fetchClientId();
            if (id) {
                const url = `/public/carrito/${id}`;
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

    const infoTotal = async () => {
        try {
            const id = await fetchClientId();
            if (id) {
                const url = `/public/carrito/campo/${id}`;
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

    const deleteCarrito = async (id) => {
        try {
            const idNumero = parseInt(id);
            const { success, data } = await deleteData(`/public/carrito/delete/${idNumero}`);
            if (success) {
                return { success: true };
            } else {
                const errorMessage = data && data.message ? data.message : "Error registro esta en uso.";
                return { success: false, message: errorMessage };
            }
        } catch (error) {
            console.log(error);
            return { success: false, message: "Error en conexión" };
        }
    };

    const obtenerDirecciones = async () => {
        try {
            const id = await fetchClientId();
            if (id) {
                const url = `/public/carrito/direcciones/${id}`;
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

    // Función para manejar el cambio de selección en el combobox
    const handleDireccionChange = (idDireccion) => {
        setSelectedDireccionId(idDireccion);
    };

    // Función para finalizar el pedido
    const finalizarPedido = async () => {
        try {
            const id = await AsyncStorage.getItem("id_cliente");
            const id_cliente = parseInt(id);
            
            if (!selectedDireccionId) {
                Alert.alert('Error', 'No se ha seleccionado una dirección.');
                return { success: false };
            }

            // Form data para JSON de body 
            const carrito = {
                p_id_cliente: id_cliente,
                p_id_direccion: selectedDireccionId
            };
            const { success, data } = await sendData("/public/carrito/update", 'PUT', carrito);
            if (success) {
                return { success: true };
            } else {
                const errorMessage = data && data.message ? data.message : "Error desconocido del servidor.";
                return { success: false, message: errorMessage };
            }

        } catch (error) {
            console.log(error);
            return { success: false, message: "Error en conexión" };
        }
    };

    return { infoCarrito, infoTotal, deleteCarrito, obtenerDirecciones, finalizarPedido, handleDireccionChange };
};
