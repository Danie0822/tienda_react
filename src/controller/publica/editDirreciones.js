import useApi from '../utilis/useApi';
import validaciones from '../utilis/validaciones';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Función para registrar un cliente
export const useDirrecion = () => {
  const { sendData } = useApi();
  // Función para editar la dirrecion del cliente
  const dirrecionesEdit = async (nombre, dirrecion, codigo_postal, telefono, instrucciones) => {
    try {
      const validacion = await validarDatos(nombre, dirrecion, codigo_postal, telefono, instrucciones);
      if (validacion !== true) {
        return { success: false, message: validacion };
      }

      const id = await AsyncStorage.getItem("id_direccion");
      const idCliente = await AsyncStorage.getItem("id_cliente");
      const id_cliente = parseInt(idCliente);
      const idNumero = parseInt(id);
      const formData = {
        id_cliente: id_cliente,
        nombre_direccion: nombre,
        direccion_cliente: dirrecion,
        telefono_cliente: telefono,
        codigo_postal: codigo_postal,
        instrucciones_entrega: instrucciones,
        id_direccion: idNumero,
      };

      const { success, data } = await sendData("/dirreciones/update", 'PUT', formData);
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

  // Función para validar los datos del cliente
  const validarDatos = async (nombre, dirrecion, codigo_postal, telefono, instrucciones) => {
    if (!validaciones.contieneSoloLetrasYNumeros(nombre)) {
      return "Nombre no puede estar vacío y debe contener solo letras y números.";
    }
    if (!validaciones.longitudMaxima(nombre, 100)) {
      return "El nombre debe tener como máximo 100 caracteres.";
    }
    if (!validaciones.validarTelefono(telefono)) {
      return "Formato de teléfono inválido. Use el formato: 12345678";
    }
    if (!validaciones.contieneSoloLetrasYNumeros(dirrecion)) {
      return "Dirección no puede estar vacía y debe contener solo letras y números.";
    }
    if (!validaciones.longitudMaxima(dirrecion, 100)) {
      return "La dirección debe tener como máximo 100 caracteres.";
    }
    if (codigo_postal.length > 5) {
      return "El código postal debe tener como máximo 5 caracteres.";
    }
    if (!validaciones.contieneSoloLetrasYNumeros(instrucciones)) {
      return "Instrucciones no pueden estar vacías y deben contener solo letras y números.";
    }
    if (!validaciones.longitudMaxima(instrucciones, 100)) {
      return "Las instrucciones deben tener como máximo 100 caracteres.";
    }
    return true;
  };

  return { dirrecionesEdit };
};
