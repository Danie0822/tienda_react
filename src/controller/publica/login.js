import AsyncStorage from '@react-native-async-storage/async-storage';
import apiConfig from '../utilis/apiConfig';

const baseURL = apiConfig.getBaseURL();

// Función asincrónica para autenticar al usuario
export async function authenticateUser(email, password) {
    try {
        // Codificar el correo electrónico y la contraseña para incluirlos en la URL de la solicitud
        const encodedEmail = encodeURIComponent(email);
        const encodedPassword = encodeURIComponent(password);
        const url = `${baseURL}/login/cliente?correo=${encodedEmail}&clave=${encodedPassword}`;

        // Realizar una solicitud GET a la API de inicio de sesión
        const response = await fetch(url);
        const data = await response.json();

        // Verificar si la solicitud fue exitosa y si el usuario está autenticado
        if (response.ok && data.success) {
            return data;
        } else if (response.status === 401) {
            throw new Error("Credenciales inválidas");
        } else {
            throw new Error(data.message || "Error de autenticación");
        }
    } catch (error) {
        throw new Error("Credenciales inválidas");
    }
}

// Función para guardar la información de sesión en AsyncStorage
export async function saveTokenToAsyncStorage(data) {
    try {
        const token = data.data.token;
        const id = data.data.id_cliente.toString(); 
        const nombre = data.data.nombre_cliente;

        await AsyncStorage.setItem("nombre_cliente", nombre);
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("id_cliente", id);
    } catch (error) {
        console.error("Error al guardar en AsyncStorage:", error);
        throw error;
    }
}
